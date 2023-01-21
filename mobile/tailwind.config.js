/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
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
      fontFamily: {
        regular: "Inter_400Regular",
        semibold: "Inter_600SemiBold",
        bold: "Inter_700Bold",
        extrabold: "Inter_800ExtraBold",
      },
    },
  },
  plugins: [],
};
