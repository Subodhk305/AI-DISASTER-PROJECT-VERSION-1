/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00D4FF',
        secondary: '#7B2FFF',
        danger: '#FF3B5C',
        warning: '#FFB020',
        success: '#00E57A',
      },
    },
  },
  plugins: [],
}