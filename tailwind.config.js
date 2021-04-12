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
              // to avoid overflow on mobile due to long link
              overflowWrap: "anywhere",
              // textDecoration: "none",
              // "&:hover": {
              //   textDecoration: "underline",
              // },
            },
            code: {
              // to avoid overflow on mobile due to long code
              overflowWrap: "break-word",
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
        ".overflow-normal": { overflowWrap: "normal" },
      };

      addUtilities(newUtilities, {
        variants: ["responsive"],
      });
    },
  ],
};
