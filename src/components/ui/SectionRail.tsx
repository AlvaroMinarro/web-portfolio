import type { CSSProperties } from 'react';
import { useActiveSection } from '@hooks/index';
import { sectionIds } from '@/types';
import { getActiveRailIndex } from '@utils/sectionRail';

/**
 * Decorative circuit rail fixed to the viewport's left margin: a green trace
 * energizing down to the active section's node, which fires a warm-yellow
 * spark when a section becomes current. Hidden below 768px, aria-hidden and
 * pointer-transparent; reduced motion flattens it to a static rail.
 */
const SectionRail = () => {
  const { activeSection } = useActiveSection();
  const activeIndex = getActiveRailIndex(sectionIds, activeSection);

  return (
    <aside className="section-rail" aria-hidden="true">
      <span className="rail-track" />
      <span
        className="rail-fill"
        style={{
          '--rail-active': Math.max(activeIndex, 0),
          '--rail-steps': sectionIds.length - 1,
        } as CSSProperties}
      />
      {sectionIds.map((section, index) => (
        <span
          key={section}
          className={`rail-node${index === activeIndex ? ' is-active' : ''}`}
        />
      ))}
    </aside>
  );
};

export default SectionRail;
