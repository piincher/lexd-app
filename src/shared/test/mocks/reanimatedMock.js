const React = require('react');
const {
  View,
  Text,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
} = require('react-native');

const createAnimated = (Component) =>
  React.forwardRef((props, ref) => React.createElement(Component, { ...props, ref }));

const noopEasing = { toString: () => 'noopEasing' };
const noopAnimation = {
  duration: () => noopAnimation,
  delay: () => noopAnimation,
  springify: () => noopAnimation,
  damping: () => noopAnimation,
  stiffness: () => noopAnimation,
  mass: () => noopAnimation,
  overshootClamping: () => noopAnimation,
  restDisplacementThreshold: () => noopAnimation,
  restSpeedThreshold: () => noopAnimation,
  withInitialValues: () => noopAnimation,
};

const Animated = {
  View: createAnimated(View),
  Text: createAnimated(Text),
  Image: createAnimated(Image),
  ScrollView: createAnimated(ScrollView),
  FlatList: createAnimated(FlatList),
  TouchableOpacity: createAnimated(TouchableOpacity),
  createAnimatedComponent: (Component) => createAnimated(Component),
};

const defaultExport = {
  ...Animated,
  createAnimatedComponent: (Component) => createAnimated(Component),
};

module.exports = {
  __esModule: true,
  default: defaultExport,
  Animated,
  ...Animated,

  // Entry / layout animations
  FadeIn: noopAnimation,
  FadeInUp: noopAnimation,
  FadeInDown: noopAnimation,
  FadeInLeft: noopAnimation,
  FadeInRight: noopAnimation,
  FadeOut: noopAnimation,
  FadeOutUp: noopAnimation,
  FadeOutDown: noopAnimation,
  FadeOutLeft: noopAnimation,
  FadeOutRight: noopAnimation,
  SlideInUp: noopAnimation,
  SlideInDown: noopAnimation,
  SlideOutUp: noopAnimation,
  SlideOutDown: noopAnimation,
  BounceIn: noopAnimation,
  BounceOut: noopAnimation,
  ZoomIn: noopAnimation,
  ZoomOut: noopAnimation,
  Layout: noopAnimation,

  // Easing
  Easing: {
    linear: (t) => t,
    ease: (t) => t,
    inOut: (easing) => easing,
    bezier: () => noopEasing,
    quad: (t) => t,
    cubic: (t) => t,
    poly: (t) => t,
    sin: (t) => t,
    circle: (t) => t,
    exp: (t) => t,
    elastic: (t) => t,
    back: (t) => t,
    bounce: (t) => t,
  },

  // Core hooks / utilities
  useSharedValue: (value) => ({ value }),
  useDerivedValue: (fn) => ({ value: fn() }),
  useAnimatedStyle: () => ({}),
  useAnimatedProps: () => ({}),
  useAnimatedReaction: () => {},
  useAnimatedRef: () => ({ current: null }),
  useAnimatedGestureHandler: () => ({}),
  useAnimatedScrollHandler: () => ({}),
  useAnimatedSensor: () => ({ sensor: { value: { x: 0, y: 0, z: 0 } } }),
  useFrameCallback: () => ({ setActive: () => {} }),
  useReducedMotion: () => false,

  // Worklet helpers
  runOnJS: (fn) => fn,
  runOnUI: (fn) => fn,
  runOnRuntime: (_runtime, fn) => fn,
  makeMutable: (value) => ({ value }),
  makeShareable: (value) => value,
  makeShareableCloneRecursive: (value) => value,
  shareableMappingCache: { get: () => undefined, set: () => {}, delete: () => {} },

  // Animation helpers
  withTiming: (toValue) => toValue,
  withSpring: (toValue) => toValue,
  withDecay: (value) => value,
  withSequence: (...args) => args[args.length - 1],
  withDelay: (_delay, value) => value,
  withRepeat: (value) => value,
  cancelAnimation: () => {},
  interpolate: (value) => value,
  interpolateColor: (value) => value,
  Extrapolate: { CLAMP: 'clamp', EXTEND: 'extend', IDENTITY: 'identity' },
  ColorSpace: { RGB: 'RGB', HSV: 'HSV', HSL: 'HSL' },

  // Layout animation config
  enableLayoutAnimations: () => {},
  configureLayoutAnimations: () => {},
  LayoutAnimationType: { ENTERING: 1, EXITING: 2, LAYOUT: 3 },

  // Keyboard / scroll
  Keyboard: { addListener: () => ({ remove: () => {} }) },
  ScrollView: createAnimated(ScrollView),
  FlatList: createAnimated(FlatList),
};
