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
					'react-native-device-info': './react-native-device-info.js',
				},
			],
			'react-native-reanimated/plugin',
		],
	};
};
