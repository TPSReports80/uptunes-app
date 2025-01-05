/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      // default breakpoints but with 40px removed
      screens: {
        "2xl": "1280px",
      },
    },
    letterSpacing: {
      3: "3px",
      4: "4px",
    },
    extend: {},
  },
  plugins: [],
};
