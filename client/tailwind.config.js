/** @type {import('tailwindcss').Config} */
export default {
  content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'primary':'#8E3E63',
        'secondary':'#D2649A',
        'ternary':'#F6FAB9',
      }
    },
  },
  plugins: [],
}

