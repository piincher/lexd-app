/**
 * GoodsListSkeleton
 * Skeleton loading placeholder matching GoodsCard layout
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
}> = ({ width, height, borderRadius = 4 }) => {
  const { colors, isDark } = useAppTheme();
  const shimmer = useSharedValue(0);
  const blockBg = isDark ? colors.neutral[700] : colors.neutral[100];

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
          colors={['transparent', isDark ? colors.neutral[600] : colors.neutral[50], 'transparent']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>
    </View>
  );
};

const GoodsSkeletonItem: React.FC = () => {
  const { colors, isDark } = useAppTheme();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.background.card,
          shadowColor: isDark ? 'transparent' : '#000',
        },
      ]}
    >
      <View style={styles.content}>
        {/* Image Thumbnail */}
        <ShimmerBlock width={80} height={80} borderRadius={8} />

        {/* Info Section */}
        <View style={styles.infoContainer}>
          {/* Header: ID + Status badge */}
          <View style={styles.headerRow}>
            <ShimmerBlock width={100} height={14} borderRadius={4} />
            <ShimmerBlock width={72} height={22} borderRadius={6} />
          </View>

          {/* Description */}
          <View style={{ marginTop: 8 }}>
            <ShimmerBlock width={'90%' as any} height={12} borderRadius={3} />
          </View>

          {/* Footer: CBM + Cost */}
          <View style={styles.footerRow}>
            <ShimmerBlock width={70} height={11} borderRadius={3} />
            <ShimmerBlock width={90} height={13} borderRadius={3} />
          </View>
        </View>
      </View>
    </View>
  );
};

interface GoodsListSkeletonProps {
  count?: number;
}

export const GoodsListSkeleton: React.FC<GoodsListSkeletonProps> = ({ count = 5 }) => (
  <Animated.View entering={FadeIn.duration(300)} style={styles.list}>
    {Array.from({ length: count }).map((_, i) => (
      <GoodsSkeletonItem key={i} />
    ))}
  </Animated.View>
);

const styles = StyleSheet.create({
  list: {
    flex: 1,
    paddingTop: 4,
  },
  card: {
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    elevation: 2,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  content: {
    flexDirection: 'row',
    padding: 12,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  block: {
    overflow: 'hidden',
  },
});
