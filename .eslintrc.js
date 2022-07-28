module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		// 'eslint:recommended',
		// 'plugin:react/recommended',
		'plugin:@typescript-eslint/recommended',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {},
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['react', '@typescript-eslint'],
	rules: {
		'indent': 'off',
		'linebreak-style': [0],
		'quotes': ['error', 'single'],
		'semi': ['error', 'always'],
	},
};
