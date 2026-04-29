/**
 * GlobalLoadingOverlay — Full-screen loading indicator for pending mutations
 *
 * Shows a subtle blur backdrop + spinner when any mutation is in flight.
 * Includes a 300ms delay to prevent flicker on fast mutations.
 *
 * Place once at the root of your app (e.g., inside the root provider stack).
 */

import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import { BlurView } from 'expo-blur';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { useGlobalPending } from '@src/shared/lib/use-global-pending';

const DELAY_MS = 300;
const FADE_DURATION = 200;

export const GlobalLoadingOverlay: React.FC = () => {
  const { colors, isDark } = useAppTheme();
  const isPending = useGlobalPending();
  const [visible, setVisible] = useState(false);
  const opacity = useSharedValue(0);

  useEffect(() => {
    let hideTimer: ReturnType<typeof setTimeout>;

    if (isPending) {
      // Show after delay to avoid flicker on fast mutations
      const showTimer = setTimeout(() => {
        if (isPending) {
          setVisible(true);
          opacity.value = withTiming(1, { duration: FADE_DURATION });
        }
      }, DELAY_MS);
      return () => clearTimeout(showTimer);
    } else {
      // Fade out, then unmount from JS thread (never call setState from a worklet)
      opacity.value = withTiming(0, { duration: FADE_DURATION });
      hideTimer = setTimeout(() => {
        setVisible(false);
      }, DELAY_MS + FADE_DURATION);
    }

    return () => clearTimeout(hideTimer);
  }, [isPending, opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    pointerEvents: opacity.value > 0.5 ? 'auto' : 'none',
  }));

  if (!visible) {
    return null;
  }

  return (
    <Animated.View style={[StyleSheet.absoluteFill, animatedStyle]}>
      <BlurView
        intensity={isDark ? 40 : 30}
        tint={isDark ? 'dark' : 'light'}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.primary.main} />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
