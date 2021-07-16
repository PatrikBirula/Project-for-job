module.exports = {
	runtimeCompiler: true,

	chainWebpack: (config) => {
		config.module.rule("eslint").use("eslint-loader").options({
			fix: true,
		});
	},

	css: {
		loaderOptions: {
			sass: {
				prependData: `
					
				`,
			},
		},
	},

	pluginOptions: {
		i18n: {
			locale: "eng",
			fallbackLocale: "eng",
			localeDir: "locales",
			enableLegacy: false,
			runtimeOnly: false,
			compositionOnly: false,
			fullInstall: true,
		},
	},
};
