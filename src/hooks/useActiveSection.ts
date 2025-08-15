import { useState, useEffect } from 'react';
import type { Section } from '@/types';

export const useActiveSection = () => {
  const [activeSection, setActiveSection] = useState<Section>('home');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id as Section;
            if (id) setActiveSection(id);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '-100px 0px -100px 0px',
      }
    );

    // Observe all sections
    const sections = ['home', 'about', 'technologies', 'experience', 'contact'];
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (section: Section) => {
    const element = document.getElementById(section);
    if (element) {
      const offsetTop = element.offsetTop - 80; // Account for fixed header
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
    setActiveSection(section);
  };

  return { activeSection, scrollToSection };
};
