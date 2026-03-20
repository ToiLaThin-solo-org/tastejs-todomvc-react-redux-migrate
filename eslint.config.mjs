import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';
import react from 'eslint-plugin-react';
import sonarjs from 'eslint-plugin-sonarjs';
import { defineConfig, globalIgnores } from 'eslint/config';

//flat file config
export default defineConfig([
    js.configs.recommended,
    ...tseslint.configs.recommended,
    react.configs.flat.recommended,
    sonarjs.configs.recommended,
    prettier, //Prettier safely disables conflicting rules
    {
        files: ['**/*.{js,mjs,jsx,ts,tsx}'],

        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.jest, //avoid eslint error not detecting jest globals
            },
            //TS parser actually applied
            parser: tseslint.parser,
            parserOptions: {
                ecmaFeatures: { jsx: true },
                sourceType: 'module',
            },
        },
        //React auto-detect version
        settings: {
            react: {
                version: 'detect',
            },
        },
        rules: {
            // React 17+
            'react/react-in-jsx-scope': 'off',

            // TS replaces prop-types
            'react/prop-types': 'off',

            // good defaults avoids duplicate rules (no-unused-vars)
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': ['warn'],

            // optional strictness
            '@typescript-eslint/no-explicit-any': 'error',
        },
    },
    globalIgnores([
        'dist',
        'node_modules',
        'coverage',
        'build',
        'webpack.config.js',
        'jest.config.js',
        'lint-staged.config.mjs',
    ]),
]);
