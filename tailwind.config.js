module.exports = {
  purge: [
    "./pages/**/*.js",
    "./components/**/*.js",
    "./pages/**/*.ts",
    "./components/**/*.ts",
    "./pages/**/*.jsx",
    "./components/**/*.jsx",
    "./pages/**/*.tsx",
    "./components/**/*.tsx",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        display: ["Poppins", "sans-serif"],
        body: ["Roboto", "sans-serif"],
      },
      textColor: {
        primary: "#2F4BFF",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
