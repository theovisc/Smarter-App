/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mental: '#4CAF50',
        mentalLight: '#A5D6A7',
        physical: '#FF5722',
        physicalLight: '#FFAB91',
        ia: '#2196F3',
      },
    },
  },
  plugins: [],
}
