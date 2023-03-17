module.exports = {
	root: true,
	plugins: ['simple-import-sort'],
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true
		}
	},
	settings: {
		react: {
			version: 'detect'
		}
	},
	env: {
		browser: true,
		amd: true,
		node: true
	},
	extends: [
		'next/core-web-vitals',
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:react-hooks/recommended',
		'plugin:jsx-a11y/recommended',
		'prettier',
	],
	rules: {
		'react/display-name': 'off',
		'react/react-in-jsx-scope': 'off',
		'react/prop-types': 'off',
		'simple-import-sort/imports': 'error',
		'jsx-a11y/anchor-is-valid': [
			'error',
			{
				components: ['Link'],
				specialLink: ['hrefLeft', 'hrefRight'],
				aspects: ['invalidHref', 'preferButton']
			}
		]
	}
};
