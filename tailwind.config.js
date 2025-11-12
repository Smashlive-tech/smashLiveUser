/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#0d59f2",
        "background-light": "#f5f6f8",
        "background-dark": "#101622",
        "text-primary": "#212529",
        "text-secondary": "#6c757d",
      },
    },
  },
  plugins: [],
};
