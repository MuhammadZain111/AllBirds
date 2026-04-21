/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#111827",     
        secondary: "#6B7280",   // gray text
        accent: "#22C55E",      // green highlight
        light: "#F9FAFB",       // background
        dark: "#020617",        // deep dark
      },
    },
  },
  plugins: [],
};