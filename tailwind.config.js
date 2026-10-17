/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        body: ['Quicksand', 'sans-serif'],
      },
      colors: {
        ink: '#3b2a63',
        lilac: { 100: '#f1e9ff', 200: '#d9c8f5', 300: '#b9a2e6', 500: '#7a5cc4' },
      },
    },
  },
  plugins: [],
}
