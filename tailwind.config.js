/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'cyber-dark': '#0a0a0f',
        'cyber-blue': '#00f6ff',
        'cyber-purple': '#b829e3',
        'cyber-pink': '#ff2d6c',
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { 'text-shadow': '0 0 10px #00f6ff, 0 0 20px #00f6ff, 0 0 30px #00f6ff' },
          '100%': { 'text-shadow': '0 0 20px #b829e3, 0 0 30px #b829e3, 0 0 40px #b829e3' },
        },
      },
    },
  },
  plugins: [],
};