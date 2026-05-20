/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper:   '#EDD089',
        parchment: '#FEF3D0',
        navy:    '#1B3564',
        amber:   '#C4880B',
        scarlet: '#BC2B2B',
        brown:   '#2E1A0E',
        olive:   '#3A6632',
        gold:    '#D4A017',
      },
      fontFamily: {
        slab:   ['"Alfa Slab One"', 'Georgia', 'serif'],
        script: ['"Dancing Script"', 'cursive'],
        body:   ['"Lato"', 'system-ui', 'sans-serif'],
        display:['"Playfair Display"', 'Georgia', 'serif'],
      },
      backgroundImage: {
        'vintage-paper': `
          radial-gradient(ellipse at 15% 30%, rgba(150,90,10,0.12) 0%, transparent 55%),
          radial-gradient(ellipse at 85% 70%, rgba(120,70,10,0.10) 0%, transparent 50%),
          radial-gradient(ellipse at 50% 100%, rgba(180,110,20,0.08) 0%, transparent 60%)
        `,
      },
    },
  },
  plugins: [],
}

