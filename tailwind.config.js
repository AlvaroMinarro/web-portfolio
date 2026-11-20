/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  // Button builds these modifiers dynamically; retain them in production CSS.
  safelist: ['button--primary', 'button--secondary', 'button--ghost', 'button--sm', 'button--md', 'button--lg'],
  theme: {
    extend: {
      colors: {
        canvas: 'var(--color-canvas)',
        surface: 'var(--color-surface)',
        depth: 'var(--color-depth)',
        heading: 'var(--color-heading)',
        body: 'var(--color-text)',
        secondary: 'var(--color-text-secondary)',
        muted: 'var(--color-muted)',
        selection: 'var(--color-selection)',
        accent: {
          DEFAULT: 'var(--color-accent)',
          bright: 'var(--color-accent-bright)',
          ink: 'var(--color-accent-ink)',
        },
        foam: 'var(--color-foam)',
        link: 'var(--color-link)',
        focus: 'var(--color-focus)',
        rule: 'var(--color-rule)',
        control: 'var(--color-control-border)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
