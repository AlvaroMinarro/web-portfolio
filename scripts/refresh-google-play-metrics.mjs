import * as fs from 'node:fs/promises';
import { constants } from 'node:fs';
import { randomUUID } from 'node:crypto';
import { dirname, join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { parseProjectMetrics } from '../src/data/projectMetrics.ts';

const coreHeaders = ['Date', 'Package Name', 'Total User Installs', 'Installs on active devices'];

// Fixed categories only: never expose raw rows, packages, paths or underlying IO errors.
export class MetricsExportError extends Error {
  constructor(code) {
    super(`Metrics export failed (${code}).`);
    this.name = 'MetricsExportError';
    this.code = code;
  }
}
const fail = code => { throw new MetricsExportError(code); };
const explicitString = value => typeof value === 'string' && value.trim() !== '';

function assertContext(expectedPackage, now) {
  if (!explicitString(expectedPackage) || expectedPackage !== expectedPackage.trim()
    || !(now instanceof Date) || !Number.isFinite(now.getTime())) fail('configuration');
}

function decodeCsv(bytes) {
  try {
    const utf16le = bytes[0] === 0xff && bytes[1] === 0xfe;
    const text = new TextDecoder(utf16le ? 'utf-16le' : 'utf-8', { fatal: true })
      .decode(utf16le ? bytes.subarray(2) : bytes);
    if (text.includes('\0')) fail('encoding');
    return text;
  } catch {
    fail('encoding');
  }
}

// Strict comma CSV: doubled quotes, embedded quoted newlines, CRLF/LF/CR.
function parseCsv(text) {
  const rows = [];
  let row = [], field = '', quoted = false, closed = false;
  const endField = () => {
    row.push(field);
    field = '';
    closed = false;
  };
  const endRow = () => {
    endField();
    if (!(row.length === 1 && row[0] === '')) rows.push(row);
    row = [];
  };
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (quoted) {
      if (char === '"' && text[i + 1] === '"') {
        field += '"';
        i++;
      } else if (char === '"') {
        quoted = false;
        closed = true;
      } else field += char;
      continue;
    }
    if (closed && ![',', '\r', '\n'].includes(char)) fail('csv');
    if (char === '"') {
      if (field !== '') fail('csv');
      quoted = true;
    } else if (char === ',') endField();
    else if (char === '\r' || char === '\n') {
      endRow();
      if (char === '\r' && text[i + 1] === '\n') i++;
    } else field += char;
  }
  if (quoted) fail('csv');
  if (field !== '' || row.length || closed) endRow();
  return rows;
}

function counter(value) {
  if (!/^\d+$/.test(value)) fail('observation');
  const number = Number(value);
  if (!Number.isSafeInteger(number)) fail('observation');
  return number;
}

/** Only normalized, single aggregate series; additional columns/duplicate days fail closed. */
export function parsePlayReports(reports, expectedPackage, now = new Date()) {
  if (!Array.isArray(reports) || reports.length === 0) fail('configuration');
  assertContext(expectedPackage, now);
  const seen = new Set();
  let latest = null;
  for (const bytes of reports) {
    if (!(bytes instanceof Uint8Array)) fail('encoding');
    const [headers, ...rows] = parseCsv(decodeCsv(bytes));
    if (!headers || rows.length === 0) fail('empty');
    if (headers.length !== coreHeaders.length || new Set(headers).size !== headers.length
      || !coreHeaders.every(header => headers.includes(header))) fail('headers');
    const indexes = coreHeaders.map(header => headers.indexOf(header));
    for (const row of rows) {
      if (row.length !== headers.length) fail('csv');
      const [day, pkg, total, active] = indexes.map(index => row[index]);
      if (pkg !== expectedPackage) fail('package');
      const candidate = parseProjectMetrics({
        schemaVersion: 1,
        source: 'google-play',
        status: 'available',
        observedOn: day,
        metrics: { totalUserInstalls: counter(total), installsOnActiveDevices: counter(active) },
      }, now);
      if (candidate?.status !== 'available') fail('observation');
      if (seen.has(day)) fail('duplicate');
      seen.add(day);
      if (!latest || day > latest.observedOn) latest = candidate;
    }
  }
  return latest;
}

async function readTarget(path, now, io) {
  let stat;
  try {
    stat = await io.lstat(path);
  } catch (error) {
    if (error.code === 'ENOENT') return null;
    throw error;
  }
  if (!stat.isFile() || stat.nlink !== 1) fail('target');
  // Do not follow a symlink swapped in between lstat and open.
  const handle = await io.open(path, constants.O_RDONLY | constants.O_NOFOLLOW);
  try {
    stat = await handle.stat();
    if (!stat.isFile() || stat.nlink !== 1) fail('target');
    const bytes = await handle.readFile();
    let value;
    try {
      value = parseProjectMetrics(JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(bytes)), now);
    } catch {
      fail('target');
    }
    if (!value) fail('target');
    return { stat, bytes, value };
  } finally {
    await handle.close();
  }
}

function assertSameTarget(before, current) {
  if (Boolean(before) !== Boolean(current) || (before &&
    (before.stat.dev !== current.stat.dev || before.stat.ino !== current.stat.ino
      || !before.bytes.equals(current.bytes)))) fail('target');
}

/** Local files only. Returns 'updated' or 'unchanged'; io injection is for failure tests. */
export async function refreshGooglePlayMetrics(options, io = fs) {
  let tempPath, ownsTemp = false;
  try {
    const { inputPaths, expectedPackage, outputPath, now = new Date() } = options ?? {};
    if (!Array.isArray(inputPaths) || inputPaths.length === 0 || !inputPaths.every(explicitString)
      || !explicitString(outputPath)) fail('configuration');
    assertContext(expectedPackage, now);
    const reports = [];
    for (const path of inputPaths) reports.push(await io.readFile(resolve(path)));
    const candidate = parsePlayReports(reports, expectedPackage, now);
    const targetPath = resolve(outputPath);
    const before = await readTarget(targetPath, now, io);
    if (before?.value.status === 'available') {
      if (candidate.observedOn < before.value.observedOn) fail('regression');
      if (candidate.observedOn === before.value.observedOn) {
        const previous = before.value.metrics;
        if (candidate.metrics.totalUserInstalls !== previous.totalUserInstalls
          || candidate.metrics.installsOnActiveDevices !== previous.installsOnActiveDevices) fail('conflict');
        return 'unchanged';
      }
    }
    const bytes = Buffer.from(`${JSON.stringify(candidate, null, 2)}\n`);
    tempPath = join(dirname(targetPath), `.play-metrics-${randomUUID()}.tmp`);
    const handle = await io.open(tempPath, 'wx', 0o644);
    ownsTemp = true;
    try {
      await handle.writeFile(bytes);
      await handle.sync();
    } finally {
      await handle.close();
    }
    // Verify the staged bytes, then recheck the target before the only replacement operation.
    const staged = await io.readFile(tempPath);
    if (!staged.equals(bytes) || !parseProjectMetrics(JSON.parse(staged.toString('utf8')), now)) {
      fail('filesystem');
    }
    assertSameTarget(before, await readTarget(targetPath, now, io));
    await io.rename(tempPath, targetPath);
    ownsTemp = false;
    return 'updated';
  } catch (error) {
    if (error instanceof MetricsExportError) throw error;
    fail('filesystem');
  } finally {
    if (ownsTemp) {
      try {
        await io.unlink(tempPath);
      } catch (error) {
        if (error.code !== 'ENOENT') fail('filesystem');
      }
    }
  }
}

const usage = `Usage: node --experimental-strip-types scripts/refresh-google-play-metrics.mjs
  --input CSV [--input CSV ...] --package EXPECTED_PACKAGE --output JSON
Local normalized aggregate series only; no network access or default output path.
`;

function cliOptions(args) {
  const options = { inputPaths: [] };
  for (let index = 0; index < args.length; index += 2) {
    const flag = args[index], value = args[index + 1];
    if (!explicitString(value) || value.startsWith('--')) fail('configuration');
    if (flag === '--input') options.inputPaths.push(value);
    else if (flag === '--package' && options.expectedPackage === undefined) options.expectedPackage = value;
    else if (flag === '--output' && options.outputPath === undefined) options.outputPath = value;
    else fail('configuration');
  }
  if (!options.expectedPackage) fail('configuration');
  return options;
}

if (process.argv[1] && pathToFileURL(resolve(process.argv[1])).href === import.meta.url) {
  const args = process.argv.slice(2);
  if (args.length === 1 && args[0] === '--help') process.stdout.write(usage);
  else {
    try {
      const result = await refreshGooglePlayMetrics(cliOptions(args));
      process.stdout.write(`Metrics export ${result}.\n`);
    } catch (error) {
      const code = error instanceof MetricsExportError ? error.code : 'filesystem';
      process.stderr.write(`Metrics export failed (${code}).\n`);
      process.exitCode = 1;
    }
  }
}
