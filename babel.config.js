module.exports = function (api) {
	api.cache(true);
	return {
		presets: ['babel-preset-expo'],
		env: {
			production: {
				plugins: ['react-native-paper/babel', 'transform-remove-console'],
			},
		},
		plugins: [
			[
				'module-resolver',
				{
					root: ['.'],
					alias: {
						'@src': './src',
					},
				},
			],
			'react-native-reanimated/plugin',
		],
	};
};
