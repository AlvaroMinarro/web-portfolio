import assert from 'node:assert/strict';
import test from 'node:test';
import { splitStreamWords } from '../src/utils/streamText.ts';

test('splits prose into words with punctuation attached', () => {
  assert.deepEqual(splitStreamWords('Construyo software que se siente físico.'), [
    'Construyo',
    'software',
    'que',
    'se',
    'siente',
    'físico.',
  ]);
  assert.deepEqual(splitStreamWords('Android & Full Stack Developer'), [
    'Android',
    '&',
    'Full',
    'Stack',
    'Developer',
  ]);
});

test('collapses whitespace runs and trims edges', () => {
  assert.deepEqual(splitStreamWords('  dos   palabras  '), ['dos', 'palabras']);
  assert.deepEqual(splitStreamWords('\ttabs\tand\nnewlines '), ['tabs', 'and', 'newlines']);
});

test('empty and blank values yield no words', () => {
  assert.deepEqual(splitStreamWords(''), []);
  assert.deepEqual(splitStreamWords('   '), []);
});
