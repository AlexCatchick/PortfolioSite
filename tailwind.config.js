// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primaryText: '#004030', // custom color name
      },
      textColor: {
        DEFAULT: '#004030', // global default text color
      },
    },
  },
  plugins: [],
}
