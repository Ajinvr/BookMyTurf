/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        mylighttheme: {
          "primary": "#10B981",
          "secondary": "#ffffff",
          "accent": "#000000",
          "neutral": "#708090",
          "base-100": "#f3f4f6",
          "info": "#0000ff",
          "success": "#00ff00",
          "warning": "#ffd500",
          "error": "#ff0000",
        },
      },
      {
        mydarktheme: {
          "primary": "#064E3B",
          "secondary": "#000000",
          "accent": "#ffffff",
          "neutral": "#708090",
          "base-100": "#f3f4f6",
          "info": "#3b82f6",
          "success": "#10b981",
          "warning": "#facc15",
          "error": "#ef4444",
        },
      },
    ],
  },
};
