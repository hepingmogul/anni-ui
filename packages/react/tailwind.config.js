/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: 'var(--color-surface)',
        primary: {
          light:    'var(--color-primary-light)',
          DEFAULT:  'var(--color-primary)',
          hover:    'var(--color-primary-hover)',
          active:   'var(--color-primary-active)',
          disabled: 'var(--color-primary-disabled)',
          ring:     'var(--color-primary-ring)',
          fg:       'var(--color-primary-fg)',
        },
        danger: {
          light:    'var(--color-danger-light)',
          DEFAULT:  'var(--color-danger)',
          hover:    'var(--color-danger-hover)',
          active:   'var(--color-danger-active)',
          disabled: 'var(--color-danger-disabled)',
          fg:       'var(--color-danger-fg)',
        },
        success: {
          light: 'var(--color-success-light)',
          DEFAULT: 'var(--color-success)',
          fg: 'var(--color-success-fg)',
        },
        warning: {
          light: 'var(--color-warning-light)',
          DEFAULT: 'var(--color-warning)',
          fg: 'var(--color-warning-fg)',
        },
        info: {
          light: 'var(--color-info-light)',
          DEFAULT: 'var(--color-info)',
          fg: 'var(--color-info-fg)',
        },
        neutral: {
          50:  'var(--color-neutral-50)',
          100: 'var(--color-neutral-100)',
          200: 'var(--color-neutral-200)',
          300: 'var(--color-neutral-300)',
          400: 'var(--color-neutral-400)',
          500: 'var(--color-neutral-500)',
          700: 'var(--color-neutral-700)',
          800: 'var(--color-neutral-800)',
          900: 'var(--color-neutral-900)',
          fg:  'var(--color-neutral-fg)',
        },
      },
    },
  },
  plugins: [],
}
