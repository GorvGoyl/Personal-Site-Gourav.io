// prettier.config.js, .prettierrc.js, prettier.config.mjs, or .prettierrc.mjs

/** @type {import("prettier").Config} */
const config = {
    printWidth: 120,
    trailingComma: 'all',
    tabWidth: 4,
    semi: true,
    singleQuote: true,
    useTabs: false,
    bracketSpacing: true,
    bracketSameLine: true,
    arrowParens: 'always',
    endOfLine: 'lf',
    singleAttributePerLine: true,
    overrides: [
        {
            files: ['*.md'],
            options: {
                tabWidth: 2,
            },
        },
        {
            files: ['*.yml'],
            options: {
                tabWidth: 2,
            },
        },
    ],
    plugins: [
        'prettier-plugin-tailwindcss', //must be last
    ],
    // Tailwind CSS 4 has no JS config: the plugin reads the theme from the stylesheet
    tailwindStylesheet: './styles/tailwind.css',
};

module.exports = config;
