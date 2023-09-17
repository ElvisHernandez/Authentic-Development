// tailwind.config.js
module.exports = {
  content: ["./{src,app,pages}/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        yellowtail: ["Yellowtail", "cursive"],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#7ca5e2",

          secondary: "#acc643",

          accent: "#3ab2ba",

          neutral: "#1c2931",

          "base-100": "#070508",

          info: "#fff",

          success: "#43db9e",

          warning: "#d3840d",

          error: "#f55b65",

          white: "#fff",
        },
      },
    ],
  },
};
