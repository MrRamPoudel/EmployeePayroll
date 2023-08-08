/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html, ts}"],
  theme: {
    extend: {
      minWidth:{
        '280' : '280px',
      },
      screens:{
        'med': '1470px'
      },
      colors:{
        'whitish':'#f7f6f4'
      }
    },
  },
  plugins: [],
}

