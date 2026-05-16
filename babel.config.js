module.exports = function (api) {
   api.cache(true);
   return {
      presets: [
         [
            "babel-preset-expo",
            {
               unstable_transformImportMeta: true,
               "react-compiler": {
                  "target": "19"
               }
            },
         ],
      ],
      env: {
         production: {
            plugins: ["transform-remove-console"],
         },
      },
      plugins: [
         "react-native-worklets/plugin",
         [
            "module-resolver",
            {
               root: ["."],
               alias: {
                  "@src": "./src",
               },
               "react-native-device-info": "./react-native-device-info.js",
            },
         ],
      ],
   };
};
