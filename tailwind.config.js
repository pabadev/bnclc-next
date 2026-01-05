/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/actions/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      // Si el paso 2 no fuera suficiente, esto lo refuerza:
      fontFamily: {
        sans: ['var(--font-poppins)', 'sans-serif']
      }
    }
  },
  plugins: []
}
