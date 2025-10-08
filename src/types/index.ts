// Language types
export type Language = 'es' | 'en';

// Theme types
export type Theme = 'light' | 'dark';

// Navigation section types
export type Section = 'home' | 'about' | 'technologies' | 'experience' | 'contact';

// Technology interface
export interface Technology {
  name: string;
  icon: string;
  color: string;
  category: 'mobile' | 'frontend' | 'backend' | 'database' | 'tools';
  level?: 1 | 2 | 3; // 1: Estudiando, 2: Avanzado, 3: Expert
}

// Experience interface
export interface Experience {
  id: string;
  company: string;
  position: string;
  period: string;
  description: string;
  technologies: string[];
  location?: string;
  type?: 'full-time' | 'part-time' | 'contract' | 'freelance';
  achievements?: string[];
  projectImage?: string;
}

// Project interface
export interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

// Contact link interface
export interface ContactLink {
  name: string;
  url: string;
  icon: string;
  color: string;
}

// Translation content interface
export interface TranslationContent {
  nav: {
    home: string;
    about: string;
    technologies: string;
    experience: string;
    contact: string;
  };
  hero: {
    greeting: string;
    name: string;
    role: string;
    education: string;
    description: string;
    cta: string;
    scroll: string;
    downloadCV: string;
    status: string;
    badges?: {
      androidExpert: string;
      kotlinCompose: string;
      fullStack: string;
    };
  };
  about: {
    title: string;
    subtitle: string;
    description: string[];
    skills: string;
    downloadCV: string;
  };
  technologies: {
    title: string;
    subtitle: string;
    categories: {
      mobile: string;
      frontend: string;
      backend: string;
      database: string;
      tools: string;
    };
  };
  experience: {
    title: string;
    subtitle: string;
    present: string;
    viewMore: string;
    viewLess: string;
  };
  contact: {
    title: string;
    subtitle: string;
    ctaTitle: string;
    ctaDescription: string;
    form: {
      name: string;
      email: string;
      message: string;
      send: string;
      sending: string;
      success: string;
      error: string;
    };
    links: {
      email: string;
      linkedin: string;
      github: string;
    };
  };
  footer: {
    madeWith: string;
    and: string;
    rights: string;
  };
}

// Animation variants type
export interface AnimationVariants {
  hidden: object;
  visible: object;
}

// Component props types
export interface SectionProps {
  className?: string;
  children: React.ReactNode;
}

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
  href?: string;
  target?: string;
  rel?: string;
  type?: 'button' | 'submit' | 'reset';
  download?: string | boolean;
}
