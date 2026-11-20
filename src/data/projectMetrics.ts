import type { Language } from '../types/index.ts';

/** Public allowlist for M2: one complete observation, never raw reports or attribution. */
export interface MeasuredProjectMetrics {
  schemaVersion: 1;
  source: 'google-play';
  status: 'available';
  /** Google Play source-data day (YYYY-MM-DD), not the exporter execution date. */
  observedOn: string;
  metrics: {
    totalUserInstalls: number;
    installsOnActiveDevices: number;
  };
}

export type PublicProjectMetrics = MeasuredProjectMetrics | {
  schemaVersion: 1;
  source: 'google-play';
  status: 'unavailable';
};

export interface CvProjectMetrics {
  organicDownloads: number;
  organicDownloadsQualifier: '+';
  activeInstalls: number;
  /** CV evidence observation month (YYYY-MM); null keeps the unknown-date disclaimer. */
  observedOn: string | null;
}

function hasExactKeys(value: unknown, keys: string[]): value is Record<string, unknown> {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) return false;
  const actual = Object.keys(value);
  return actual.length === keys.length && keys.every(key => actual.includes(key));
}

function isObservationDate(value: unknown, now: Date): value is string {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)
    || value.startsWith('0000') || !Number.isFinite(now.getTime())) return false;
  const day = new Date(`${value}T00:00:00Z`);
  if (!Number.isFinite(day.getTime()) || day.toISOString().slice(0, 10) !== value) return false;
  return value <= now.toISOString().slice(0, 10);
}

/** CV evidence is month-precision: never invent a day the author did not state. */
function isObservationMonth(value: string, now: Date): boolean {
  if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(value)) return false;
  const day = new Date(`${value}-01T00:00:00Z`);
  if (!Number.isFinite(day.getTime()) || day.toISOString().slice(0, 7) !== value) return false;
  return value <= now.toISOString().slice(0, 7);
}

function isCounter(value: unknown): value is number {
  return typeof value === 'number' && Number.isSafeInteger(value) && value >= 0;
}

/** Reject incomplete/unknown shapes, unsafe counters and impossible/future UTC dates. */
export function parseProjectMetrics(value: unknown, now = new Date()): PublicProjectMetrics | null {
  if (hasExactKeys(value, ['schemaVersion', 'source', 'status'])
    && value.schemaVersion === 1 && value.source === 'google-play' && value.status === 'unavailable') {
    return { schemaVersion: 1, source: 'google-play', status: 'unavailable' };
  }
  if (!hasExactKeys(value, ['schemaVersion', 'source', 'status', 'observedOn', 'metrics'])
    || value.schemaVersion !== 1 || value.source !== 'google-play' || value.status !== 'available'
    || !isObservationDate(value.observedOn, now)
    || !hasExactKeys(value.metrics, ['totalUserInstalls', 'installsOnActiveDevices'])
    || !isCounter(value.metrics.totalUserInstalls)
    || !isCounter(value.metrics.installsOnActiveDevices)) return null;

  return {
    schemaVersion: 1,
    source: 'google-play',
    status: 'available',
    observedOn: value.observedOn,
    metrics: {
      totalUserInstalls: value.metrics.totalUserInstalls,
      installsOnActiveDevices: value.metrics.installsOnActiveDevices,
    },
  };
}

/** Missing/failed/unavailable responses never erase a previously measured observation. */
export function retainProjectMetrics(
  previous: MeasuredProjectMetrics | null,
  candidate: unknown,
  now = new Date(),
): MeasuredProjectMetrics | null {
  const parsed = parseProjectMetrics(candidate, now);
  return parsed?.status === 'available' ? parsed : previous;
}

export function getProjectMetricsUrl(baseUrl: string): string {
  return `${baseUrl}google-play-metrics.json`;
}

export function formatProjectMetrics(
  measured: MeasuredProjectMetrics | null,
  snapshot: CvProjectMetrics,
  language: Language,
  now = new Date(),
) {
  const locale = language === 'es' ? 'es-ES' : 'en-US';
  const number = new Intl.NumberFormat(locale);
  if (measured) {
    return {
      source: 'google-play' as const,
      primaryLabel: 'totalUserInstalls' as const,
      primaryValue: number.format(measured.metrics.totalUserInstalls),
      secondaryLabel: 'installsOnActiveDevices' as const,
      secondaryValue: number.format(measured.metrics.installsOnActiveDevices),
      observedOn: measured.observedOn,
      observedDate: new Intl.DateTimeFormat(locale, {
        year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC',
      }).format(new Date(`${measured.observedOn}T00:00:00Z`)),
    };
  }
  const observedMonth = typeof snapshot.observedOn === 'string' && isObservationMonth(snapshot.observedOn, now)
    ? snapshot.observedOn
    : null;
  return {
    source: 'cv' as const,
    primaryLabel: 'downloads' as const,
    primaryValue: `${number.format(snapshot.organicDownloads)}${snapshot.organicDownloadsQualifier}`,
    secondaryLabel: 'installs' as const,
    secondaryValue: number.format(snapshot.activeInstalls),
    observedOn: observedMonth,
    observedDate: observedMonth
      ? new Intl.DateTimeFormat(locale, {
        year: 'numeric', month: 'long', timeZone: 'UTC',
      }).format(new Date(`${observedMonth}-01T00:00:00Z`))
      : null,
  };
}
