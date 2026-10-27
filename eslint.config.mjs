import js from '@eslint/js';
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import promise from 'eslint-plugin-promise';
import reactGoogleTranslate from 'eslint-plugin-react-google-translate';
import regexp from 'eslint-plugin-regexp';
import { defineConfig, globalIgnores } from 'eslint/config';
import tseslint from 'typescript-eslint';

const tsFiles = ['**/*.{ts,tsx}'];

export default defineConfig([
    globalIgnores(['out/', 'public/', '.vercel/', '.superpowers/', 'docs/']),
    {
        files: tsFiles,
        extends: [js.configs.recommended, tseslint.configs.strictTypeChecked],
        // only the rules: Next's config registers its own copy of the jsx-a11y plugin
        rules: jsxA11y.flatConfigs.recommended.rules,
    },
    nextCoreWebVitals,
    {
        files: tsFiles,
        extends: [promise.configs['flat/recommended'], regexp.configs['flat/recommended']],
        plugins: {
            'react-google-translate': reactGoogleTranslate,
        },
        languageOptions: {
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },

        rules: {
            'no-empty': 'off',
            '@typescript-eslint/no-unnecessary-condition': 'off',
            '@typescript-eslint/use-unknown-in-catch-callback-variable': 'off',
            'no-constant-condition': 'warn',
            '@typescript-eslint/no-extraneous-class': 'warn',
            '@typescript-eslint/no-unnecessary-type-parameters': 'warn',
            'regexp/no-unused-capturing-group': 'warn',
            '@typescript-eslint/no-redundant-type-constituents': 'warn',
            '@typescript-eslint/no-deprecated': 'warn',
            '@typescript-eslint/no-base-to-string': 'warn',
            '@typescript-eslint/prefer-promise-reject-errors': 'warn',
            '@typescript-eslint/no-misused-promises': 'warn',
            '@typescript-eslint/await-thenable': 'warn',
            '@typescript-eslint/no-unnecessary-type-assertion': 'warn',
            '@typescript-eslint/no-unsafe-call': 'warn',
            '@typescript-eslint/no-unsafe-return': 'warn',
            '@typescript-eslint/no-unnecessary-template-expression': 'off',
            '@typescript-eslint/no-unsafe-argument': 'warn',
            // clashes with arrow-body-style 'always': flags `() => { return setX(1); }`
            '@typescript-eslint/no-confusing-void-expression': 'off',
            '@typescript-eslint/no-unsafe-assignment': 'warn',
            '@typescript-eslint/no-unsafe-member-access': 'warn',
            '@typescript-eslint/only-throw-error': 'warn',
            '@typescript-eslint/restrict-template-expressions': 'off',
            '@typescript-eslint/restrict-plus-operands': 'warn',
            '@typescript-eslint/no-floating-promises': 'warn',
            'no-inner-declarations': 'warn',
            '@typescript-eslint/no-non-null-asserted-optional-chain': 'warn',
            '@typescript-eslint/no-non-null-assertion': 'warn',
            '@typescript-eslint/no-unused-expressions': 'off',
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/no-unused-vars': 'off',
            // "object-shorthand": ["warn", "never"],
            'no-control-regex': 'warn',
            'promise/catch-or-return': 'off',
            'promise/always-return': 'off',
            'guard-for-in': 'error',
            'no-prototype-builtins': 'error',
            // "func-style": ["warn", "declaration"],
            'no-template-curly-in-string': 'error',
            'no-unmodified-loop-condition': 'error',
            'max-depth': ['warn', { max: 6 }],
            'max-params': ['warn', { max: 6 }],
            'no-lone-blocks': 'error',
            // "no-lonely-if": "warn",
            'no-multi-assign': 'error',
            'no-multi-str': 'error',
            'no-nested-ternary': 'error',
            'no-return-assign': 'error',
            'no-throw-literal': 'error',
            'no-undef-init': 'error',
            // "no-undefined": "error",
            'no-unneeded-ternary': 'error',
            'no-useless-return': 'error',
            'no-var': 'error',
            'prefer-object-has-own': 'error',
            'prefer-object-spread': 'warn',
            'prefer-promise-reject-errors': 'error',
            'prefer-rest-params': 'error',
            'prefer-spread': 'error',
            'require-await': 'error',
            'require-unicode-regexp': 'warn',
            'prefer-const': [
                'error',
                {
                    destructuring: 'any',
                    ignoreReadBeforeAssign: true,
                },
            ],
            'arrow-body-style': ['warn', 'always'],
            'no-else-return': 'warn',
            'react/display-name': 'warn',
            'no-unreachable': 'warn',
            'react/button-has-type': 'error',
            'react/iframe-missing-sandbox': 'warn',
            'react/function-component-definition': [
                'warn',
                {
                    namedComponents: 'function-declaration',
                    unnamedComponents: ['function-expression', 'arrow-function'],
                },
            ],
            'react/jsx-boolean-value': ['error', 'always'],
            'react/jsx-child-element-spacing': 'warn',
            'react/prefer-es6-class': ['warn', 'always'],
            'react/jsx-no-useless-fragment': ['warn', { allowExpressions: true }],
            'react/no-array-index-key': 'warn',
            'react/no-invalid-html-attribute': 'warn',
            'react/no-unstable-nested-components': [
                'warn',
                {
                    allowAsProps: true,
                    customValidators: [] /* optional array of validators used for propTypes validation */,
                },
            ],
            'react/self-closing-comp': [
                'warn',
                {
                    component: true,
                    html: true,
                },
            ],
            'react/void-dom-elements-no-children': 'warn',
            curly: 'error',
            'react/jsx-no-target-blank': 'off',
            'react/no-unescaped-entities': 'off',
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': [
                'error',
                {
                    // add your custom hooks here
                    additionalHooks: '(useMyCustomHook|useMyOtherCustomHook)',
                },
            ],
            // React Compiler rules (react-hooks v7) that only matter with the compiler, which this site doesn't use.
            // They flag SSR-safe localStorage hydration in effects, mdx-bundler's getMDXComponent, latest-value refs
            // and hoisted function declarations.
            'react-hooks/set-state-in-effect': 'off',
            'react-hooks/static-components': 'off',
            'react-hooks/refs': 'off',
            'react-hooks/immutability': 'off',
            'jsx-a11y/lang': 'warn',
            'jsx-a11y/no-autofocus': 'off',
            'jsx-a11y/anchor-is-valid': 'warn',
            'jsx-a11y/click-events-have-key-events': 'warn',
            'jsx-a11y/no-static-element-interactions': 'warn',
            'jsx-a11y/no-redundant-roles': 'off',
            'jsx-a11y/interactive-supports-focus': 'warn',
            'no-restricted-syntax': [
                'warn',
                {
                    selector: "CallExpression[callee.object.name='crypto'][callee.property.name='randomUUID']",
                    message:
                        "Please use uuidv7() from 'uuidv7' package instead of crypto.randomUUID() for better db indexing.",
                },
            ],
            'react-google-translate/no-conditional-text-nodes-with-siblings': 'error',
            'react-google-translate/no-return-text-nodes': 'error',
            '@next/next/no-img-element': 'off',
        },
    },
]);
