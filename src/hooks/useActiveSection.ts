import { useState, useEffect } from 'react';
import { sectionIds } from '@/types';
import type { Section } from '@/types';

export const useActiveSection = () => {
  const [activeSection, setActiveSection] = useState<Section>('home');

  useEffect(() => {
    const sections = sectionIds.flatMap(id => {
      const element = document.getElementById(id);
      return element ? [{ id, element }] : [];
    });
    let frame: number | undefined;

    const updateActiveSection = () => {
      frame = undefined;
      // Track the reading line, not a percentage of a potentially very tall section.
      const readingLine = sections[0]
        ? parseFloat(window.getComputedStyle(sections[0].element).scrollMarginTop) + 1
        : 0;
      let current: Section = 'home';
      for (const { id, element } of sections) {
        if (element.getBoundingClientRect().top <= readingLine) current = id;
      }
      if (window.scrollY > 0 && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
        current = 'contact';
      }
      setActiveSection(current);
    };
    const scheduleUpdate = () => {
      if (frame === undefined) frame = window.requestAnimationFrame(updateActiveSection);
    };
    const observer = new IntersectionObserver(scheduleUpdate, { threshold: 0 });
    sections.forEach(({ element }) => observer.observe(element));
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    updateActiveSection();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      if (frame !== undefined) window.cancelAnimationFrame(frame);
    };
  }, []);

  const scrollToSection = (section: Section) => {
    const element = document.getElementById(section);
    if (!element) return;
    element.scrollIntoView({
      block: 'start',
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    });
    setActiveSection(section);
  };

  return { activeSection, scrollToSection };
};
