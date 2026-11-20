import assert from 'node:assert/strict';
import test from 'node:test';
import { splitRollingSegments } from '../src/utils/rollingNumber.ts';

test('splits formatted counters into rollable digits and static separators', () => {
  assert.deepEqual(splitRollingSegments('2.400+'), [
    { kind: 'digit', digit: 2 },
    { kind: 'text', text: '.' },
    { kind: 'digit', digit: 4 },
    { kind: 'digit', digit: 0 },
    { kind: 'digit', digit: 0 },
    { kind: 'text', text: '+' },
  ]);
  assert.deepEqual(splitRollingSegments('800'), [
    { kind: 'digit', digit: 8 },
    { kind: 'digit', digit: 0 },
    { kind: 'digit', digit: 0 },
  ]);
  assert.deepEqual(splitRollingSegments('2,400+'), [
    { kind: 'digit', digit: 2 },
    { kind: 'text', text: ',' },
    { kind: 'digit', digit: 4 },
    { kind: 'digit', digit: 0 },
    { kind: 'digit', digit: 0 },
    { kind: 'text', text: '+' },
  ]);
});

test('merges adjacent non digit runs and keeps a bare zero usable', () => {
  assert.deepEqual(splitRollingSegments('0'), [{ kind: 'digit', digit: 0 }]);
  assert.deepEqual(splitRollingSegments('12 345'), [
    { kind: 'digit', digit: 1 },
    { kind: 'digit', digit: 2 },
    { kind: 'text', text: ' ' },
    { kind: 'digit', digit: 3 },
    { kind: 'digit', digit: 4 },
    { kind: 'digit', digit: 5 },
  ]);
  assert.deepEqual(splitRollingSegments(''), []);
});

test('only ASCII digits roll; other numerals stay static text', () => {
  for (const value of ['٩', '٣', '²']) {
    const segments = splitRollingSegments(value);
    assert.ok(segments.length > 0, `${value}: expected segments`);
    assert.ok(segments.every(segment => segment.kind === 'text'), `${value}: must not roll`);
  }
  for (const segment of splitRollingSegments('2½')) {
    if (segment.kind === 'digit') {
      assert.ok(segment.digit >= 0 && segment.digit <= 9);
    } else {
      assert.equal(typeof segment.text, 'string');
    }
  }
});
