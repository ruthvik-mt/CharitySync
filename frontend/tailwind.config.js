/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",       // For all files in `pages/`
    "./components/**/*.{js,ts,jsx,tsx}",  // For all files in `components/`
    "./app/**/*.{js,ts,jsx,tsx}",         // Optional: if you're using the /app directory
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
