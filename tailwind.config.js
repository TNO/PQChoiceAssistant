/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{vue, html}",
  ],
  theme: {
    extend: {
      colors: {
        // blue and green
        primary: '#3f529f',   // dark blue
        secondary: '#41b590', // green
        tertiary: '#f3fffb',  // light green
        quadrinary: '#eb9234' // orange
      },
      screens: {
        'platform-viewport-breakpoint': '1280px',
      }
    },
  },
  plugins: [],
}

