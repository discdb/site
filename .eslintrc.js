module.exports = {
	root: true,
	parser: "@typescript-eslint/parser",
	plugins: ["simple-import-sort"],
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: "module",
		ecmaFeatures: {
			jsx: true,
		},
	},
	settings: {
		react: {
			version: "detect",
		},
	},
	env: {
		browser: true,
		amd: true,
		node: true,
	},
	extends: [
		"eslint:recommended",
		"next",
		"plugin:@typescript-eslint/eslint-recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:react/recommended",
		"plugin:react-hooks/recommended",
		"plugin:jsx-a11y/recommended",
		"prettier",
	],
	rules: {
		"react/react-in-jsx-scope": "off",
		"react/prop-types": "off",
		"@typescript-eslint/explicit-function-return-type": "off",
		"simple-import-sort/imports": "error",
		"jsx-a11y/anchor-is-valid": [
			"error",
			{
				components: ["Link"],
				specialLink: ["hrefLeft", "hrefRight"],
				aspects: ["invalidHref", "preferButton"],
			},
		],
	},
};
