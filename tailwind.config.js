/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    base: false,
    utils: false,
    themes: [
      {
        light: {

          "primary": "#EFF3F8", //fondo
          "secondary": "#ffffff",//cards
          "accent": "#6366F1", //icons
          "neutral": "#302037", //font
          "base-100": "#ffffff",//white
          "base-200": "#B4B6BA", //soncondary font
          "base-300": "#CBD5E1", //border
          "base-content": "#ffffff", //content-accent
          "info": "#3abff8",
          "success": "#36d399",
          "warning": "#fbbd23",
          "error": "#f87272",

          
        },
      },
      {
        darks: {
          //dfe0e3
          "primary": "#040D19",//background
          "secondary": "#071426",//cards
          "accent": "#A5B4FC",//iconos
          "neutral": "#ffffff", //fuente
          "neutral-content": "#dfe0e3 ",//logo
          "base-100": "#ffffff",//blanco
          "base-200": "#B4B6BA",//fuente secundaria
          "base-300": "#0B213F", //border
          "base-content": "#000000", //content-accent
          "info": "#3abff8",
          "success": "#36d399",
          "warning": "#fbbd23",
          "error": "#f87272",        },
      },
    ],
  }
}

