/**
 * useHomeScroll Hook
 * Manages scroll animations and floating button visibility
 */

import { useRef, useCallback } from 'react';
import { ScrollView } from 'react-native';
import {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  withTiming,
  withSpring,
  Extrapolate,
  interpolate,
} from 'react-native-reanimated';

interface UseHomeScrollReturn {
  scrollRef: React.RefObject<ScrollView>;
  scrollHandler: ReturnType<typeof useAnimatedScrollHandler>;
  backButtonStyle: ReturnType<typeof useAnimatedStyle>;
  whatsappStyle: ReturnType<typeof useAnimatedStyle>;
  headerHeight: ReturnType<typeof useSharedValue>;
}

export const useHomeScroll = (): UseHomeScrollReturn => {
  const scrollRef = useRef<ScrollView>(null);
  const scrollY = useSharedValue(0);
  const headerHeight = useSharedValue(100);
  const isScrolled = useSharedValue(false);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
      headerHeight.value = interpolate(
        event.contentOffset.y,
        [0, 100],
        [100, 70],
        Extrapolate.CLAMP
      );
      isScrolled.value = event.contentOffset.y > 800;
    },
  });

  const backButtonStyle = useAnimatedStyle(() => ({
    opacity: withTiming(isScrolled.value ? 1 : 0),
    transform: [{ scale: withSpring(isScrolled.value ? 1 : 0.8) }],
  }));

  const whatsappStyle = useAnimatedStyle(() => ({
    transform: [{ scale: withSpring(isScrolled.value ? 1 : 0.8) }],
  }));

  return {
    scrollRef,
    scrollHandler,
    backButtonStyle,
    whatsappStyle,
    headerHeight,
  };
};
