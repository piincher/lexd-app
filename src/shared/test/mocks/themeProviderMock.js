const React = require('react');

// Use the real light theme colors so style creators get every field they expect.
const { lightTheme } = jest.requireActual('@src/constants/Theme');

const testTheme = {
  theme: 'light',
  isDark: false,
  colors: lightTheme.colors,
  paperTheme: {},
  navigationTheme: {},
  statusBarTheme: {},
  setTheme: () => {},
  toggleTheme: () => {},
};

module.exports = {
  __esModule: true,
  default: ({ children }) => children,
  ThemeProvider: ({ children }) => children,
  useAppTheme: () => testTheme,
  useThemeStyles: (styleCreator) => styleCreator(testTheme.colors, testTheme.isDark),
};
