import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

// Regression guard for the pre-animation flash reported on Gecko (Zen/Firefox):
// the WAAPI reveal only attaches in transition.ready, so until then this CSS
// clamp is the only thing keeping the incoming snapshot from painting
// page-wide. Deleting it silently reintroduces the flash.
test('shipped reveal CSS clamps the incoming snapshot to the trusted origin', () => {
  const css = readFileSync(new URL('../src/styles/index.css', import.meta.url), 'utf8').replace(/\s+/g, ' ');
  assert.match(
    css,
    /:root\.theme-reveal::view-transition-new\(root\)\s*\{[^}]*clip-path: circle\(0px at var\(--theme-reveal-x/,
    'incoming snapshot must stay clamped to the trusted origin until WAAPI takes over',
  );
});
