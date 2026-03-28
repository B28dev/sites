/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#03030A',
        deep: '#070714',
        surface: '#0E0E2A',
        accent: '#4A9EFF',
        'accent-soft': 'rgba(74,158,255,0.12)',
        gold: '#C8A96E',
        textMain: '#D4D8E8',
        'text-muted': '#6B7194',
        borderLine: 'rgba(74,158,255,0.10)',
      },
      fontFamily: {
        heading: ['"Cormorant Garamond"', 'serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
