/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        grid: "grid 15s linear infinite",
        "fade-in-up": "fade-in-up 0.5s ease-out forwards",
        blob: "blob 7s infinite",
      },
      keyframes: {
        grid: {
          "0%": { transform: "translateY(-50%)" },
          "100%": { transform: "translateY(0)" },
        },
        "fade-in-up": {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        blob: {
          "0%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(30px, -50px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
          "100%": { transform: "translate(0px, 0px) scale(1)" },
        },
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        "padhai-light": {
          "primary": "#10612d",
          "secondary": "#83ac92",
          "accent": "#66ef8a",
          "neutral": "#3d4451",
          "base-100": "#f4f7f5",
          "base-200": "#e8efe9",
          "base-300": "#d1e0d5",
          "base-content": "#0f1c14",
        },
        "padhai-dark": {
          "primary": "#66ef8a",
          "secondary": "#2c4c3b",
          "accent": "#10612d",
          "neutral": "#1f2937",
          "base-100": "#0a100d",
          "base-200": "#111a15",
          "base-300": "#1c2b23",
          "base-content": "#e8efe9",
        }
      }
    ],
  },
}
