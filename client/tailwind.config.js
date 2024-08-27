/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui"

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
      },
    },
  },
  plugins: [
    daisyui,
  ],
  daisyui: {
    themes: [
      {
        LightTheme: {
          "primary": "#10B981",
          "secondary": "#000000",
          "neutral": "#6b7280",
          "base-100": "#ffffff",
        },
        DarkTheme: {
          "primary": "#064E3B",
          "secondary": "#ffffff",
          "neutral": "#6b7280",
          "base-100": "#000000",
        },
      },
    ],
  },
}
