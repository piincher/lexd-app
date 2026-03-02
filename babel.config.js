module.exports = function (api) {
   api.cache(true);
   return {
      presets: [
         [
            "babel-preset-expo",
            {
               unstable_transformImportMeta: true,
            },
         ],
      ],
      env: {
         production: {
            plugins: ["react-native-paper/babel", "transform-remove-console"],
         },
      },
      plugins: [
         "react-native-reanimated/plugin",
         [
            "module-resolver",
            {
               root: ["."],
               "react-native-device-info": "./react-native-device-info.js",
            },
         ],
      ],
   };
};
