/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0891b2',
          dark: '#0e7490',
        },
        cta: '#22c55e',
      },
      borderRadius: {
        'flat': '0.5rem',
      }
    },
  },
  plugins: [],
}
