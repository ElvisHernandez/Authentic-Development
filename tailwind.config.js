// tailwind.config.js
module.exports = {
  content: ["./{src,app,pages}/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
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

          accent: "#fce1b5",

          neutral: "#1c2931",

          "base-100": "#3b424a",

          info: "#9face5",

          success: "#43db9e",

          warning: "#d3840d",

          error: "#f55b65",
        },
      },
    ],
  },
};
