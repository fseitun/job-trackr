import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import eslint from '@eslint/js';
import tsEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintImport from 'eslint-plugin-import';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const commonSettings = {
    'import/resolver': {
        typescript: {},
    },
};

const commonRules = {
    'func-style': ['warn', 'declaration'],
    'no-duplicate-imports': 'error',
    'import/no-default-export': 'error',
    'prefer-const': 'warn',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
        'error',
        {
            args: 'all',
            argsIgnorePattern: '^_',
            ignoreRestSiblings: false,
            vars: 'all',
            varsIgnorePattern: '^_',
        },
    ],
};

export default [
    { ignores: ['**/node_modules', '**/dist'] },
    eslintImport.flatConfigs.recommended,

    eslint.configs.recommended,

    {
        files: ['app/api/**/*.{js,mjs,cjs,ts}'],
        settings: {
            ...commonSettings,
        },
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                project: resolve(__dirname, './app/api/tsconfig.json'),
            },
            globals: globals.node,
        },
        plugins: {
            '@typescript-eslint': tsEslint,
        },
        rules: {
            ...commonRules,
            '@typescript-eslint/no-unused-expressions': [
                'error',
                { allowShortCircuit: true, allowTernary: true },
            ],
        },
    },

    {
        files: ['app/fe/**/*.{js,mjs,cjs,ts,jsx,tsx}'],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                project: resolve(__dirname, './app/fe/tsconfig.json'),
            },
            globals: globals.browser,
        },
        plugins: {
            '@typescript-eslint': tsEslint,
            react: pluginReact,
            reactHooks: pluginReactHooks,
        },
        settings: {
            react: {
                version: 'detect',
                jsxRuntime: 'automatic',
            },
            ...commonSettings,
        },
        rules: {
            ...commonRules,
            'react/react-in-jsx-scope': 'off',
        },
        // ...pluginconfigs.recommended,
        // ...pluginReactHooks.configs.recommended,
    },
    eslintConfigPrettier,
];
