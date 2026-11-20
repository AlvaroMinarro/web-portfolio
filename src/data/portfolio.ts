import { Archive, House, Layers, LayoutPanelTop, Network, ToggleRight, type LucideIcon } from 'lucide-react';
import type { Technology, Experience, ContactLink } from '@/types';
import type { CvProjectMetrics } from './projectMetrics';

const BASE_URL = import.meta.env.BASE_URL;

export const portfolioAssets = {
  portrait: `${BASE_URL}portfolio-portrait.webp`,
  llamas: `${BASE_URL}llamas-logo.webp`,
  navilens: `${BASE_URL}navilens.svg`,
  tracker: `${BASE_URL}lolesportstracker.png`,
  cv: `${BASE_URL}AlvaroMinarro-CV.pdf`,
  androidPeek: `${BASE_URL}android-peek.svg`,
};

export const flagshipProject = {
  title: 'LoL Esports Tracker',
  technologies: ['Kotlin', 'Compose Multiplatform', 'Ktor', 'Firebase'],
  // CV evidence observed by the author in November 2026; not measured Google Play counters.
  snapshot: {
    organicDownloads: 2400,
    organicDownloadsQualifier: '+',
    activeInstalls: 800,
    observedOn: '2026-11',
  } satisfies CvProjectMetrics,
};

// Decorative brand images only; tool names remain the source of accessible content.
export const technologyLogos: Partial<Record<string, string>> = {
  Android: `${BASE_URL}android.svg`,
  Kotlin: `${BASE_URL}kotlin.svg`,
  'Jetpack Compose': `${BASE_URL}jetpackcompose.svg`,
  React: `${BASE_URL}react.svg`,
  Angular: `${BASE_URL}angular.svg`,
  TypeScript: `${BASE_URL}ts.svg`,
  'Node.js': `${BASE_URL}nodejs.svg`,
  Ktor: `${BASE_URL}technology-logos/ktor.svg`,
  Firebase: `${BASE_URL}firebase.svg`,
  PHP: `${BASE_URL}technology-logos/php.svg`,
  WordPress: `${BASE_URL}technology-logos/wordpress.svg`,
};

// Neutral concept illustrations, not product logos (see asset provenance).
// Exact tool names keep related brands and shared substrings from claiming an identity.
export const technologySymbols: Partial<Record<string, LucideIcon>> = {
  'Kotlin Multiplatform': Layers,
  'Compose Multiplatform': LayoutPanelTop,
  'AWS S3': Archive,
  'Home Assistant': House,
  Shelly: ToggleRight,
  IoT: Network,
};

export const technologies: Technology[] = [
  {
    id: 'mobile',
    tools: ['Android', 'Kotlin', 'Jetpack Compose', 'Kotlin Multiplatform', 'Compose Multiplatform'],
    evidenceSection: 'projects',
  },
  {
    id: 'web',
    tools: ['React', 'Angular', 'TypeScript', 'Node.js', 'Ktor', 'Firebase', 'AWS S3', 'PHP', 'WordPress'],
    evidenceSection: 'experience',
  },
  {
    id: 'systems',
    tools: ['Home Assistant', 'Shelly', 'IoT'],
    evidenceSection: 'about',
  },
];

export const experiences: Experience[] = [
  {
    id: 'llamas',
    company: 'Llamas',
    category: 'employment',
    technologies: ['Home Assistant', 'Shelly', 'IoT'],
    logo: portfolioAssets.llamas,
  },
  {
    id: 'navilens',
    company: 'NaviLens',
    category: 'employment',
    technologies: ['Android', 'Angular', 'React', 'Node.js', 'TypeScript', 'AWS S3'],
    logo: portfolioAssets.navilens,
  },
  {
    id: 'freelance',
    company: 'Freelance',
    category: 'independent',
    technologies: ['PHP', 'WordPress', 'JavaScript', 'HTML', 'CSS'],
  },
  {
    id: 'tracker',
    company: flagshipProject.title,
    category: 'independent',
    technologies: flagshipProject.technologies,
  },
];

export const contactLinks: ContactLink[] = [
  {
    id: 'email',
    name: 'Email',
    url: 'mailto:amglorca@gmail.com',
    display: 'amglorca@gmail.com',
  },
  {
    id: 'github',
    name: 'GitHub',
    url: 'https://github.com/AlvaroMinarro',
    display: 'AlvaroMinarro',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/alvaro-minarro-gil/',
    display: 'Álvaro Miñarro Gil',
  },
];
