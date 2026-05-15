/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        astro: {
          dark: '#070913',
          card: '#0b1220',
          gold: '#d4af37',
          goldLight: '#f9e27d',
          purple: '#6b46c1',
          navy: '#0a192f',
        }
      },
      backgroundImage: {
        'cosmic-gradient': 'linear-gradient(135deg, #070913 0%, #0b1220 50%, #1a1a2e 100%)',
        'gold-gradient': 'linear-gradient(135deg, #d4af37 0%, #f9e27d 100%)',
      }
    },
  },
  plugins: [],
}
