module.exports = {
  // to enable overriding tw-typography styles
  important: true,
  // mode: "jit",
  future: {
    removeDeprecatedGapUtilities: true,
  },
  purge: {
    // mode: "all", // purge unused typography styles but also removes css modules
    // preserveHtmlElements: true,
    content: [
      "./components/**/*.{js,ts,jsx,tsx}",
      "./pages/**/*.{js,ts,jsx,tsx,md}",
      "./layouts/**/*.{js,ts,jsx,tsx}",
      "./lib/**/*.{js,ts,jsx,tsx}",
    ],
  },
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            a: {
              cursor: "pointer",
              // textDecoration: "none",
              // "&:hover": {
              //   textDecoration: "underline",
              // },
            },
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
  variants: {
    extend: {
      tableLayout: ["hover", "focus"],
    },
  },
  // eslint-disable-next-line global-require
  plugins: [
    require("@tailwindcss/typography"),
    // https://tailwindcss.com/docs/plugins#variants

    ({ addUtilities }) => {
      const newUtilities = {
        ".overflow-initial": { overflow: "initial" },
      };

      addUtilities(newUtilities, {
        variants: ["responsive"],
      });
    },
  ],
};
