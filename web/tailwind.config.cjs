/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#FEFFFA",
        brand: {
          100: "#E4F2F1",
          200: "#BBDEDB",
          300: "#91C9C4",
          400: "#6AB4AC",
          500: "#429488",
          600: "#3C877B",
          700: "#34776B",
          800: "2C685C",
          900: "#1E4C41",
        },
      },
    },
  },
  plugins: [],
};
