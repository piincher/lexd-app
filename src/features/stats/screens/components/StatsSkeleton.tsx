/**
 * StatsSkeleton
 * SRP: Shimmer loading skeleton for the stats screen
 */

import React, { useEffect, useMemo } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Theme } from '@src/constants/Theme';
import { useAppTheme } from '@src/providers/ThemeProvider';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const ShimmerBlock: React.FC<{
  width: number | string;
  height: number;
  borderRadius?: number;
  style?: any;
}> = ({ width, height, borderRadius = 8, style }) => {
  const { colors } = useAppTheme();
  const shimmer = useSharedValue(0);

  useEffect(() => {
    shimmer.value = withRepeat(withTiming(1, { duration: 1200 }), -1, false);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: interpolate(shimmer.value, [0, 1], [-SCREEN_WIDTH, SCREEN_WIDTH]) }],
  }));

  return (
    <View
      style={[
        {
          width: width as any,
          height,
          borderRadius,
          backgroundColor: colors.neutral[200],
          overflow: 'hidden',
        },
        style,
      ]}
    >
      <Animated.View style={[StyleSheet.absoluteFill, animatedStyle]}>
        <LinearGradient
          colors={['transparent', 'rgba(255,255,255,0.25)', 'transparent']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>
    </View>
  );
};

export const StatsSkeleton: React.FC = () => {
  const { colors } = useAppTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: colors.background.default,
        },
        headerSkeleton: {
          backgroundColor: colors.neutral[200],
          paddingHorizontal: 20,
          paddingTop: 12,
          paddingBottom: 28,
          borderBottomLeftRadius: 24,
          borderBottomRightRadius: 24,
        },
        headerTop: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        },
        kpiGrid: {
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 10,
          paddingHorizontal: 20,
          marginTop: -16,
        },
        kpiCard: {
          flex: 1,
          minWidth: '45%',
          backgroundColor: colors.background.card,
          borderRadius: 16,
          padding: 14,
          ...Theme.shadows.sm,
        },
        periodRow: {
          flexDirection: 'row',
          paddingHorizontal: 20,
          gap: 8,
          marginTop: 16,
        },
        card: {
          marginHorizontal: 20,
          marginTop: 12,
          backgroundColor: colors.background.card,
          borderRadius: 16,
          padding: 18,
          ...Theme.shadows.sm,
        },
        statusRow: {
          marginTop: 12,
        },
        statusRowLeft: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
        },
        modesRow: {
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          marginTop: 14,
        },
        modeItem: {
          alignItems: 'center',
          gap: 2,
        },
        paymentRow: {
          flexDirection: 'row',
          gap: 10,
          marginTop: 14,
        },
        paymentCard: {
          flex: 1,
          backgroundColor: colors.background.paper,
          borderRadius: 12,
          padding: 14,
        },
      }),
    [colors]
  );

  return (
    <View style={styles.container}>
      {/* Header skeleton */}
      <View style={styles.headerSkeleton}>
        <View style={styles.headerTop}>
          <View>
            <ShimmerBlock width={180} height={22} borderRadius={6} />
            <ShimmerBlock width={120} height={14} borderRadius={4} style={{ marginTop: 6 }} />
          </View>
          <ShimmerBlock width={100} height={30} borderRadius={15} />
        </View>
        <ShimmerBlock width={200} height={12} borderRadius={4} style={{ marginTop: 8 }} />
      </View>

      {/* KPI grid skeleton */}
      <View style={styles.kpiGrid}>
        {[0, 1, 2, 3].map((i) => (
          <View key={i} style={styles.kpiCard}>
            <ShimmerBlock width={38} height={38} borderRadius={11} />
            <ShimmerBlock width={60} height={20} borderRadius={4} style={{ marginTop: 10 }} />
            <ShimmerBlock width={70} height={11} borderRadius={4} style={{ marginTop: 4 }} />
            <ShimmerBlock width={50} height={10} borderRadius={4} style={{ marginTop: 4 }} />
          </View>
        ))}
      </View>

      {/* Period selector skeleton */}
      <View style={styles.periodRow}>
        {[0, 1, 2, 3].map((i) => (
          <ShimmerBlock key={i} width={70} height={32} borderRadius={16} />
        ))}
      </View>

      {/* Status breakdown skeleton */}
      <View style={styles.card}>
        <ShimmerBlock width={160} height={16} borderRadius={4} />
        {[0, 1, 2, 3].map((i) => (
          <View key={i} style={styles.statusRow}>
            <View style={styles.statusRowLeft}>
              <ShimmerBlock width={22} height={22} borderRadius={7} />
              <ShimmerBlock width={70} height={13} borderRadius={4} />
            </View>
            <ShimmerBlock width={'100%' as any} height={5} borderRadius={3} style={{ marginTop: 6 }} />
          </View>
        ))}
      </View>

      {/* Shipping mode skeleton */}
      <View style={styles.card}>
        <ShimmerBlock width={140} height={16} borderRadius={4} />
        <ShimmerBlock width={'100%' as any} height={6} borderRadius={3} style={{ marginTop: 14 }} />
        <View style={styles.modesRow}>
          <View style={styles.modeItem}>
            <ShimmerBlock width={38} height={38} borderRadius={11} />
            <ShimmerBlock width={30} height={20} borderRadius={4} style={{ marginTop: 4 }} />
            <ShimmerBlock width={50} height={11} borderRadius={4} style={{ marginTop: 4 }} />
          </View>
          <ShimmerBlock width={1} height={60} borderRadius={0} />
          <View style={styles.modeItem}>
            <ShimmerBlock width={38} height={38} borderRadius={11} />
            <ShimmerBlock width={30} height={20} borderRadius={4} style={{ marginTop: 4 }} />
            <ShimmerBlock width={50} height={11} borderRadius={4} style={{ marginTop: 4 }} />
          </View>
        </View>
      </View>

      {/* Payment skeleton */}
      <View style={styles.card}>
        <ShimmerBlock width={120} height={16} borderRadius={4} />
        <View style={styles.paymentRow}>
          <View style={styles.paymentCard}>
            <ShimmerBlock width={80} height={17} borderRadius={4} />
            <ShimmerBlock width={40} height={10} borderRadius={4} style={{ marginTop: 4 }} />
          </View>
          <View style={styles.paymentCard}>
            <ShimmerBlock width={80} height={17} borderRadius={4} />
            <ShimmerBlock width={40} height={10} borderRadius={4} style={{ marginTop: 4 }} />
          </View>
        </View>
      </View>
    </View>
  );
};
