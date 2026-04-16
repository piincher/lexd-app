/**
 * ClientCardSkeleton
 * SRP: Skeleton loading placeholder matching ClientCard layout
 * Shown when block/unblock mutation is in progress
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

const SKELETON_BG = '#E8EFF5';

const ShimmerBlock: React.FC<{
  width: number | `${number}%`;
  height: number;
  borderRadius?: number;
}> = ({ width, height, borderRadius = 4 }) => {
  const shimmer = useSharedValue(0);

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
    <View style={[styles.block, { width, height, borderRadius }]}>
      <Animated.View style={[StyleSheet.absoluteFill, shimmerStyle]}>
        <LinearGradient
          colors={['transparent', 'rgba(255,255,255,0.5)', 'transparent']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>
    </View>
  );
};

export const ClientCardSkeleton: React.FC = () => (
  <Animated.View entering={FadeIn.duration(200)} style={styles.wrapper}>
    <View style={styles.card}>
      {/* Accent border */}
      <View style={styles.accentBorder} />
      
      {/* Avatar placeholder */}
      <ShimmerBlock width={52} height={52} borderRadius={16} />
      
      {/* Info section */}
      <View style={styles.info}>
        {/* Name row */}
        <View style={styles.nameRow}>
          <ShimmerBlock width={140} height={16} borderRadius={4} />
          <ShimmerBlock width={60} height={20} borderRadius={20} />
        </View>
        
        {/* Phone row */}
        <View style={styles.detailRow}>
          <ShimmerBlock width={100} height={14} borderRadius={4} />
        </View>
        
        {/* Email row */}
        <View style={styles.detailRow}>
          <ShimmerBlock width={180} height={13} borderRadius={4} />
        </View>
      </View>
      
      {/* Action button placeholder */}
      <ShimmerBlock width={42} height={42} borderRadius={12} />
    </View>
  </Animated.View>
);

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 12,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
  },
  accentBorder: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    backgroundColor: SKELETON_BG,
  },
  info: {
    flex: 1,
    marginLeft: 14,
    marginRight: 10,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 6,
  },
  block: {
    backgroundColor: SKELETON_BG,
    overflow: 'hidden',
  },
});

export default ClientCardSkeleton;
