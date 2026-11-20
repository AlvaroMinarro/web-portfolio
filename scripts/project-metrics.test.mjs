import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import {
  formatProjectMetrics,
  getProjectMetricsUrl,
  parseProjectMetrics,
  retainProjectMetrics,
} from '../src/data/projectMetrics.ts';
import { translations } from '../src/i18n/translations.ts';

// Synthetic aggregates only: these are not published Play Console figures.
const now = new Date('2024-03-07T12:00:00Z');
const aggregate = {
  schemaVersion: 1,
  source: 'google-play',
  status: 'available',
  observedOn: '2024-02-29',
  metrics: { totalUserInstalls: 12345, installsOnActiveDevices: 678 },
};
const unavailable = { schemaVersion: 1, source: 'google-play', status: 'unavailable' };
const snapshot = {
  organicDownloads: 1300,
  organicDownloadsQualifier: '+',
  activeInstalls: 400,
  observedOn: null,
};

const withCounter = (key, value) => ({
  ...aggregate,
  metrics: { ...aggregate.metrics, [key]: value },
});

test('accepts the two measured Google Play counters and their source date', () => {
  assert.deepEqual(parseProjectMetrics(aggregate, now), aggregate);
});

test('accepts zero and maximum safe integer independently for both counters', () => {
  for (const key of Object.keys(aggregate.metrics)) {
    for (const value of [0, Number.MAX_SAFE_INTEGER]) {
      const candidate = withCounter(key, value);
      assert.deepEqual(parseProjectMetrics(candidate, now), candidate);
    }
  }
});

test('rejects negative, fractional, unsafe, nonfinite and nonnumeric counters', () => {
  for (const key of Object.keys(aggregate.metrics)) {
    for (const value of [-1, 0.5, Number.MAX_SAFE_INTEGER + 1, NaN, Infinity, -Infinity,
      '1300', null, undefined, {}]) {
      assert.equal(parseProjectMetrics(withCounter(key, value), now), null, `${key}: ${value}`);
    }
  }
});

test('requires exactly the public aggregate keys, identities, version and source', () => {
  const { observedOn, ...withoutDate } = aggregate;
  assert.equal(observedOn, '2024-02-29');
  for (const candidate of [null, [], {}, 'invalid', withoutDate,
    { ...aggregate, schemaVersion: 2 }, { ...aggregate, schemaVersion: '1' },
    { ...aggregate, source: 'cv' }, { ...aggregate, status: 'unknown' },
    { ...aggregate, rawRows: [] }, { ...aggregate, generatedAt: '2024-03-07' },
    { ...aggregate, metrics: { organicDownloads: 12345, installsOnActiveDevices: 678 } },
    { ...aggregate, metrics: { totalUserInstalls: 12345 } },
    { ...aggregate, metrics: { ...aggregate.metrics, organicDownloads: 12345 } },
    { ...aggregate, metrics: null }, { ...aggregate, metrics: [] },
    { ...unavailable, observedOn: null }, { ...unavailable, metrics: {} },
  ]) {
    assert.equal(parseProjectMetrics(candidate, now), null);
  }
});

test('rejects malformed, impossible and future calendar dates', () => {
  for (const observedOn of ['2024-2-29', '2024-02-30', '2023-02-29', '1900-02-29',
    '2024-04-31', '0000-01-01', '2024-00-01', '2024-13-01', '2024-01-00',
    '2024-01-32', '2024-03-08', '2024-02-29T00:00:00Z', ' 2024-02-29',
    '2024-02-29\n', null, 42]) {
    assert.equal(parseProjectMetrics({ ...aggregate, observedOn }, now), null, `${observedOn}`);
  }
  assert.equal(parseProjectMetrics(aggregate, new Date(NaN)), null);
});

test('accepts real leap days, old observations and the current UTC date', () => {
  for (const observedOn of ['2000-02-29', '2024-02-29', '2024-03-07']) {
    const candidate = { ...aggregate, observedOn };
    assert.deepEqual(parseProjectMetrics(candidate, now), candidate);
  }
  const offsetNow = new Date('2024-03-07T00:30:00+14:00');
  assert.equal(parseProjectMetrics({ ...aggregate, observedOn: '2024-03-07' }, offsetNow), null);
});

test('shipped unavailable JSON contains no invented counters or observation date', () => {
  const json = JSON.parse(readFileSync(new URL('../public/google-play-metrics.json', import.meta.url), 'utf8'));
  assert.deepEqual(json, unavailable);
  assert.deepEqual(parseProjectMetrics(json, now), unavailable);
});

test('missing, invalid or unavailable initial data uses the CV fallback', () => {
  for (const candidate of [undefined, null, {}, unavailable,
    withCounter('totalUserInstalls', -1)]) {
    assert.equal(retainProjectMetrics(null, candidate, now), null);
  }
});

test('a subsequent failed response retains last-good counters and the original source date', () => {
  const previous = parseProjectMetrics(aggregate, now);
  for (const candidate of [undefined, null, {}, unavailable,
    withCounter('installsOnActiveDevices', -1), { ...aggregate, observedOn: '2024-03-08' }]) {
    assert.equal(retainProjectMetrics(previous, candidate, now), previous);
  }
  const later = { ...aggregate, observedOn: '2024-03-01' };
  assert.deepEqual(retainProjectMetrics(previous, later, now), later);
});

for (const [language, locale] of [['es', 'es-ES'], ['en', 'en-US']]) {
  test(`${language}: CV values share numeric data, preserve the plus qualifier and unknown date`, () => {
    const view = formatProjectMetrics(null, snapshot, language);
    const number = new Intl.NumberFormat(locale);
    assert.equal(view.source, 'cv');
    assert.equal(view.primaryLabel, 'downloads');
    assert.equal(view.secondaryLabel, 'installs');
    assert.equal(view.primaryValue, `${number.format(snapshot.organicDownloads)}+`);
    assert.equal(view.secondaryValue, number.format(snapshot.activeInstalls));
    assert.equal(view.observedOn, null);
    assert.equal(view.observedDate, null);
    assert.match(translations[language].projects.downloads, /org[aá]nic/);
    assert.match(translations[language].projects.snapshot, /desconocida|unknown/);
  });

  test(`${language}: measured values have their own accurate labels and localized source date`, () => {
    const measured = parseProjectMetrics(aggregate, now);
    const view = formatProjectMetrics(measured, snapshot, language);
    assert.equal(view.source, 'google-play');
    assert.equal(view.primaryLabel, 'totalUserInstalls');
    assert.equal(view.secondaryLabel, 'installsOnActiveDevices');
    assert.equal(view.primaryValue, new Intl.NumberFormat(locale).format(12345));
    assert.equal(view.secondaryValue, new Intl.NumberFormat(locale).format(678));
    assert.equal(view.observedOn, '2024-02-29');
    assert.equal(view.observedDate, language === 'es' ? '29 de febrero de 2024' : 'February 29, 2024');
    assert.doesNotMatch(translations[language].projects[view.primaryLabel], /org[aá]nic/);
    assert.doesNotMatch(translations[language].projects[view.secondaryLabel], /org[aá]nic/);
    assert.match(translations[language].projects.reportingDelay, /3[–-]7/);
  });
}

test('zero measured counters remain measured rather than being treated as missing', () => {
  const candidate = { ...aggregate, metrics: { totalUserInstalls: 0, installsOnActiveDevices: 0 } };
  const measured = retainProjectMetrics(null, candidate, now);
  const view = formatProjectMetrics(measured, snapshot, 'es');
  assert.equal(view.source, 'google-play');
  assert.equal(view.primaryValue, '0');
  assert.equal(view.secondaryValue, '0');
});

test('old measured data stays measured without replacing its date with fetch time', () => {
  const measured = retainProjectMetrics(null, aggregate, new Date('2024-10-10T12:00:00Z'));
  const view = formatProjectMetrics(measured, snapshot, 'en');
  assert.equal(view.source, 'google-play');
  assert.equal(view.observedOn, aggregate.observedOn);
  assert.equal(view.observedDate, 'February 29, 2024');
});

test('public JSON URL respects root, relative and Pages subpath Vite bases', () => {
  for (const base of ['/', './', '/web-portfolio/']) {
    assert.equal(getProjectMetricsUrl(base), `${base}google-play-metrics.json`);
  }
});
