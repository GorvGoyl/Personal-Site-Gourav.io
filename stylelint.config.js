module.exports = {
  plugins: ["stylelint-scss"],
  extends: ["stylelint-config-recommended"],
  ignoreFiles: ["out/**", ".next/**", ".vercel/**", "public/**"],
  overrides: [
    {
      files: ["**/*.scss"],
      customSyntax: "postcss-scss",
    },
  ],
  rules: {
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: [
          "tailwind",
          "apply",
          ":global",
          "layer",
          "variants",
          "responsive",
          "screen",
        ],
      },
    ],
    "at-rule-prelude-no-invalid": [true, { ignoreAtRules: ["apply"] }],
    "selector-pseudo-class-no-unknown": [
      true,
      {
        ignorePseudoClasses: ["global"],
      },
    ],
    "no-descending-specificity": null,
  },
};
