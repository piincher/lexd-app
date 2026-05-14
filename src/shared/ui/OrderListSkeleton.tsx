/**
 * OrderListSkeleton
 * Skeleton loading placeholder matching OrderListCard layout
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  FadeIn,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  useSharedValue,
  interpolate,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppTheme } from '@src/providers/ThemeProvider';

const ShimmerBlock: React.FC<{
  width: number | `${number}%`;
  height: number;
  borderRadius?: number;
  bg?: string;
}> = ({ width, height, borderRadius = 4, bg }) => {
  const { colors, isDark } = useAppTheme();
  const shimmer = useSharedValue(0);
  const blockBg = bg ?? (isDark ? 'rgba(255,255,255,0.08)' : colors.neutral[100]);

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
    <View style={[styles.block, { width, height, borderRadius, backgroundColor: blockBg }]}>
      <Animated.View style={[StyleSheet.absoluteFill, shimmerStyle]}>
        <LinearGradient
          colors={['transparent', isDark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.5)', 'transparent']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>
    </View>
  );
};

const OrderSkeletonItem: React.FC = () => {
  const { colors, isDark } = useAppTheme();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.background.card,
          borderColor: isDark ? 'rgba(255,255,255,0.06)' : colors.border,
        },
      ]}
    >
      {/* Row 1: Icon + Code + Status + Chevron */}
      <View style={styles.topRow}>
        <ShimmerBlock width={38} height={38} borderRadius={10} />
        <View style={styles.topInfo}>
          <ShimmerBlock width={120} height={14} borderRadius={4} />
          <View style={{ height: 6 }} />
          <View style={styles.metaRow}>
            <ShimmerBlock width={60} height={10} borderRadius={3} />
            <ShimmerBlock width={50} height={10} borderRadius={3} />
          </View>
        </View>
        <ShimmerBlock width={72} height={24} borderRadius={6} />
      </View>

      {/* Row 2: Progress bar */}
      <View style={styles.progressRow}>
        <ShimmerBlock width={'85%' as any} height={4} borderRadius={2} />
        <ShimmerBlock width={28} height={10} borderRadius={3} />
      </View>
    </View>
  );
};

interface OrderListSkeletonProps {
  count?: number;
}

export const OrderListSkeleton: React.FC<OrderListSkeletonProps> = ({ count = 6 }) => (
  <Animated.View entering={FadeIn.duration(300)} style={styles.list}>
    {Array.from({ length: count }).map((_, i) => (
      <OrderSkeletonItem key={i} />
    ))}
  </Animated.View>
);

const styles = StyleSheet.create({
  list: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 4,
  },
  card: {
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  topInfo: {
    flex: 1,
    marginRight: 8,
  },
  metaRow: {
    flexDirection: 'row',
    gap: 8,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    gap: 8,
  },
  block: {
    overflow: 'hidden',
  },
});
