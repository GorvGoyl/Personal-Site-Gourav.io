/* eslint-disable @typescript-eslint/no-var-requires */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  // to enable overriding tw-typography styles
  important: true,
  future: {
    removeDeprecatedGapUtilities: true,
  },
  content: [
    // mode: "all", // purge unused typography styles but also removes css modules
    // preserveHtmlElements: true,
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx,md,mdx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
      typography: {
        DEFAULT: {
          css: {
            h2: {
              fontWeight: 500,
            },
            a: {
              cursor: "pointer",
              // to avoid overflow on mobile due to long link
              overflowWrap: "break-word",
              // textDecoration: "none",
              // "&:hover": {
              //   textDecoration: "underline",
              // },
            },
            code: {
              fontWeight: 500,
              // to avoid overflow on mobile due to long code
              // overflowWrap: "break-word",
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

  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/line-clamp"),
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
