/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#FCFCFC',
        'text-primary': '#152938',
        'text-secondary': '#304859',
        accent: '#FDA214',
        'surface-light': '#DFE7EC',
        'surface-alt': '#BCCED9',
        'surface-muted': '#7191A5',
      },
    },
  },
  plugins: [],
};
