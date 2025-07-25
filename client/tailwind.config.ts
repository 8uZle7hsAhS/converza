/** @type {import('tailwindcss').Config} */

import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Adjust based on your file structure
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1E40AF",
        secondary: "#64748B",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}


export default config;
