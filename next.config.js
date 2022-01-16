module.exports = {
	i18n: {
		locales: ["en"],
		defaultLocale: "en",
	},
	reactStrictMode: true,
	future: {
		webpack5: true,
	},
	images: {
		domains: [
			"www.themoviedb.org",
			"themoviedb.org",
			"dvdb.video",
			"cdn.dvdb.video",
		],
	},
	webpack(config) {
		config.resolve.fallback = {
			...config.resolve.fallback, // if you miss it, all the other options in fallback, specified
			// by next.js will be dropped. Doesn't make much sense, but how it is
			fs: false, // the solution
		};

		return config;
	},
};
