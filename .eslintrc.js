module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        // 'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        // 'prettier/@typescript-eslint',
        // 'plugin:prettier/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
    plugins: ['react', '@typescript-eslint'],
    rules: {
        indent: 'off',
        'linebreak-style': [0],
        quotes: ['error', 'single'],
        semi: ['error', 'always'],
    },
};
