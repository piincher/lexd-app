/**
 * Typography and animation constants
 */
export const typography = {
  h1: { fontSize: 36, fontWeight: '800', letterSpacing: -0.5, lineHeight: 44 },
  h2: { fontSize: 28, fontWeight: '700', letterSpacing: -0.3, lineHeight: 36 },
  h3: { fontSize: 22, fontWeight: '700', letterSpacing: -0.2, lineHeight: 30 },
  h4: { fontSize: 18, fontWeight: '600', letterSpacing: -0.1, lineHeight: 26 },
  body: { fontSize: 16, fontWeight: '400', letterSpacing: 0, lineHeight: 24 },
  bodySmall: { fontSize: 14, fontWeight: '400', letterSpacing: 0, lineHeight: 20 },
  caption: { fontSize: 12, fontWeight: '500', letterSpacing: 0.2, lineHeight: 16 },
  button: { fontSize: 15, fontWeight: '600', letterSpacing: 0.3, lineHeight: 22 },
  overline: { fontSize: 11, fontWeight: '600', letterSpacing: 0.5, lineHeight: 16 },
};

export const animation = {
  duration: {
    fast: 150,
    normal: 300,
    slow: 500,
  },
  easing: {
    easeIn: 'easeIn',
    easeOut: 'easeOut',
    easeInOut: 'easeInOut',
    spring: 'spring',
  },
};
