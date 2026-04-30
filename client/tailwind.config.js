/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2ECC71',
        accent: '#27AE60',
        neutral: '#F8F9FA',
      },
      fontFamily: {
        logo: ['Montserrat', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
        body: ['Open Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
