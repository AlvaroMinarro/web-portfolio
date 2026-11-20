/**
 * Split text into streamable words. Whitespace runs collapse to single
 * separators and edges are trimmed; punctuation stays attached to its word so
 * the streamed rendering reads like generated prose.
 */
export function splitStreamWords(value: string): string[] {
  const words = value.trim().split(/\s+/);
  return words.length === 1 && words[0] === '' ? [] : words;
}
