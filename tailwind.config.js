/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'hero-pattern': "url('./assets/images/hero.jpg')",
      },
      animation: {
        'typing': 'typing 2s steps(18) forwards',
        'cursor': 'cursor .4s step-end infinite alternate',
      },
      keyframes: {
        typing: {
          from: { width: '0' },
        },
        cursor: {
          '50%': { 'border-color': 'transparent' },
        },
      },
    },
    colors:{
      'golden': '#FFD700',
      'thickBlue': '#16163D',
      'fadethickblue': '#07070F',
      'white':'#ffffff',
      'black':'#000000',
      'lightgray':'#545557',
      'orange': '#ffa500',
      'red':'#ff0000',
      'green': '#008000',
      'palegreen': '#98fb98',
      'lightred':'#f08080',
      'lightestgray': '#bbbbbb',
      'none':"transparent",
      'lightblue': '#0500FF',
      'bggray':'#E6E6E3',
      'brightgreen': '#08FF08',
      'blueColombia': '#00A196'
    }
  },
  plugins: [],
}

