/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  content: [],
  theme: {
    extend: {
      colors: {
        'lotto': {
          0: colors.red,
          1: colors.orange,
          2: colors.yellow,
          3: colors.green,
          4: colors.blue,
          5: colors.purple,
        },
      }
    },
  },
  safelist: [
    {
      pattern: /(?=.*bg-lotto)(?=.*500).*/,
    },
    {
      pattern: /bg-gray/,
    },
  ],
  plugins: [],
}
