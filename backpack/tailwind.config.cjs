/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: ["class", '[data-mode="dark"]'], //class for darkmode. kan legges til på dark
  theme: {
    extend: {
      screens: {
        bigScreen: { min: "811px" },
        smallScreen: { max: "810px" },
      },
      colors: {
        primary: {
          //tester for darkmode gamle farger under
          50: "#0A2647",
          100: "#2f3a57",
          200: "#283149",
          300: "#283149",
          400: "#2f3a57",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#DBEDF3",
        },
        "primary-details": "#DBEDF3",
        dark: {},
      },
    },
  },
  plugins: [],
};

/* primary: {
  50: "#eff6ff",
  100: "#dbeafe",
  200: "#bfdbfe",
  300: "#93c5fd",
  400: "#60a5fa",
  500: "#3b82f6",
  600: "#2563eb",
  700: "#1d4ed8",
  800: "#1e40af",
  900: "#1e3a8a",
}*/
