/**
 * usePressScale — Universal press feedback hook
 *
 * Provides a spring-based scale animation for any tappable element.
 * Use on cards, list items, buttons, and any interactive surface.
 *
 * @example
 * const { animatedStyle, handlers } = usePressScale(0.97);
 * <Animated.View style={animatedStyle} {...handlers}>
 *   <Card>...</Card>
 * </Animated.View>
 */

import { useCallback } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  type WithSpringConfig,
} from 'react-native-reanimated';

const DEFAULT_SCALE = 0.97;

const SPRING_CONFIG: WithSpringConfig = {
  stiffness: 300,
  damping: 20,
  mass: 0.8,
};

export const usePressScale = (activeScale = DEFAULT_SCALE, config = SPRING_CONFIG) => {
  const pressed = useSharedValue(false);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: withSpring(pressed.value ? activeScale : 1, config),
      },
    ],
  }));

  const onPressIn = useCallback(() => {
    pressed.value = true;
  }, [pressed]);

  const onPressOut = useCallback(() => {
    pressed.value = false;
  }, [pressed]);

  return {
    animatedStyle,
    handlers: {
      onPressIn,
      onPressOut,
    },
  };
};
