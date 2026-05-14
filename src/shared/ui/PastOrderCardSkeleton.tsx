/**
 * PastOrderCardSkeleton
 * Shimmer skeleton matching PastOrderCard layout
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
  color?: string;
  isDark?: boolean;
}> = ({ width, height, borderRadius = 6, color, isDark }) => {
  const shimmer = useSharedValue(0);

  React.useEffect(() => {
    shimmer.value = withRepeat(withTiming(1, { duration: 1200 }), -1, false);
  }, []);

  const shimmerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: interpolate(shimmer.value, [0, 1], [-200, 400]) }],
  }));

  const shimmerColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.45)';

  return (
    <View style={[styles.block, { width, height, borderRadius, backgroundColor: color }]}>
      <Animated.View style={[StyleSheet.absoluteFill, shimmerStyle]}>
        <LinearGradient
          colors={['transparent', shimmerColor, 'transparent']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>
    </View>
  );
};

const SkeletonCard: React.FC<{ skeletonBg: string; cardBg: string; borderColor: string; isDark: boolean }> = ({
  skeletonBg,
  cardBg,
  borderColor,
  isDark,
}) => (
  <View style={[styles.card, { backgroundColor: cardBg, borderColor }]}>
    {/* Header: order number + status badge */}
    <View style={styles.header}>
      <ShimmerBlock width={130} height={16} color={skeletonBg} isDark={isDark} />
      <ShimmerBlock width={80} height={24} borderRadius={12} color={skeletonBg} isDark={isDark} />
    </View>

    {/* Details: 2 icon rows */}
    <View style={styles.details}>
      <View style={styles.row}>
        <ShimmerBlock width={16} height={16} borderRadius={8} color={skeletonBg} isDark={isDark} />
        <ShimmerBlock width={160} height={12} color={skeletonBg} isDark={isDark} />
      </View>
      <View style={styles.row}>
        <ShimmerBlock width={16} height={16} borderRadius={8} color={skeletonBg} isDark={isDark} />
        <ShimmerBlock width={100} height={12} color={skeletonBg} isDark={isDark} />
      </View>
    </View>

    {/* Footer: date + amount */}
    <View style={[styles.footer, { borderTopColor: borderColor }]}>
      <ShimmerBlock width={80} height={10} color={skeletonBg} isDark={isDark} />
      <ShimmerBlock width={90} height={16} color={skeletonBg} isDark={isDark} />
    </View>
  </View>
);

interface PastOrderCardSkeletonProps {
  count?: number;
}

export const PastOrderCardSkeleton: React.FC<PastOrderCardSkeletonProps> = ({ count = 5 }) => {
  const { colors, isDark } = useAppTheme();
  const skeletonBg = colors.background.paper;
  const cardBg = colors.background.card;
  const borderColor = colors.border ?? '#E5E7EB';

  return (
    <Animated.View entering={FadeIn.duration(300)} style={styles.list}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} skeletonBg={skeletonBg} cardBg={cardBg} borderColor={borderColor} isDark={isDark} />
      ))}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 12,
  },
  card: {
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  details: {
    marginBottom: 14,
    gap: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    borderTopWidth: 1,
  },
  block: {
    overflow: 'hidden',
  },
});
