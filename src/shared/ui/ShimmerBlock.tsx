/**
 * ShimmerBlock
 * Reusable shimmer skeleton block with animated gradient sweep
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import type { ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withRepeat,
  withTiming,
  useSharedValue,
  interpolate,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface ShimmerBlockProps {
  width: number | `${number}%` | '100%';
  height: number;
  borderRadius?: number;
  style?: ViewStyle;
}

export const ShimmerBlock: React.FC<ShimmerBlockProps> = ({
  width,
  height,
  borderRadius = 4,
  style,
}) => {
  const { isDark } = useAppTheme();
  const shimmer = useSharedValue(0);
  const blockBg = isDark ? 'rgba(255,255,255,0.08)' : '#E8EFF5';
  const shimmerOpacity = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.5)';

  React.useEffect(() => {
    shimmer.value = withRepeat(
      withTiming(1, { duration: 1200 }),
      -1,
      false
    );
  }, []);

  const shimmerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: interpolate(shimmer.value, [0, 1], [-200, 400]) }],
  }));

  return (
    <View
      style={[
        styles.block,
        { width, height, borderRadius, backgroundColor: blockBg },
        style,
      ]}
    >
      <Animated.View style={[StyleSheet.absoluteFill, shimmerStyle]}>
        <LinearGradient
          colors={['transparent', shimmerOpacity, 'transparent']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    overflow: 'hidden',
  },
});
