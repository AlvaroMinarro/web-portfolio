export type RollingSegment =
  | { kind: 'digit'; digit: number }
  | { kind: 'text'; text: string };

/**
 * Split a formatted counter into rollable digit columns and static separators.
 * Only ASCII 0-9 roll; qualifiers, grouping separators and non-ASCII numerals
 * stay static so localized formats like "2.400+", "2,400+" or "12 345" keep
 * their shape while their digits roll.
 */
export function splitRollingSegments(value: string): RollingSegment[] {
  const segments: RollingSegment[] = [];
  let text = '';
  for (const character of value) {
    if (character >= '0' && character <= '9') {
      if (text) {
        segments.push({ kind: 'text', text });
        text = '';
      }
      segments.push({ kind: 'digit', digit: Number(character) });
    } else {
      text += character;
    }
  }
  if (text) segments.push({ kind: 'text', text });
  return segments;
}
