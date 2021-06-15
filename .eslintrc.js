module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    tsconfigRootDir: __dirname, // tells parser the absolute path of your project's root directory
    files: ["*.ts", "*.tsx", "*.js", "*.mdx", "*.md"], // files extensions required for linting
    project: "./tsconfig.json", // tells parser the relative path of tsconfig.json
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
    // "extraFileExtensions:": [".scss"],
    // "extensions:": [".mdx"]
  },
  // all plugins (eslint-plugin-xxx) go here:
  plugins: [
    "@typescript-eslint",
    "promise",
    "jsx-a11y",
    // "eslint-plugin-import-helpers",
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
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/TYPED_LINTING.md
    "plugin:@typescript-eslint/recommended-requiring-type-checking", // contains rules that specifically require type information
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
    // place "next" at last
    // "next", // https://github.com/vercel/next.js/blob/canary/packages/eslint-config-next/package.json
    // "next/core-web-vitals",
    "plugin:@next/next/recommended",
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

  rules: {
    "max-len": "warn",
    "key-spacing": "warn",
    "react/jsx-one-expression-per-line": "off",
    "object-curly-newline": "off",
    "@typescript-eslint/indent": "off",
    "operator-linebreak": "off",
    "@typescript-eslint/comma-dangle": "off",
    "@typescript-eslint/quotes": "off",
    "linebreak-style": "off",
    "@next/next/no-img-element": "off",
    // "import-helpers/order-imports": [
    //   "warn",
    //   {
    //     // example configuration
    //     newlinesBetween: "always",
    //     groups: ["module", "/^@shared/", ["parent", "sibling", "index"]],
    //     alphabetize: { order: "asc", ignoreCase: true },
    //   },
    // ],
    "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
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
