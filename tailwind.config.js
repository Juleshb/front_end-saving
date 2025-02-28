/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        Poppins: ['Poppins', 'sans-serif'], 
      },
      colors: {
        primary: '#10CBFF',
        secondary: '#F5F5F5',
        textcol: '#726E6E',
      },
      animation: {
        slide: 'slide 25s linear infinite', 
      },
      keyframes: {
        slide: {
          '0%, 100%': { transform: 'translateX(5%)' },
          '50%': { transform: 'translateX(-120%)' },
        },
      },
    },
    screens: {
      xs: '480px',
      sm: '768px',
      md: '1060px',

      'sm': { max: '639px' },
      'xs': { max: '414px' },
    },
  },
  plugins: [],
};
