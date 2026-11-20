/**
 * Position of the active section on the rail, in sectionIds order.
 * Unknown or missing ids map to -1: no node sparks and no fill is drawn.
 */
export function getActiveRailIndex(sections: readonly string[], active: string | null | undefined): number {
  return active ? sections.indexOf(active) : -1;
}
