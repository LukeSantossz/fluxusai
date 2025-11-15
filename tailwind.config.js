/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'fuchsia': {
          DEFAULT: '#D946EF',
          '50': '#FDF4FF',
          '100': '#FAE8FF',
          '200': '#F5D0FE',
          '300': '#F0ABFC',
          '400': '#E879F9',
          '500': '#D946EF',
          '600': '#C026D3',
          '700': '#A21CAF',
          '800': '#86198F',
          '900': '#701A75',
        },
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

