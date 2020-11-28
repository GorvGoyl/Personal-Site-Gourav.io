module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
  },
  purge: {
    mode: "all", // also purge unused typography styles
    content: [
      "./components/**/*.{js,ts,jsx,tsx}",
      "./pages/**/*.{js,ts,jsx,tsx}",
    ],
  },
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            // a: {
            //   textDecoration: "none",
            //   "&:hover": {
            //     textDecoration: "underline",
            //   },
            // },
          },
        },
      },
    },
  },
  // theme: {
  //   typography: {
  //     default: {
  //       css: {
  //         // a: {
  //         //   textDecoration: "none",
  //         //   "&:hover": {
  //         //     textDecoration: "underline",
  //         //   },
  //         // },
  //       },
  //     },
  //   },
  // },
  variants: {},
  // eslint-disable-next-line global-require
  plugins: [require("@tailwindcss/typography")],
};
