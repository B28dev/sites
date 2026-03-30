/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#0A0A0F',
        'bg-secondary': '#12121A',
        'neon-pink': '#FF2D78',
        'neon-cyan': '#00F5FF',
        'neon-orange': '#FF6B35',
        'vice-yellow': '#FFD700',
        'text-primary': '#F0F0FF',
        'text-muted': '#7A7A9A',
      },
      fontFamily: {
        'bebas': ['"Bebas Neue"', 'cursive'],
        'barlow': ['"Barlow Condensed"', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
        'mono': ['"Share Tech Mono"', 'monospace'],
        'playfair': ['"Playfair Display"', 'serif'],
      },
    },
  },
  plugins: [],
}
