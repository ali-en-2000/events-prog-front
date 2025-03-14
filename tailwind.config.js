module.exports = {
  content : [
    "./components/**/*.{vue,js}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  // in next line insted media be darkmode show you warning in terminal when exe npm run dev
  // media: false, // or 'media' or 'class'
  theme: {
    extend: {
      width: {
        '30': '31%',
        '25': '28%',
      }
    },
    fontFamily: {
      sans: ["Roboto"],
      serif: ["vazir"],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};