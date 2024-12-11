import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      width: {
        'screen-xxs': 'var(--length-screen-xxs)',
        'screen-xs': 'var(--length-screen-xs)',
        'screen-sm': 'var(--length-screen-sm)',
        'screen-md': 'var(--length-screen-md)',
        'screen-lg': 'var(--length-screen-lg)',
        'screen-xl': 'var(--length-screen-xl)',
        'screen-xxl': 'var(--length-screen-xxl)',
      },
      maxWidth: {
        'screen-xxs': 'var(--length-screen-xxs)',
        'screen-xs': 'var(--length-screen-xs)',
        'screen-sm': 'var(--length-screen-sm)',
        'screen-md': 'var(--length-screen-md)',
        'screen-lg': 'var(--length-screen-lg)',
        'screen-xl': 'var(--length-screen-xl)',
        'screen-xxl': 'var(--length-screen-xxl)',
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
    },
  },
  plugins: [],
} satisfies Config;
