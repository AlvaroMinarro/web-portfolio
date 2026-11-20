import { useEffect, useState } from 'react';
import { getProjectMetricsUrl, retainProjectMetrics } from '@/data/projectMetrics';
import type { MeasuredProjectMetrics } from '@/data/projectMetrics';

export function useProjectMetrics() {
  const [metrics, setMetrics] = useState<MeasuredProjectMetrics | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    let cancelled = false;

    const loadMetrics = async () => {
      try {
        const response = await fetch(getProjectMetricsUrl(import.meta.env.BASE_URL), {
          signal: controller.signal,
          credentials: 'omit',
          redirect: 'error',
          cache: 'no-cache',
        });
        if (!response.ok || cancelled) return;
        const candidate: unknown = await response.json();
        if (!cancelled) setMetrics(previous => retainProjectMetrics(previous, candidate));
      } catch {
        // HTTP/JSON/network/abort errors leave the CV fallback or last-good observation intact.
      }
    };
    void loadMetrics();

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, []);

  return metrics;
}
