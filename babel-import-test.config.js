module.exports = {
  presets: [
    '@babel/preset-typescript',
    ['@babel/preset-react', { runtime: 'automatic' }],
  ],
  extensions: ['.ts', '.tsx', '.js', '.jsx'],
  cache: false,
  ignore: [/node_modules/],
};
