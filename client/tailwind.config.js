/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui"

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    daisyui,
  ],
  daisyui: {
    themes: [
      {
        LightTheme: {
          "primary": "#10B981", 
          "secondary": "#ffed4a", 
          "accent": "#38c172", 
          "neutral": "black", 
          "base-100": "#ffffff", 
          "info": "#3b82f6", 
          "success": "#10b981", 
          "warning": "#f59e0b", 
          "error": "#ef4444", 
        },
        DarkTheme: {
          "primary": "#064E3B", 
          "secondary": "#d946ef", 
          "accent": "#f97316",
          "neutral": "white",
          "base-100": "#000000", 
          "info": "#0ea5e9", 
          "success": "#22c55e",
          "warning": "#eab308", 
          "error": "#dc2626",
          "fc":"" 
        },
      },
    ],
  },
}
