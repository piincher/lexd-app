/**
 * ClientOrderCardSkeleton
 * Shimmer skeleton matching ClientOrderCard layout
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
import { useAppTheme } from '@src/providers';

const ShimmerBlock: React.FC<{
  width: number | `${number}%`;
  height: number;
  borderRadius?: number;
  color?: string;
}> = ({ width, height, borderRadius = 6, color }) => {
  const shimmer = useSharedValue(0);

  React.useEffect(() => {
    shimmer.value = withRepeat(withTiming(1, { duration: 1200 }), -1, false);
  }, []);

  const shimmerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: interpolate(shimmer.value, [0, 1], [-200, 400]) }],
  }));

  return (
    <View style={[styles.block, { width, height, borderRadius, backgroundColor: color }]}>
      <Animated.View style={[StyleSheet.absoluteFill, shimmerStyle]}>
        <LinearGradient
          colors={['transparent', 'rgba(255,255,255,0.45)', 'transparent']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>
    </View>
  );
};

const SkeletonCard: React.FC<{ skeletonBg: string; cardBg: string; borderColor: string }> = ({
  skeletonBg,
  cardBg,
  borderColor,
}) => (
  <View style={[styles.card, { backgroundColor: cardBg, borderColor }]}>
    {/* Header: order code + badge */}
    <View style={styles.header}>
      <ShimmerBlock width={120} height={16} color={skeletonBg} />
      <ShimmerBlock width={76} height={24} borderRadius={12} color={skeletonBg} />
    </View>

    {/* Details: volume + cost rows */}
    <View style={styles.details}>
      <View style={styles.row}>
        <ShimmerBlock width={60} height={12} color={skeletonBg} />
        <ShimmerBlock width={80} height={12} color={skeletonBg} />
      </View>
      <View style={styles.row}>
        <ShimmerBlock width={70} height={12} color={skeletonBg} />
        <ShimmerBlock width={100} height={16} color={skeletonBg} />
      </View>
    </View>

    {/* Footer: date */}
    <View style={[styles.footer, { borderTopColor: borderColor }]}>
      <View style={{ flex: 1 }} />
      <ShimmerBlock width={80} height={10} color={skeletonBg} />
    </View>
  </View>
);

interface ClientOrderCardSkeletonProps {
  count?: number;
}

export const ClientOrderCardSkeleton: React.FC<ClientOrderCardSkeletonProps> = ({ count = 5 }) => {
  const { colors } = useAppTheme();
  const skeletonBg = colors.background.paper;
  const cardBg = colors.background.card;
  const borderColor = colors.border ?? '#E5E7EB';

  return (
    <Animated.View entering={FadeIn.duration(300)} style={styles.list}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} skeletonBg={skeletonBg} cardBg={cardBg} borderColor={borderColor} />
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
    gap: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingTop: 10,
    borderTopWidth: 1,
  },
  block: {
    overflow: 'hidden',
  },
});
