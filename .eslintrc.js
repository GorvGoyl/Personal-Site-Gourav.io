module.exports = {
  // "root": true,
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  parser: "@typescript-eslint/parser",

  // all plugins (eslint-plugin-xxx) go here:
  plugins: [
    "react",
    "@typescript-eslint",
    "react-hooks",
    "promise",
    "jsx-a11y",
    "@next/eslint-plugin-next",
  ],
  // "overrides": [
  //   {
  //     "files": ["*.mdx"],
  //     "parser": "eslint-mdx",
  //     "extends": ["plugin:mdx/overrides"],
  //     "rules": {
  //       "strict": "off"
  //     }
  //   }
  // ],

  // all configs (eslint-config-xxx) go here:
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "airbnb-typescript",
    "airbnb/hooks",
    "plugin:mdx/recommended",
    "plugin:promise/recommended",
    "plugin:react/recommended",
    "plugin:markdown/recommended",
    // "plugin:import/warnings",
    // "plugin:import/errors",
    "plugin:import/typescript",
    "plugin:jsx-a11y/recommended",
    "next",
    "prettier",
  ],
  settings: {
    // to support @/ path
    "import/resolver": {
      typescript: {}, // this loads <rootdir>/tsconfig.json to eslint
    },
    react: {
      version: "detect",
    },
  },
  parserOptions: {
    project: "./tsconfig.json",
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
    // "extraFileExtensions:": [".scss"],
    // "extensions:": [".mdx"]
  },
  rules: {
    "@typescript-eslint/lines-between-class-members": "off",
    "mdx/no-unescaped-entities": "off",
    "import/prefer-default-export": "off",
    "@typescript-eslint/no-unsafe-assignment": "warn",
    "@typescript-eslint/no-unsafe-call": "warn",
    "react/destructuring-assignment": "off",
    "no-void": "off",
    "global-require": "off",
    "@typescript-eslint/no-unsafe-member-access": "warn",
    "jsx-a11y/click-events-have-key-events": "off",
    "@typescript-eslint/require-await": "warn",
    "react/jsx-no-target-blank": "off",
    "jsx-a11y/anchor-is-valid": "off",
    "react/react-in-jsx-scope": "off",
    "react/jsx-filename-extension": [
      1,
      { extensions: [".js", ".ts", ".tsx", ".jsx", ".md", ".mdx"] },
    ],
    "react/no-unescaped-entities": "off",
    "jsx-a11y/accessible-emoji": "off",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "no-console": "off",
  },
};
