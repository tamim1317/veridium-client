export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  daisyui: {
    themes: ["light", "dark", "cupcake", "corporate"],
  },
  plugins: [require("daisyui")],
}