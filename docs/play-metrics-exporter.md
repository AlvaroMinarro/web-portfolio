# Export local Google Play aggregates safely

M2 converts **local, normalized, single aggregate series** CSV files into one validated public observation. It has no dependencies, downloader, authentication, schedule, publication, or default output path. Synthetic tests do **not** establish compatibility with real Play exports; a representative export and its aggregation semantics are still pending.

## Quick path

Use Node with native TypeScript stripping (Node 22.18+); this implementation was tested on Linux with Node 26.8.1. The explicit flag below also documents the runtime requirement. Node 18 deployment workflows cannot import the shared `src/data/projectMetrics.ts` validator; M3 must resolve its runtime separately.

1. Confirm that every input is genuinely app-wide, not a country/device/other dimensional slice.
2. Supply the exact expected package and explicit local paths. The following paths and package are placeholders, not configured Play sources; use an existing trusted scratch directory first:

   ```sh
   node --experimental-strip-types scripts/refresh-google-play-metrics.mjs \
     --input /absolute/local/normalized-january.csv \
     --input /absolute/local/normalized-february.csv \
     --package YOUR_EXPECTED_PACKAGE \
     --output /absolute/scratch/google-play-metrics.json
   ```

3. Exit 0 means `updated` or byte-preserving `unchanged`; exit 1 means failure. Inspect the aggregate locally. Nothing deploys it or commits it. Do not activate either host merely because synthetic checks pass.

## Input contract and limitations

Exactly these four headers are required, in any order, with this spelling:

| Header | Required value |
| --- | --- |
| `Date` | Real, nonfuture `YYYY-MM-DD` source-data day (UTC comparison) |
| `Package Name` | Exact match to the explicit expected package on **every** row |
| `Total User Installs` | Nonnegative safe decimal integer, not an organic-download count |
| `Installs on active devices` | Nonnegative safe decimal integer, not an active-user count |

Only decimal digits are accepted for counters, including leading zeroes; maximum is `9007199254740991`. No trimming, signs, fractions, grouping, exponents, suffixes, or numeric whitespace. UTF8 with/without BOM and UTF16LE **with BOM** are supported using fatal decoding; other encodings, malformed bytes and NULs are rejected. Comma CSV supports quoted fields, doubled quotes, quoted newlines, and CRLF/LF/CR record endings. Completely empty records are ignored; each report must still contain a header and observations.

All extra headers are rejected, including known dimension columns (`Country`, `Device`, `Android Version`, etc.), unknown columns, and dimensions with blank or `All` values. There is **no verified `All` marker** and no country/device filtering. Raw dimensional Play reports may be rejected until a verified transformation exists. Removing a dimension column does not make its rows app totals: the caller must establish the aggregate-series precondition.

Every row in every input must be complete and valid. An incomplete newest row fails the entire refresh; it never silently promotes an older day as current. Duplicate days, even identical duplicates across monthly files, fail closed. For nonoverlapping month rollover, the latest original source day wins regardless of input/row order. Counters are never summed across dates or dimensions and are not required to increase between different days. A 3–7 day source delay is acceptable; execution time never becomes `observedOn`.

## Output and last-good protection

The exact allowlist is validated with the UI's exported `parseProjectMetrics(value, now?)`:

```json
{
  "schemaVersion": 1,
  "source": "google-play",
  "status": "available",
  "observedOn": "2024-02-29",
  "metrics": {
    "totalUserInstalls": 12345,
    "installsOnActiveDevices": 678
  }
}
```

These figures are synthetic. No package, raw CSV, dimensions, job timestamps, or unknown fields enter the output.

| Target situation | Policy |
| --- | --- |
| Missing target | Create only after fully valid aggregate input |
| Valid available or unavailable target | Allow a newer observation; preserve old bytes on errors |
| Older candidate | Reject; never regress the existing source date |
| Same date, identical counters | No-op, preserving existing formatting/bytes |
| Same date, different counters | Reject; deliberate correction policy is not implemented |
| Invalid existing JSON/schema, symlink, dangling symlink, directory, hardlink | Reject and preserve; never silently repair/replace |

The exporter exclusively creates a random `.play-metrics-*.tmp` in the target directory, writes/syncs it, rereads and validates it, rechecks target identity/bytes, and renames it atomically. Pre-replacement failures clean up only its own generated temporary file; other files are untouched. If the filesystem itself refuses cleanup, failure is reported, but removal cannot be guaranteed. Parent directories must already exist and be trusted; concurrent/adversarial writers or symlinked parent paths are outside this local single-writer contract. The final recheck detects changes during preparation but is not a filesystem transaction lock. No failing post-rename operation is performed.

CLI errors contain only fixed categories (`configuration`, `encoding`, `csv`, `headers`, `empty`, `package`, `observation`, `duplicate`, `target`, `regression`, `conflict`, `filesystem`), never underlying IO messages or report contents/paths. Diagnose locally without publishing raw reports or secrets.

## API and checks

`parsePlayReports([Uint8Array, ...], expectedPackage, now?)` returns the latest validated observation or throws `MetricsExportError`. `refreshGooglePlayMetrics({ inputPaths, expectedPackage, outputPath, now? })` returns a promise of `updated` or `unchanged`; its optional second argument is a filesystem adapter for deterministic failure tests. Both defaults use the current UTC day for validation, not public freshness.

```sh
node --experimental-strip-types --test scripts/refresh-google-play-metrics.test.mjs
node --experimental-strip-types --test scripts/project-metrics.test.mjs
npm run type-check
```

Tests use inline synthetic fixtures only inside isolated `os.tmpdir()` directories named `portfolio-play-metrics-exporter-*`, retain scratch artifacts for inspection, and never write repository public metrics. They exercise parser rejection separately from output conflict protection, byte preservation, owned-temp cleanup, filesystem failures, and sanitized CLI behavior.

## M3 prerequisites — not activated

- Obtain the actual package, bucket/report dimensions, and sanitized representative headers/rows; verify a genuine app-wide aggregate transformation before claiming live compatibility.
- Choose a runtime that can reuse the shared validator; arrange separately authorized service-account/download access without exposing credentials or raw reports.
- Design daily/manual refresh and durable last-good retention for **both Hostinger and GitHub Pages**, including ordinary deployments and failed jobs; do not publish failed candidates.
- Independently verify source ingestion, dual-host delivery and runtime, then obtain separate activation/publication approval. This local M2 neither changes workflows nor enables a live schedule.

Official export background: https://support.google.com/googleplay/android-developer/answer/6135870?hl=en
