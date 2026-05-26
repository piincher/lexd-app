import React, { useCallback, useEffect } from 'react';
import { Pressable, Text, ActivityIndicator, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withRepeat,
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from './GradientButton.styles';

interface Props {
  title: string;
  onPress: () => void;
  busy?: boolean;
  disabled?: boolean;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const GradientButton: React.FC<Props> = ({ title, onPress, busy, disabled }) => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors);
  const scale = useSharedValue(1);
  const shimmer = useSharedValue(0);

  useEffect(() => {
    if (!busy && !disabled) {
      shimmer.value = withRepeat(
        withTiming(1, { duration: 2000 }),
        -1,
        false
      );
    }
  }, [busy, disabled, shimmer]);

  const handlePressIn = useCallback(() => {
    scale.value = withSpring(0.97, { damping: 15, stiffness: 400 });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }, [scale]);

  const handlePressOut = useCallback(() => {
    scale.value = withSpring(1, { damping: 15, stiffness: 400 });
  }, [scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: disabled ? 0.6 : 1,
  }));

  const shimmerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: interpolate(shimmer.value, [0, 1], [-100, 400]) }],
    opacity: interpolate(shimmer.value, [0, 0.5, 1], [0, 0.3, 0]),
  }));

  const gradientColors = (isDark
    ? [colors.primary.dark, colors.primary.main, colors.primary.light]
    : [colors.primary.main, colors.primary.dark]) as [string, string, ...string[]];

  return (
    <AnimatedPressable
      onPress={onPress}
      disabled={disabled || busy}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[styles.container, animatedStyle]}
    >
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        {busy ? (
          <ActivityIndicator color={colors.text.inverse} size="small" />
        ) : (
          <Text style={styles.title}>{title}</Text>
        )}
        {!busy && !disabled && (
          <Animated.View
            style={[
              StyleSheet.absoluteFill,
              {
                backgroundColor: colors.neutral.white + '4D',
                width: 60,
                transform: [{ skewX: '-20deg' }],
              },
              shimmerStyle,
            ]}
          />
        )}
      </LinearGradient>
    </AnimatedPressable>
  );
};

