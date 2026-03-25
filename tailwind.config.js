/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#a4e6ff",
        "primary-container": "#00d1ff",
        "secondary": "#dcb8ff",
        "secondary-container": "#7701d0",
        "surface": "#131317",
        "surface-container": "#1f1f23",
        "surface-container-low": "#1b1b1f",
        "surface-container-high": "#2a292e",
        "surface-container-highest": "#333238",
        "surface-container-lowest": "#0e0e12",
        "surface-bright": "#252429",
        "on-surface": "#e4e1e7",
        "on-surface-variant": "#bbc9cf",
        "outline": "#859399",
        "outline-variant": "#3c494e",
        "on-primary-fixed": "#001f28",
        "on-primary-fixed-variant": "#004f61",
        "on-secondary-fixed": "#28004b",
        "on-secondary-fixed-variant": "#5a00a1",
        "error": "#ffb4ab",
      },
      fontFamily: {
        headline: ["Inter", "sans-serif"],
        body: ["Inter", "sans-serif"],
        label: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
}
