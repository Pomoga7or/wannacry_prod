/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      transform: ['preserve-3d'],
      backdropBlur: {
        10: '10px',
      },
      boxShadow: {
        DEFAULT: '0 4px 15px rgba(0, 0, 0, 0.1)',
        lg: '0 10px 25px rgba(0, 0, 0, 0.15)',
      },
    },
    fontFamily: {
      sans: ['"Benzin", sans-serif',],
      space: ['"Space", sans-serif'],
      quantum: ['"Quantum", sans-serif'],
      bogeda: ['"Bogeda", sans-serif'],
      pressStart: ['PressStart', 'sans-serif'],
      robot: ['"Robot", sans-serif'],
    },
  },
  plugins: [],
}

