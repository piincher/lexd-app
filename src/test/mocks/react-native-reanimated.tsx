/**
 * React Native Reanimated mocks for testing
 */

import React from 'react';
import { View } from 'react-native';

// Mock Animated values
export class AnimatedValue {
  constructor(value: number = 0) {
    this.value = value;
  }
  value: number;
  
  setValue(value: number) {
    this.value = value;
  }
  
  interpolate(config: any) {
    return this;
  }
  
  addListener() {}
  removeListener() {}
  removeAllListeners() {}
}

// Mock shared values
export const useSharedValue = (initialValue: any) => ({
  value: initialValue,
});

// Mock derived values
export const useDerivedValue = (callback: () => any) => ({
  value: callback(),
});

// Mock animated styles
export const useAnimatedStyle = (callback: () => any) => callback();

// Mock animated props
export const useAnimatedProps = (callback: () => any) => callback();

// Mock scroll handlers
export const useAnimatedScrollHandler = () => ({});

// Mock gesture handlers
export const useAnimatedGestureHandler = () => ({});

// Mock animation hooks
export const withTiming = (value: any, config?: any, callback?: any) => value;
export const withSpring = (value: any, config?: any, callback?: any) => value;
export const withDecay = (config: any, callback?: any) => 0;
export const withDelay = (delay: number, animation: any) => animation;
export const withSequence = (...animations: any[]) => animations[animations.length - 1];
export const withRepeat = (animation: any, count?: number, reverse?: boolean) => animation;

// Mock worklets
export const runOnUI = (fn: any) => fn;
export const runOnJS = (fn: any) => fn;

// Mock createAnimatedComponent
export const createAnimatedComponent = (Component: React.ComponentType<any>) => {
  return React.forwardRef((props: any, ref: any) => <Component {...props} ref={ref} />);
};

// Mock Animated components
export const Animated = {
  View: createAnimatedComponent(View),
  Text: createAnimatedComponent(View),
  Image: createAnimatedComponent(View),
  ScrollView: createAnimatedComponent(View),
  FlatList: createAnimatedComponent(View),
  SectionList: createAnimatedComponent(View),
  Value: AnimatedValue,
};

// Mock Layout animations
export const Layout = {
  springify: () => Layout,
  damping: () => Layout,
  stiffness: () => Layout,
  mass: () => Layout,
  overshootClamping: () => Layout,
  restDisplacementThreshold: () => Layout,
  restSpeedThreshold: () => Layout,
  duration: () => Layout,
  delay: () => Layout,
  withInitialValues: () => Layout,
  randomDelay: () => Layout,
};

export const EntryExitLayout = Layout;

// Mock Easing
export const Easing = {
  linear: (t: number) => t,
  ease: (t: number) => t,
  quad: (t: number) => t * t,
  cubic: (t: number) => t * t * t,
  poly: (n: number) => (t: number) => Math.pow(t, n),
  sin: (t: number) => Math.sin(t),
  circle: (t: number) => 1 - Math.sqrt(1 - t * t),
  exp: (t: number) => Math.pow(2, 10 * (t - 1)),
  elastic: (bounciness?: number) => (t: number) => t,
  back: (s?: number) => (t: number) => t * t * ((s || 1.70158) * t - s || 1.70158),
  bounce: (t: number) => t,
  bezier: (x1: number, y1: number, x2: number, y2: number) => (t: number) => t,
  in: (easing: (t: number) => number) => easing,
  out: (easing: (t: number) => number) => (t: number) => 1 - easing(1 - t),
  inOut: (easing: (t: number) => number) => (t: number) => {
    if (t < 0.5) return easing(t * 2) / 2;
    return 1 - easing((1 - t) * 2) / 2;
  },
};

// Mock interpolate
export const interpolate = (value: number, inputRange: number[], outputRange: number[]) => {
  return value;
};

// Mock interpolateColor
export const interpolateColor = (value: number, inputRange: number[], outputRange: string[]) => {
  return outputRange[0];
};

// Mock Extrapolation
export const Extrapolation = {
  CLAMP: 'clamp' as const,
  EXTEND: 'extend' as const,
  IDENTITY: 'identity' as const,
};

// Mock measure
export const measure = () => ({
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  pageX: 0,
  pageY: 0,
});

// Mock dispatch commands
export const dispatchCommand = () => {};

// Mock scroll to
export const scrollTo = () => {};

// Setup Reanimated mock
jest.mock('react-native-reanimated', () => ({
  __esModule: true,
  default: {
    View: Animated.View,
    Text: Animated.Text,
    Image: Animated.Image,
    ScrollView: Animated.ScrollView,
    FlatList: Animated.FlatList,
    Value: AnimatedValue,
  },
  Animated,
  useSharedValue,
  useDerivedValue,
  useAnimatedStyle,
  useAnimatedProps,
  useAnimatedScrollHandler,
  useAnimatedGestureHandler,
  withTiming,
  withSpring,
  withDecay,
  withDelay,
  withSequence,
  withRepeat,
  runOnUI,
  runOnJS,
  createAnimatedComponent,
  Layout,
  Entry: EntryExitLayout,
  Exit: EntryExitLayout,
  Easing,
  interpolate,
  interpolateColor,
  Extrapolation,
  measure,
  dispatchCommand,
  scrollTo,
  enableLayoutAnimations: () => {},
  configureLayoutAnimations: () => {},
  setUpTests: () => {},
}));

// Mock moti (which depends on reanimated)
jest.mock('moti', () => ({
  View: Animated.View,
  Text: Animated.Text,
  Image: Animated.Image,
  ScrollView: Animated.ScrollView,
  FlatList: Animated.FlatList,
  MotiView: Animated.View,
  MotiText: Animated.Text,
  MotiImage: Animated.Image,
  useAnimationState: () => ({}),
  useDynamicAnimation: () => ({}),
}));

// Mock moti/skeleton
jest.mock('moti/skeleton', () => ({
  Skeleton: ({ children }: { children: React.ReactNode }) => children,
}));
