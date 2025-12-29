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
        primary: "#8AFF1A",

        light: {
          bg: "#FFFFFF",
          card: "#F8FAFC",
          text: "#0F172A",
          muted: "#475569",
          border: "#E5E7EB",
        },

        dark: {
          bg: "#0B0B0B",
          card: "#151515",
          text: "#FFFFFF",
          muted: "#9CA3AF",
          border: "#262626",
        },
      },
    },
  },
  plugins: [],
};
