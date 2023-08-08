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
        'whitish':'#f7f6f4',
        'cool-blue':'#121c4f'
      },
      backgroundImage:{
        'custom-gradient':'-moz-linear-gradient(top, #121c4f 0%, #121c4f 50%, #d7d2c8 50%, #d7d2c8 100%)',
      }
    },
  },
  plugins: [],
}

