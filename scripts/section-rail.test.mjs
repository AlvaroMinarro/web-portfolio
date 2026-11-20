import assert from 'node:assert/strict';
import test from 'node:test';
import { getActiveRailIndex } from '../src/utils/sectionRail.ts';

const ids = ['home', 'projects', 'about', 'experience', 'technologies', 'contact'];

test('maps each known section to its rail position', () => {
  assert.equal(getActiveRailIndex(ids, 'home'), 0);
  assert.equal(getActiveRailIndex(ids, 'projects'), 1);
  assert.equal(getActiveRailIndex(ids, 'technologies'), 4);
  assert.equal(getActiveRailIndex(ids, 'contact'), 5);
});

test('unknown or missing ids keep the rail dark', () => {
  assert.equal(getActiveRailIndex(ids, 'navilens'), -1);
  assert.equal(getActiveRailIndex(ids, null), -1);
  assert.equal(getActiveRailIndex(ids, undefined), -1);
  assert.equal(getActiveRailIndex([], 'home'), -1);
});
