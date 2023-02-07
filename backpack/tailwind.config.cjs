/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      "bigScreen": {"min":"811px"},
      "smallScreen": {"max":"810px"}
    },
    extend: {
      colors: {
        "primary-details": "#1e293b",
      },
    },
  },
  plugins: [],
};

