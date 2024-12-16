/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

  ],
  theme: {
    extend: {
      backgroundImage:{
        colors: "url('/18958.jpg')"
      },
      colors:{
        'glass': ' rgba(255, 255, 255, 0.75)',
        'cream': '#ffe3d7',
        'neon cyan': '00ccff',
        'creame': 'rgba(255, 255, 255, 0.30)',
      },
      fontFamily:
       { custom: ['MyCustomFont', 'sans-serif'], },
    
       keyframes: { ripple: { '0%': { transform: 'scale(0)', opacity: 1 }, '100%': { transform: 'scale(4)', opacity: 0 }, }, }, animation: { ripple: 'ripple 1s infinite' }
      },},
  plugins: [],
}