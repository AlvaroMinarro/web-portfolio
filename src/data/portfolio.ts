import type { Technology, Experience, ContactLink } from '@/types';

// Import all images
import androidIcon from '/android.svg';
import kotlinIcon from '/kotlin.svg';
import jetpackComposeIcon from '/jetpackcompose.svg';
import jsIcon from '/js.svg';
import tsIcon from '/ts.svg';
import reactIcon from '/react.svg';
import angularIcon from '/angular.svg';
import htmlIcon from '/html.svg';
import cssIcon from '/css.svg';
import nodejsIcon from '/nodejs.svg';
import firebaseIcon from '/firebase.svg';
import awsIcon from '/aws.svg';
import githubIcon from '/github.svg';
import gitlabIcon from '/gitlab.svg';
import asanaIcon from '/asana.svg';
import linkedinIcon from '/linkedin.svg';
import navilensImage from '/navilens.jpg';
import lolesportstrackerImage from '/lolesportstracker.png';

export const technologies: Technology[] = [
  // Mobile Development - Nivel 3 (Expert)
  {
    name: 'Android',
    icon: androidIcon,
    color: 'text-green-500',
    category: 'mobile',
    level: 3,
  },
  {
    name: 'Kotlin',
    icon: kotlinIcon,
    color: 'text-purple-500',
    category: 'mobile',
    level: 3,
  },
  {
    name: 'Jetpack Compose',
    icon: jetpackComposeIcon,
    color: 'text-blue-500',
    category: 'mobile',
    level: 3,
  },

  // Kotlin Multiplatform - Nivel 1 (Estudiando)
  {
    name: 'KMP',
    icon: kotlinIcon,
    color: 'text-purple-400',
    category: 'mobile',
    level: 1,
  },

  // Frontend - Nivel 2 (Avanzado)
  {
    name: 'JavaScript',
    icon: jsIcon,
    color: 'text-yellow-500',
    category: 'frontend',
    level: 2,
  },
  {
    name: 'TypeScript',
    icon: tsIcon,
    color: 'text-blue-600',
    category: 'frontend',
    level: 2,
  },
  {
    name: 'React',
    icon: reactIcon,
    color: 'text-cyan-500',
    category: 'frontend',
    level: 2,
  },
  {
    name: 'Angular',
    icon: angularIcon,
    color: 'text-red-600',
    category: 'frontend',
    level: 2,
  },
  {
    name: 'HTML',
    icon: htmlIcon,
    color: 'text-orange-600',
    category: 'frontend',
    level: 2,
  },
  {
    name: 'CSS',
    icon: cssIcon,
    color: 'text-blue-500',
    category: 'frontend',
    level: 2,
  },

  // Backend - Nivel 2 (Avanzado)
  {
    name: 'Node.js',
    icon: nodejsIcon,
    color: 'text-green-600',
    category: 'backend',
    level: 2,
  },

  // Database & Cloud
  {
    name: 'Firebase',
    icon: firebaseIcon,
    color: 'text-orange-500',
    category: 'database',
    level: 2,
  },
  {
    name: 'AWS',
    icon: awsIcon,
    color: 'text-orange-400',
    category: 'tools',
    level: 2,
  },
  

  // Tools
  {
    name: 'Git',
    icon: '📝',
    color: 'text-orange-600',
    category: 'tools',
    level: 3,
  },
  {
    name: 'GitHub',
    icon: githubIcon,
    color: 'text-gray-800 dark:text-white',
    category: 'tools',
    level: 3,
  },
  {
    name: 'GitLab',
    icon: gitlabIcon,
    color: 'text-orange-500',
    category: 'tools',
    level: 3,
  },
  {
    name: 'Asana',
    icon: asanaIcon,
    color: 'text-pink-500',
    category: 'tools',
    level: 2,
  },
  {
    name: 'JWT',
    icon: '🔐',
    color: 'text-gray-600',
    category: 'tools',
    level: 2,
  },
];

export const experiences: Experience[] = [
  {
    id: '1',
    company: 'Navilens',
    position: 'Desarrollador Full Stack',
    period: 'Febrero 2025',
    description: 'Desarrollo y mantenimiento de aplicaciones web con Angular, incluyendo un maquetador de plantillas que procesa JSON y datos de Excel para generar vistas visuales editables. Gestión de integraciones con AWS S3 y CloudFront para el manejo de documentos.',
    technologies: ['Angular', 'TypeScript', 'AWS', 'CloudFront', 'Firebase', 'JavaScript', 'HTML', 'CSS'],
    location: 'España',
    type: 'full-time',
    achievements: [
      'Desarrollo de maquetador de plantillas con Angular',
      'Integración con AWS S3 para gestión de documentos',
      'Mantenimiento web Accesible QR de Navilens',
      'Implementación de nuevas features en app Android',
      'Gestión de notificaciones Firebase con topics',
      'Sistema de autenticación JWT'
    ],
    projectImage: navilensImage
  },
  {
    id: '2',
    company: 'Proyecto Personal',
    position: 'Desarrollador Android',
    period: '2024 - Presente',
    description: 'Desarrollo de "Lol Esports Tracker", una aplicación Android nativa en Kotlin y Jetpack Compose para seguimiento de esports de League of Legends. Actualmente en proceso de migración a Kotlin Multiplatform para soporte iOS.',
    technologies: ['Kotlin', 'Jetpack Compose', 'Android', 'KMP', 'Firebase', 'React'],
    location: 'Proyecto Personal',
    type: 'freelance',
    achievements: [
      'Aplicación completamente nativa en Kotlin',
      'UI moderna con Jetpack Compose',
      'Migración en curso a Kotlin Multiplatform',
      'Integración con APIs de League of Legends',
      'Gestión de estado con arquitectura MVVM'
    ],
    projectImage: lolesportstrackerImage
  }
];

export const contactLinks: ContactLink[] = [
  {
    name: 'Email',
    url: 'mailto:amglorca@gmail.com',
    icon: '📧',
    color: 'text-red-500',
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/alvaro-minarro-gil/',
    icon: linkedinIcon,
    color: 'text-blue-600',
  },
  {
    name: 'GitHub',
    url: 'https://github.com/AlvaroMinarro',
    icon: githubIcon,
    color: 'text-gray-900 dark:text-white',
  },
];