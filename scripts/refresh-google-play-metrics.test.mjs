import assert from 'node:assert/strict';
import * as fs from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { basename, dirname, join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

// Synthetic normalized aggregates only, never actual Play data or repository output.
const scratch = await fs.mkdtemp(join(tmpdir(), 'portfolio-play-metrics-exporter-'));
const now = new Date('2024-03-07T12:00:00Z');
const expectedPackage = 'example.synthetic';
const header = 'Date,Package Name,Total User Installs,Installs on active devices';
const row = (day = '2024-02-29', total = '12345', active = '678', pkg = expectedPackage) =>
  `${day},${pkg},${total},${active}`;
const csv = `${header}\n${row()}\n`;
const observation = {
  schemaVersion: 1,
  source: 'google-play',
  status: 'available',
  observedOn: '2024-02-29',
  metrics: { totalUserInstalls: 12345, installsOnActiveDevices: 678 },
};
const lastGood = Buffer.from(`\t${JSON.stringify(observation)}\n\n`);
const unavailable = { schemaVersion: 1, source: 'google-play', status: 'unavailable' };

async function fixture(content = csv, existing = lastGood) {
  const directory = await fs.mkdtemp(join(scratch, 'case-'));
  const inputPath = join(directory, 'source.csv');
  const outputPath = join(directory, 'target.json');
  await fs.writeFile(inputPath, content);
  if (existing !== null) await fs.writeFile(outputPath, existing);
  return {
    directory, inputPath, outputPath,
    options: { inputPaths: [inputPath], expectedPackage, outputPath, now },
  };
}

// Assert every exporter filesystem path stays in the specific test target directory.
function scopedIo(f, overrides = {}) {
  const check = path => {
    assert.equal(dirname(path), f.directory);
    assert.ok([basename(f.outputPath), ...f.options.inputPaths.map(path => basename(path))]
      .includes(basename(path)) || /^\.play-metrics-[0-9a-f-]+\.tmp$/.test(basename(path)));
  };
  const io = { ...fs };
  for (const method of ['readFile', 'lstat', 'open', 'rename', 'unlink']) {
    io[method] = async (...args) => {
      check(args[0]);
      if (method === 'rename') check(args[1]);
      return (overrides[method] ?? fs[method])(...args);
    };
  }
  return io;
}

async function run(f, overrides = {}) {
  const { refreshGooglePlayMetrics } = await import('./refresh-google-play-metrics.mjs');
  return refreshGooglePlayMetrics(f.options, scopedIo(f, overrides));
}

async function preserved(f, bytes = lastGood, overrides = {}) {
  const before = (await fs.readdir(f.directory)).sort();
  await assert.rejects(run(f, overrides), { name: 'MetricsExportError' });
  assert.deepEqual(await fs.readFile(f.outputPath), bytes);
  assert.deepEqual((await fs.readdir(f.directory)).sort(), before);
}

test('creates only the exact validated aggregate at the explicit scratch target', async t => {
  t.diagnostic(`Synthetic artifacts: ${scratch}`);
  const f = await fixture(csv, null);
  assert.equal(await run(f), 'updated');
  assert.deepEqual(JSON.parse(await fs.readFile(f.outputPath, 'utf8')), observation);
  assert.deepEqual((await fs.readdir(f.directory)).sort(), ['source.csv', 'target.json']);
});

test('selects the newest genuine source day across unsorted month files, never sums', async () => {
  const f = await fixture(`${header}\n${row('2024-01-31', '99', '70')}\n`, null);
  const second = join(f.directory, 'february.csv');
  await fs.writeFile(second, `${header}\n${row('2024-02-29', '100', '60')}\n${row('2024-02-01', '101', '80')}\n`);
  f.options.inputPaths.push(second);
  assert.equal(await run(f), 'updated');
  assert.deepEqual(JSON.parse(await fs.readFile(f.outputPath, 'utf8')), {
    ...observation, metrics: { totalUserInstalls: 100, installsOnActiveDevices: 60 },
  });
});

test('supports UTF8/BOM, UTF16LE BOM, quoted headers, escaped quotes and CRLF', async () => {
  const pkg = 'example.synthetic,"quoted"';
  const text = `"Date","Package Name","Total User Installs","Installs on active devices"\r\n` +
    `"2024-02-29","example.synthetic,""quoted""","12345","678"\r\n\r\n`;
  for (const bytes of [Buffer.from(text), Buffer.from(`\ufeff${text}`),
    Buffer.concat([Buffer.from([0xff, 0xfe]), Buffer.from(text, 'utf16le')])]) {
    const f = await fixture(bytes, null);
    f.options.expectedPackage = pkg;
    assert.equal(await run(f), 'updated');
    assert.deepEqual(JSON.parse(await fs.readFile(f.outputPath, 'utf8')), observation);
  }
});

test('quoted multiline fields are parsed as one field, not extra observations', async () => {
  const f = await fixture(`${header}\n2024-02-29,"example.\nsynthetic",12345,678\n`, null);
  f.options.expectedPackage = 'example.\nsynthetic';
  assert.equal(await run(f), 'updated');
  assert.deepEqual(JSON.parse(await fs.readFile(f.outputPath, 'utf8')), observation);
});

test('accepts reordered core headers, zero and safe decimal integer bounds', async () => {
  for (const [total, active] of [['0', '9007199254740991'], ['9007199254740991', '0000']]) {
    const f = await fixture(`Installs on active devices,Date,Total User Installs,Package Name\n` +
      `${active},2024-02-29,${total},${expectedPackage}\n`, null);
    assert.equal(await run(f), 'updated');
    assert.deepEqual(JSON.parse(await fs.readFile(f.outputPath, 'utf8')).metrics, {
      totalUserInstalls: Number(total), installsOnActiveDevices: Number(active),
    });
  }
});

test('same-date identical observations preserve original bytes without a temporary write', async () => {
  const f = await fixture();
  assert.equal(await run(f, { open: async (path, flags, ...rest) => {
    assert.notEqual(flags, 'wx');
    return fs.open(path, flags, ...rest);
  } }), 'unchanged');
  assert.deepEqual(await fs.readFile(f.outputPath), lastGood);
  assert.deepEqual((await fs.readdir(f.directory)).sort(), ['source.csv', 'target.json']);
});

test('advances a valid previous or unavailable aggregate with no extra public keys', async () => {
  for (const existing of [Buffer.from(JSON.stringify(unavailable)), lastGood]) {
    const f = await fixture(`${header}\n${row('2024-03-01', '13000', '670')}\n`, existing);
    assert.equal(await run(f), 'updated');
    assert.deepEqual(JSON.parse(await fs.readFile(f.outputPath, 'utf8')), {
      ...observation, observedOn: '2024-03-01',
      metrics: { totalUserInstalls: 13000, installsOnActiveDevices: 670 },
    });
  }
});

const invalidReports = [
  ['empty', ''], ['blank', '\r\n\n'], ['header only', `${header}\n`],
  ['missing header', `${row()}\n`], ['missing core column', 'Date,Package Name,Total User Installs\n'],
  ['duplicate header', `${header},Date\n`], ['wrong case', csv.replace('Date', 'date')],
  ['unclosed quote', `${header}\n"2024-02-29,example.synthetic,1,2\n`],
  ['quote in unquoted field', `${header}\n${row().replace('12345', '12"345')}\n`],
  ['characters after closing quote', `${header}\n"2024-02-29"x,example.synthetic,1,2\n`],
  ['missing field', `${header}\n2024-02-29,example.synthetic,12345\n`],
  ['extra field', `${csv.trimEnd()},extra\n`],
  ['blank newest value', `${csv}${row('2024-03-01', '', '100')}\n`],
  ['incomplete older value', `${header}\n${row('2024-02-28', '100', '')}\n${row()}\n`],
  ['duplicate date', `${csv}${row()}\n`],
  ['conflicting duplicate date', `${csv}${row('2024-02-29', '1', '2')}\n`],
  ['different package', `${header}\n${row('2024-02-29', '1', '2', 'private.marker.package')}\n`],
  ['mixed packages', `${csv}${row('2024-03-01', '1', '2', 'other.package')}\n`],
  ['empty package', `${header}\n${row('2024-02-29', '1', '2', '')}\n`],
  ['invalid UTF8', Buffer.from([0xef, 0xbb, 0xbf, 0xc3, 0x28])],
  ['UTF16BE', Buffer.from([0xfe, 0xff, 0x00, 0x44])],
  ['odd UTF16LE', Buffer.from([0xff, 0xfe, 0x44])],
  ['invalid UTF16LE surrogate', Buffer.from([0xff, 0xfe, 0x00, 0xd8])],
  ['UTF16 without BOM', Buffer.from(csv, 'utf16le')],
];
for (const column of ['Country', 'Device', 'Android Version', 'App Version', 'Carrier', 'Unknown']) {
  for (const value of ['', 'All', 'country-or-device']) {
    invalidReports.push([`additional ${column} with ${value || 'blank'}`,
      `${header},${column}\n${row()},${value}\n`]);
  }
}
for (const value of ['', ' ', '-1', '+1', '0.1', '1e3', '1,000', 'NaN', 'Infinity',
  '9007199254740992', '123suffix', ' 1', '1 ', '0x10', '1\n', '1\r', '1\r\n', '1\u2028', '1\u2029']) {
  for (const counter of ['total', 'active']) {
    const field = /[,\r\n]/.test(value) ? `"${value}"` : value;
    invalidReports.push([`invalid ${counter}: ${JSON.stringify(value)}`, `${header}\n` +
      `${row('2024-02-29', counter === 'total' ? field : '1', counter === 'active' ? field : '1')}\n`]);
  }
}
for (const value of ['', '2024-2-29', '2024-02-30', '2023-02-29', '1900-02-29',
  '2024-04-31', '0000-01-01', '2024-13-01', '2024-00-01', '2024-01-00',
  '2024-03-08', ' 2024-02-29', '2024-02-29 ', '2024-02-29T00:00:00Z']) {
  invalidReports.push([`invalid date: ${value}`, `${header}\n${row(value)}\n`]);
}
for (const [label, content] of invalidReports) {
  test(`preserves last-good bytes and leaves no temporary files: ${label}`, async () => {
    const { parsePlayReports } = await import('./refresh-google-play-metrics.mjs');
    const bytes = typeof content === 'string' ? Buffer.from(content) : content;
    // Rejection must come from ingestion, not be masked by same-date conflict protection.
    assert.throws(() => parsePlayReports([bytes], expectedPackage, now), { name: 'MetricsExportError' });
    await preserved(await fixture(content));
  });
}

test('invalid or empty initial input never creates a missing output', async () => {
  for (const content of ['', `${header}\n`, `${header}\n${row('2024-03-08')}\n`]) {
    const f = await fixture(content, null);
    await assert.rejects(run(f), { name: 'MetricsExportError' });
    assert.deepEqual(await fs.readdir(f.directory), ['source.csv']);
  }
});

test('a missing input preserves the last-good target', async () => {
  const f = await fixture();
  f.options.inputPaths = [join(f.directory, 'missing.csv')];
  await preserved(f);
});

test('duplicate dates across input months and an empty additional report fail closed', async () => {
  for (const content of [csv, '']) {
    const f = await fixture();
    const second = join(f.directory, 'second.csv');
    await fs.writeFile(second, content);
    f.options.inputPaths.push(second);
    await preserved(f);
  }
});

test('older source dates and same-date changed counters preserve last-good bytes', async () => {
  for (const content of [`${header}\n${row('2024-02-28')}\n`, `${header}\n${row('2024-02-29', '12346')}\n`]) {
    await preserved(await fixture(content));
  }
});

test('requires explicit paths, expected package and a valid clock', async () => {
  for (const change of [{ inputPaths: [] }, { expectedPackage: '' }, { expectedPackage: ' ' },
    { expectedPackage: ' example.synthetic' }, { outputPath: '' }, { now: new Date(NaN) }]) {
    const f = await fixture();
    f.options = { ...f.options, ...change };
    await preserved(f);
  }
});

test('invalid package or clock configuration fails before any source reads', async () => {
  for (const change of [{ expectedPackage: undefined }, { expectedPackage: '' },
    { expectedPackage: ' example.synthetic' }, { now: null }, { now: '2024-03-07' },
    { now: new Date(NaN) }]) {
    const f = await fixture();
    f.options = { ...f.options, ...change };
    await assert.rejects(run(f, { readFile: () => assert.fail('Unexpected source read') }),
      { name: 'MetricsExportError', code: 'configuration' });
    assert.deepEqual(await fs.readFile(f.outputPath), lastGood);
    assert.deepEqual((await fs.readdir(f.directory)).sort(), ['source.csv', 'target.json']);
  }
});

test('malformed, unknown-key and future existing output is never overwritten', async () => {
  for (const bytes of [Buffer.from('not JSON'), Buffer.from('{}'),
    Buffer.from(JSON.stringify({ ...observation, rawRows: [] })),
    Buffer.from(JSON.stringify({ ...observation, observedOn: '2024-03-08' }))]) {
    await preserved(await fixture(csv, bytes), bytes);
  }
});

test('symlink targets, dangling symlinks, directories and hardlinks are rejected', async () => {
  for (const kind of ['symlink', 'dangling', 'directory', 'hardlink']) {
    const f = await fixture(csv, null);
    const other = join(f.directory, 'other.json');
    if (kind !== 'dangling') await fs.writeFile(other, lastGood);
    if (kind === 'directory') await fs.mkdir(f.outputPath);
    else if (kind === 'hardlink') await fs.link(other, f.outputPath);
    else await fs.symlink(other, f.outputPath);
    const before = await fs.readdir(f.directory);
    await assert.rejects(run(f), { name: 'MetricsExportError' });
    assert.deepEqual(await fs.readdir(f.directory), before);
    if (kind !== 'dangling') assert.deepEqual(await fs.readFile(other), lastGood);
    if (kind === 'symlink' || kind === 'dangling') assert.equal(await fs.readlink(f.outputPath), other);
    if (kind === 'directory') assert.deepEqual(await fs.readdir(f.outputPath), []);
  }
});

test('pre-rename open/write/sync/rename failures preserve old bytes and clean owned temps', async () => {
  for (const failure of ['open', 'writeFile', 'sync', 'rename']) {
    const f = await fixture(`${header}\n${row('2024-03-01')}\n`);
    const boom = () => { throw new Error('sensitive internal filesystem detail'); };
    const overrides = failure === 'rename' ? { rename: boom } : {
      open: async (path, flags, ...rest) => {
        if (flags === 'wx' && failure === 'open') boom();
        const handle = await fs.open(path, flags, ...rest);
        if (flags !== 'wx') return handle;
        return {
          writeFile: (...args) => failure === 'writeFile' ? boom() : handle.writeFile(...args),
          sync: () => failure === 'sync' ? boom() : handle.sync(),
          close: () => handle.close(),
        };
      },
    };
    await preserved(f, lastGood, overrides);
  }
});

test('writer failure does not delete a pre-existing foreign temporary file', async () => {
  const f = await fixture(`${header}\n${row('2024-03-01')}\n`);
  const foreign = join(f.directory, '.play-metrics-foreign.tmp');
  const foreignBytes = Buffer.from('unrelated synthetic file');
  await fs.writeFile(foreign, foreignBytes);
  await preserved(f, lastGood, { rename: () => { throw new Error('simulated failure'); } });
  assert.deepEqual(await fs.readFile(foreign), foreignBytes);
});

test('initial writer failure leaves neither a target nor an owned temporary file', async () => {
  const f = await fixture(csv, null);
  await assert.rejects(run(f, { rename: () => { throw new Error('simulated failure'); } }),
    { name: 'MetricsExportError' });
  assert.deepEqual(await fs.readdir(f.directory), ['source.csv']);
});

test('rereads staged bytes before replacement and rejects corrupted temporary data', async () => {
  const f = await fixture(`${header}\n${row('2024-03-01')}\n`);
  await preserved(f, lastGood, {
    readFile: path => basename(path).startsWith('.play-metrics-') ? Buffer.from('{}') : fs.readFile(path),
  });
});

test('a target changed during preparation is preserved instead of replaced', async () => {
  const f = await fixture(`${header}\n${row('2024-03-01')}\n`);
  const concurrent = Buffer.from(JSON.stringify({ ...observation, observedOn: '2024-03-02' }));
  await preserved(f, concurrent, {
    open: async (path, flags, ...rest) => {
      if (flags === 'wx') await fs.writeFile(f.outputPath, concurrent);
      return fs.open(path, flags, ...rest);
    },
  });
});

function cli(args, cwd) {
  return spawnSync(process.execPath, ['--experimental-strip-types',
    fileURLToPath(new URL('./refresh-google-play-metrics.mjs', import.meta.url)), ...args],
  { cwd, encoding: 'utf8', env: {} });
}

test('CLI requires explicit arguments, writes only scratch output, and sanitizes errors', async () => {
  const f = await fixture(csv, null);
  const args = ['--input', f.inputPath, '--package', expectedPackage, '--output', f.outputPath];
  const success = cli(args, f.directory);
  assert.equal(success.status, 0, success.stderr);
  assert.equal(success.stdout, 'Metrics export updated.\n');
  assert.equal(cli(args, f.directory).stdout, 'Metrics export unchanged.\n');
  const good = await fs.readFile(f.outputPath);
  await fs.writeFile(f.inputPath, `${header}\n${row('2024-02-29', 'PRIVATE-ROW', '1', 'private.marker.package')}\n`);
  const invalid = cli(args, f.directory);
  assert.equal(invalid.status, 1);
  assert.match(invalid.stderr, /^Metrics export failed \([a-z-]+\)\.\n$/);
  for (const forbidden of ['PRIVATE-ROW', 'private.marker.package', expectedPackage, f.directory, 'Error:']) {
    assert.ok(!invalid.stderr.includes(forbidden));
  }
  assert.deepEqual(await fs.readFile(f.outputPath), good);
  for (const badArgs of [[], ['--package', expectedPackage], [...args, '--output', f.outputPath],
    ['--unknown', 'value'], ['--input']]) {
    const result = cli(badArgs, f.directory);
    assert.equal(result.status, 1);
    assert.equal(result.stderr, 'Metrics export failed (configuration).\n');
    assert.deepEqual(await fs.readFile(f.outputPath), good);
  }
  assert.match(cli(['--help'], f.directory).stdout, /--input CSV/);
  assert.deepEqual((await fs.readdir(f.directory)).sort(), ['source.csv', 'target.json']);
});
