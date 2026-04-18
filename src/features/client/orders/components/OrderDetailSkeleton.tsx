/**
 * OrderDetailSkeleton
 * Shimmer skeleton matching OrderHeader + OrderSummary + PackageList layout
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

export const OrderDetailSkeleton: React.FC = () => {
  const { colors } = useAppTheme();
  const bg = colors.background.paper;
  const cardBg = colors.background.card;
  const borderColor = colors.border ?? '#E5E7EB';

  return (
    <Animated.View entering={FadeIn.duration(300)} style={styles.container}>
      {/* ── OrderHeader skeleton ── */}
      <View style={styles.header}>
        <ShimmerBlock width={160} height={20} color={bg} />
        <ShimmerBlock width={80} height={26} borderRadius={12} color={bg} />
      </View>

      {/* ── OrderSummary skeleton ── */}
      <View style={[styles.summaryCard, { backgroundColor: cardBg, borderColor }]}>
        <View style={styles.summaryRow}>
          <View style={styles.summaryItem}>
            <ShimmerBlock width={70} height={10} color={bg} />
            <View style={{ height: 8 }} />
            <ShimmerBlock width={50} height={18} color={bg} />
          </View>
          <View style={[styles.summaryDivider, { backgroundColor: borderColor }]} />
          <View style={styles.summaryItem}>
            <ShimmerBlock width={40} height={10} color={bg} />
            <View style={{ height: 8 }} />
            <ShimmerBlock width={30} height={18} color={bg} />
          </View>
        </View>
      </View>

      {/* ── PackageList skeleton ── */}
      <ShimmerBlock width={90} height={14} color={bg} />
      <View style={{ height: 14 }} />

      {Array.from({ length: 3 }).map((_, i) => (
        <View key={i} style={[styles.packageCard, { backgroundColor: cardBg, borderColor }]}>
          {/* Package header: tracking + badge */}
          <View style={styles.packageHeader}>
            <ShimmerBlock width={120} height={14} color={bg} />
            <ShimmerBlock width={64} height={22} borderRadius={10} color={bg} />
          </View>
          {/* Description */}
          <ShimmerBlock width={'85%'} height={12} color={bg} />
          <View style={{ height: 8 }} />
          {/* CBM */}
          <ShimmerBlock width={70} height={11} color={bg} />
        </View>
      ))}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 14,
  },
  block: {
    overflow: 'hidden',
  },

  /* Header */
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  /* Summary card */
  summaryCard: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    marginBottom: 20,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  summaryItem: {
    alignItems: 'center',
    flex: 1,
  },
  summaryDivider: {
    width: 1,
    height: 40,
  },

  /* Package cards */
  packageCard: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 14,
    marginBottom: 12,
  },
  packageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
});
