# 🚀 Portfolio Web Moderno - Álvaro

Portfolio web profesional y moderno construido con las últimas tecnologías web. Diseñado específicamente para desarrolladores Android y Full Stack, con un enfoque en la escalabilidad, mantenibilidad y mejores prácticas.

## ✨ Características

- 🎨 **Diseño Moderno** - Interfaz minimalista con animaciones fluidas
- 🌓 **Modo Oscuro/Claro** - Cambio automático según preferencias del sistema
- 🌍 **Multiidioma** - Soporte completo para Español e Inglés
- 📱 **Responsive** - Optimizado para todos los dispositivos
- ⚡ **Performance** - Carga rápida con lazy loading y code splitting
- 🎭 **Animaciones** - Transiciones suaves con Framer Motion
- 🔍 **SEO Optimizado** - Meta tags y structured data
- ♿ **Accesible** - Cumple con estándares WCAG
- 🛠️ **Type Safe** - 100% TypeScript con tipos estrictos

## 🛠️ Stack Tecnológico

### Core
- **React 18** - Framework UI con Concurrent Features
- **TypeScript** - Tipado estático para mayor robustez
- **Vite** - Build tool ultrarrápido
- **Tailwind CSS** - Utility-first CSS framework

### Animaciones & UI
- **Framer Motion** - Animaciones declarativas y fluidas
- **Lucide React** - Iconos SVG optimizados
- **PostCSS** - Procesamiento avanzado de CSS

### Development Experience
- **ESLint** - Linting con reglas estrictas
- **Prettier** - Formateo consistente de código
- **GitHub Actions** - CI/CD automatizado

### Deployment
- **GitHub Pages** - Hosting gratuito y confiable
- **Optimización automática** - Minificación y tree shaking

## 📁 Estructura del Proyecto

```
src/
├── components/           # Componentes React reutilizables
│   ├── ui/              # Componentes de interfaz básicos
│   │   ├── Button.tsx
│   │   ├── Section.tsx
│   │   └── index.ts
│   ├── layout/          # Componentes de layout
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── index.ts
│   └── sections/        # Secciones de la página
│       ├── Hero.tsx
│       ├── About.tsx
│       ├── Technologies.tsx
│       ├── Experience.tsx
│       ├── Contact.tsx
│       └── index.ts
├── hooks/               # Custom React hooks
│   ├── useTheme.ts
│   ├── useLanguage.ts
│   ├── useActiveSection.ts
│   └── index.ts
├── types/               # Definiciones de tipos TypeScript
│   └── index.ts
├── i18n/                # Internacionalización
│   └── translations.ts
├── data/                # Datos del portfolio
│   └── portfolio.ts
├── styles/              # Estilos globales
│   └── index.css
├── assets/              # Recursos estáticos
│   └── perfil.jpeg
├── App.tsx              # Componente principal
└── main.tsx             # Punto de entrada
```

## 🚀 Configuración y Desarrollo

### Prerrequisitos
- Node.js 18+ 
- npm o yarn

### Instalación

1. **Clona el repositorio**:
   ```bash
   git clone https://github.com/tu-usuario/web-portfolio.git
   cd web-portfolio
   ```

2. **Instala dependencias**:
   ```bash
   npm install
   ```

3. **Inicia el servidor de desarrollo**:
   ```bash
   npm run dev
   ```

4. **Abre en el navegador**:
   ```
   http://localhost:3000
   ```

### Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Servidor de desarrollo
npm run preview      # Vista previa de producción

# Build
npm run build        # Construcción para producción
npm run type-check   # Verificación de tipos

# Calidad de código
npm run lint         # Ejecutar ESLint
npm run lint:fix     # Corregir errores de ESLint automáticamente
npm run format       # Formatear código con Prettier

# Deployment
npm run deploy       # Desplegar a GitHub Pages
```

## 🎨 Personalización

### 1. Información Personal

Edita `src/data/portfolio.ts`:

```typescript
// Actualiza tu información
export const experiences: Experience[] = [
  {
    id: '1',
    company: 'Tu Empresa',
    position: 'Tu Posición',
    period: '2022',
    description: 'Tu descripción...',
    technologies: ['Android', 'Kotlin', 'React'],
    location: 'Tu Ciudad',
    type: 'full-time',
  },
  // ... más experiencias
];
```

### 2. Tecnologías

Modifica el array de tecnologías:

```typescript
export const technologies: Technology[] = [
  {
    name: 'Android',
    icon: '🤖',
    color: 'text-tech-android',
    category: 'mobile',
  },
  // ... más tecnologías
];
```

### 3. Traducciones

Actualiza `src/i18n/translations.ts`:

```typescript
export const translations = {
  es: {
    hero: {
      name: 'Tu Nombre',
      role: 'Tu Rol',
      // ...
    },
  },
  en: {
    // Versión en inglés
  },
};
```

### 4. Estilos y Colores

Personaliza en `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        500: '#tu-color-primario',
        // ...
      },
    },
  },
},
```

### 5. Assets

- Reemplaza `src/assets/perfil.jpeg` con tu foto
- Actualiza el favicon en `index.html`
- Modifica el manifest en `public/manifest.json`

## 🌐 Deployment

### GitHub Pages (Automático)

1. **Configura el repositorio**:
   - Ve a Settings > Pages
   - Source: GitHub Actions

2. **Actualiza vite.config.ts**:
   ```typescript
   export default defineConfig({
     base: '/tu-repositorio-nombre/',
   });
   ```

3. **Push a main**:
   ```bash
   git push origin main
   ```

El sitio se desplegará automáticamente en `https://tu-usuario.github.io/tu-repositorio-nombre/`

### Manual

```bash
npm run build
npm run deploy
```

## 📊 Performance y Optimizaciones

- **Code Splitting** - Chunks automáticos por rutas
- **Tree Shaking** - Eliminación de código no utilizado
- **Image Optimization** - Compresión automática de imágenes
- **CSS Purging** - Eliminación de CSS no utilizado
- **Lazy Loading** - Carga diferida de componentes
- **Bundle Analysis** - Análisis del tamaño del bundle

## 🧪 Testing y Calidad

```bash
# Análisis de tipos
npm run type-check

# Linting
npm run lint

# Formateo
npm run format
```

## 🔧 Configuración Avanzada

### Variables de Entorno

Crea `.env.local`:

```env
VITE_CONTACT_EMAIL=tu@email.com
VITE_GITHUB_USERNAME=tu-usuario
VITE_LINKEDIN_URL=tu-linkedin
```

### Integración con Servicios

- **EmailJS** - Para formulario de contacto
- **Google Analytics** - Para métricas
- **Hotjar** - Para análisis de UX

## 📈 SEO y Analytics

El portfolio incluye:
- Meta tags optimizados
- Open Graph tags
- Twitter Cards
- Structured data (JSON-LD)
- Sitemap automático

## 🐛 Solución de Problemas

### Problemas Comunes

1. **Error de build**:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Problemas de tipos**:
   ```bash
   npm run type-check
   ```

3. **GitHub Pages no actualiza**:
   - Verifica que el workflow esté habilitado
   - Revisa los logs en Actions
   - Confirma que `base` en vite.config.ts sea correcto

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## 📄 Licencia

MIT License - siéntete libre de usar este código para tu propio portfolio.

## 📞 Contacto

- 📧 **Email**: [tu-email@ejemplo.com](mailto:tu-email@ejemplo.com)
- 💼 **LinkedIn**: [tu-perfil](https://linkedin.com/in/tu-perfil)
- 🐙 **GitHub**: [tu-usuario](https://github.com/tu-usuario)

---

⭐ **¡No olvides darle una estrella al repo si te fue útil!**

Construido con ❤️ y ⚡ Vite