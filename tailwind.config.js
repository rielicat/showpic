module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      boxShadow: {
        custom: "0 -4px 8px 4px rgba(0, 0, 0, 0.09)",
      },
    },
    fill: (theme) => ({
      red: theme("colors.red.primary"),
    }),
    colors: {
      white: "#fff",
      blue: {
        medium: "#005c98",
      },
      red: {
        primary: "#ed4956",
      },
      black: {
        light: "#262626",
        faded: "#00000059",
      },
      gray: {
        base: "#616161",
        background: "#fafafa",
        primary: "#dbdbdb",
      },
    },
  },
  variants: {
    extend: {
      display: ["group-hover"],
    },
  },
  corePlugins: {
    outline: true,
  },
};
