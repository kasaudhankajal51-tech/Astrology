/** @type {import('tailwindcss').Config} */
export default {
  /* Scope utilities to #root so they win over any unscoped vendor CSS */
  important: '#root',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['fh-regular', 'sans-serif'],
        body: ['Be Vietnam', 'Be Vietnam Pro', 'sans-serif'],
      },
      colors: {
        astro: {
          dark: '#070913',
          card: '#0b1220',
          gold: '#d4af37',
          goldLight: '#f9e27d',
          purple: '#6b46c1',
          navy: '#0a192f',
        },
        site: {
          bg: '#fdf6ee',
          surface: '#ffffff',
          text: '#2a0f02',
          muted: '#5c3d26',
          soft: '#7b6254',
          primary: '#2a0f02',
          accent: '#c8832a',
          'accent-dark': '#8b4a1e',
        },
      },
      backgroundImage: {
        'cosmic-gradient': 'linear-gradient(135deg, #070913 0%, #0b1220 50%, #1a1a2e 100%)',
        'gold-gradient': 'linear-gradient(135deg, #d4af37 0%, #f9e27d 100%)',
      },
    },
  },
  plugins: [],
}
