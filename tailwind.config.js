module.exports = {
  purge: ["./src/**/*.{html,js,jsx}", "./public/index.html"],
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      boxShadow: {
        app: "1px 2px 15px 0px rgba(105,98,105,1)",
      },
      colors: {
        app: {
          primary: "#7036f7",
          bg1: "#f3f6fc",
          bg2: "#d0cde1",
          white1: "#f7f6fc",
          white2: "#ffffff",
          text1: "#b8b4ce",
          text2: "#3b3559",
          red: "#ea504c",
          yellow: "#fcbc49",
          gray1: "#f1f2f5",
          black1: "#828282",
          black2: "#181818",
        },
      },
      animation: {
        motionup: "motionup 0.3s ease-in",
      },
      keyframes: {
        motionup: {
          "0%": { transform: "translateY(70vh) scale(0.5)" },
          "100%": { transform: "translateY(0) scale(1)" },
        },
      },
    },
  },
  plugins: [],
};
