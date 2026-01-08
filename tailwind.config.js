/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: 'var(--dna-bg)',
        surface: 'var(--dna-surface)',
        accent: 'var(--dna-accent)',
        prim: 'var(--dna-text-prim)',
        sec: 'var(--dna-text-sec)',
        border: 'var(--dna-border)',
      },
      borderRadius: {
        'dna': 'var(--dna-radius)',
      },
      fontFamily: {
        dna: ['var(--dna-font-family)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}