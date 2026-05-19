import React, { useEffect } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  interpolate,
  Easing,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppTheme } from '@src/providers/ThemeProvider';

const { width, height } = Dimensions.get('window');

const Orb: React.FC<{
  size: number;
  colors: [string, string];
  initialX: number;
  initialY: number;
  duration: number;
}> = ({ size, colors: orbColors, initialX, initialY, duration }) => {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, { duration, easing: Easing.inOut(Easing.sin) }),
      -1,
      true
    );
  }, [duration, progress]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: interpolate(progress.value, [0, 1], [initialX, initialX + 30]) },
      { translateY: interpolate(progress.value, [0, 1], [initialY, initialY - 40]) },
      { scale: interpolate(progress.value, [0, 0.5, 1], [1, 1.1, 1]) },
    ],
    opacity: interpolate(progress.value, [0, 0.5, 1], [0.15, 0.25, 0.15]),
  }));

  return (
    <Animated.View
      style={[
        styles.orb,
        { width: size, height: size, borderRadius: size / 2 },
        animatedStyle,
      ]}
    >
      <LinearGradient
        colors={orbColors}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
    </Animated.View>
  );
};

/**
 * FormBackground uses hardcoded orb gradient colors intentionally.
 * These are decorative background elements that look good in both
 * light and dark modes. Kept as-is per design decision.
 */
export const FormBackground: React.FC = () => {
  const { colors, isDark } = useAppTheme();

  const orbConfigs = isDark
    ? [
        { size: 300, colors: ['#16A34A', '#14532D'] as [string, string], initialX: -80, initialY: height * 0.1, duration: 8000 },
        { size: 250, colors: ['#15803D', '#0F172A'] as [string, string], initialX: width - 150, initialY: height * 0.3, duration: 10000 },
        { size: 200, colors: ['#D4AF37', '#14532D'] as [string, string], initialX: width * 0.3, initialY: height * 0.6, duration: 9000 },
        { size: 280, colors: ['#22C55E', '#1E293B'] as [string, string], initialX: -60, initialY: height * 0.7, duration: 11000 },
      ]
    : [
        { size: 300, colors: ['#DCFCE7', '#F0FDF4'] as [string, string], initialX: -80, initialY: height * 0.1, duration: 8000 },
        { size: 250, colors: ['#BBF7D0', '#FFFFFF'] as [string, string], initialX: width - 150, initialY: height * 0.3, duration: 10000 },
        { size: 200, colors: ['#FEF9C3', '#F0FDF4'] as [string, string], initialX: width * 0.3, initialY: height * 0.6, duration: 9000 },
        { size: 280, colors: ['#86EFAC', '#FFFFFF'] as [string, string], initialX: -60, initialY: height * 0.7, duration: 11000 },
      ];

  return (
    <View style={[StyleSheet.absoluteFill, { backgroundColor: colors.background.default }]}>
      {orbConfigs.map((config, index) => (
        <Orb key={index} {...config} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  orb: {
    position: 'absolute',
    overflow: 'hidden',
  },
});
