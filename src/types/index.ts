import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  HTMLAttributes,
  ReactNode,
} from 'react';

export type Language = 'es' | 'en';
export type Theme = 'light' | 'dark';

export const sectionIds = [
  'home',
  'projects',
  'about',
  'experience',
  'technologies',
  'contact',
] as const;
export type Section = (typeof sectionIds)[number];
export type ExperienceId = 'llamas' | 'navilens' | 'freelance' | 'tracker';
export type CapabilityId = 'mobile' | 'web' | 'systems';

export interface Technology {
  id: CapabilityId;
  tools: string[];
  evidenceSection: Section;
}

export interface Experience {
  id: ExperienceId;
  company: string;
  category: 'employment' | 'independent';
  technologies: string[];
  logo?: string;
}

export interface ExperienceContent {
  role: string;
  period: string;
  metadata: string;
  description: string;
  details: string[];
}

export interface ContactLink {
  id: 'email' | 'linkedin' | 'github';
  name: string;
  url: string;
  display: string;
}

export interface TranslationContent {
  nav: Record<Section, string>;
  controls: {
    navigation: string;
    openMenu: string;
    closeMenu: string;
    switchLanguage: string;
    lightTheme: string;
    darkTheme: string;
    skip: string;
    backTop: string;
    external: string;
  };
  hero: {
    label: string;
    name: string;
    role: string;
    specialty: string;
    description: string;
    projectCta: string;
    downloadCV: string;
    contactCta: string;
    portraitAlt: string;
    portraitCaption: string;
    current: string;
    currentRole: string;
    location: string;
  };
  projects: {
    label: string;
    title: string;
    category: string;
    period: string;
    description: string;
    logoCaption: string;
    downloads: string;
    installs: string;
    snapshot: string;
    totalUserInstalls: string;
    installsOnActiveDevices: string;
    sourceDate: string;
    reportingDelay: string;
    architecture: string;
    architectureDescription: string;
    platforms: string;
    platformDescription: string;
    contactCta: string;
  };
  about: {
    label: string;
    title: string;
    description: string[];
    currentLabel: string;
    currentRole: string;
    currentPeriod: string;
    currentDescription: string;
    currentTools: string;
    experienceCta: string;
  };
  experience: {
    label: string;
    title: string;
    employment: string;
    independent: string;
    viewMore: string;
    viewLess: string;
    projectCta: string;
    items: Record<ExperienceId, ExperienceContent>;
    education: {
      label: string;
      title: string;
      institution: string;
      period: string;
      specialty: string;
      grade: string;
    };
  };
  technologies: {
    label: string;
    title: string;
    description: string;
    groups: Record<CapabilityId, { title: string; description: string; evidence: string }>;
    visualNote: string;
    workflow: string;
  };
  contact: {
    label: string;
    title: string;
    description: string;
    email: string;
    cvLabel: string;
    cvNote: string;
  };
  footer: {
    identity: string;
    theme: string;
  };
}

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
}

interface ButtonAppearance {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export type ButtonProps = ButtonAppearance & (
  | (ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined })
  | (AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; disabled?: never })
);
