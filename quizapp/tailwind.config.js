/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: { 50:'#fdf4ff',100:'#fae8ff',200:'#f5d0fe',300:'#f0abfc',400:'#e879f9',500:'#d946ef',600:'#c026d3',700:'#a21caf',800:'#86198f',900:'#701a75' },
        accent:  { 50:'#fff7ed',100:'#ffedd5',200:'#fed7aa',300:'#fdba74',400:'#fb923c',500:'#f97316',600:'#ea580c',700:'#c2410c',800:'#9a3412',900:'#7c2d12' },
        vibe:    { purple:'#7c3aed',pink:'#ec4899',orange:'#f97316',yellow:'#eab308',green:'#22c55e',blue:'#3b82f6',teal:'#14b8a6',red:'#ef4444' }
      },
      fontFamily: { display: ['Inter','system-ui','sans-serif'] },
      animation: {
        'bounce-slow':'bounce 2s infinite',
        'pulse-fast':'pulse 1s infinite',
        'slide-up':'slideUp 0.4s ease-out',
        'fade-in':'fadeIn 0.3s ease-out',
        'scale-in':'scaleIn 0.2s ease-out',
        'wiggle':'wiggle 0.5s ease-in-out',
      },
      keyframes: {
        slideUp: { '0%':{ transform:'translateY(20px)', opacity:'0' }, '100%':{ transform:'translateY(0)', opacity:'1' } },
        fadeIn:  { '0%':{ opacity:'0' }, '100%':{ opacity:'1' } },
        scaleIn: { '0%':{ transform:'scale(0.9)', opacity:'0' }, '100%':{ transform:'scale(1)', opacity:'1' } },
        wiggle:  { '0%,100%':{ transform:'rotate(-3deg)' }, '50%':{ transform:'rotate(3deg)' } },
      },
      backgroundImage: {
        'gradient-radial':'radial-gradient(var(--tw-gradient-stops))',
        'hero-gradient':'linear-gradient(135deg, #7c3aed 0%, #ec4899 50%, #f97316 100%)',
      }
    },
  },
  plugins: [],
}
