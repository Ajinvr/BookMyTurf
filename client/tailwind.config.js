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
          "primary": "#064E3B",
          "secondary": "#000000",
          "neutral": "#6b7280",
          "accent":"#ffffff",
          "base-100":"#000000",
          
        },
        DarkTheme: {
          "primary": "#10B981",
          "secondary": "#ffffff",
          "neutral": "#6b7280",
          "accent":"#000000",
          "base-100": "#ffffff",
           
        },
      },
    ],
  },
}
