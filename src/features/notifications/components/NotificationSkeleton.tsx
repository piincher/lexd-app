/**
 * NotificationSkeleton Component
 * Skeleton loading state for notification list
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

import { COLORS } from '@src/constants/Colors';

interface NotificationSkeletonProps {
  count?: number;
}

const SkeletonItem: React.FC = () => {
  const shimmer = useSharedValue(0);

  // Start shimmer animation
  React.useEffect(() => {
    shimmer.value = withRepeat(
      withTiming(1, { duration: 1500 }),
      -1,
      false
    );
  }, []);

  const shimmerStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      shimmer.value,
      [0, 1],
      [-200, 400]
    );
    return {
      transform: [{ translateX }],
    };
  });

  return (
    <View style={styles.container}>
      {/* Icon skeleton */}
      <View style={styles.iconSkeleton}>
        <Animated.View style={[StyleSheet.absoluteFill, shimmerStyle]}>
          <LinearGradient
            colors={['transparent', 'rgba(255,255,255,0.5)', 'transparent']}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={StyleSheet.absoluteFill}
          />
        </Animated.View>
      </View>

      {/* Content skeleton */}
      <View style={styles.content}>
        {/* Title */}
        <View style={styles.titleSkeleton}>
          <Animated.View style={[StyleSheet.absoluteFill, shimmerStyle]}>
            <LinearGradient
              colors={['transparent', 'rgba(255,255,255,0.5)', 'transparent']}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={StyleSheet.absoluteFill}
            />
          </Animated.View>
        </View>

        {/* Message line 1 */}
        <View style={styles.messageSkeleton}>
          <Animated.View style={[StyleSheet.absoluteFill, shimmerStyle]}>
            <LinearGradient
              colors={['transparent', 'rgba(255,255,255,0.5)', 'transparent']}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={StyleSheet.absoluteFill}
            />
          </Animated.View>
        </View>

        {/* Message line 2 */}
        <View style={[styles.messageSkeleton, { width: '60%' }]}>
          <Animated.View style={[StyleSheet.absoluteFill, shimmerStyle]}>
            <LinearGradient
              colors={['transparent', 'rgba(255,255,255,0.5)', 'transparent']}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={StyleSheet.absoluteFill}
            />
          </Animated.View>
        </View>

        {/* Time badge */}
        <View style={styles.timeSkeleton}>
          <Animated.View style={[StyleSheet.absoluteFill, shimmerStyle]}>
            <LinearGradient
              colors={['transparent', 'rgba(255,255,255,0.5)', 'transparent']}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={StyleSheet.absoluteFill}
            />
          </Animated.View>
        </View>
      </View>
    </View>
  );
};

const NotificationSkeleton: React.FC<NotificationSkeletonProps> = ({ count = 5 }) => {
  return (
    <Animated.View entering={FadeIn} style={styles.list}>
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonItem key={index} />
      ))}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  list: {
    paddingVertical: 8,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
    backgroundColor: COLORS.white,
    marginHorizontal: 16,
    marginVertical: 4,
    borderRadius: 12,
  },
  iconSkeleton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: COLORS.lightergray,
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    marginLeft: 12,
    gap: 8,
  },
  titleSkeleton: {
    height: 16,
    width: '70%',
    borderRadius: 4,
    backgroundColor: COLORS.lightergray,
    overflow: 'hidden',
  },
  messageSkeleton: {
    height: 12,
    width: '100%',
    borderRadius: 4,
    backgroundColor: COLORS.lightergray,
    overflow: 'hidden',
  },
  timeSkeleton: {
    height: 10,
    width: 60,
    borderRadius: 4,
    backgroundColor: COLORS.lightergray,
    overflow: 'hidden',
    marginTop: 4,
  },
});

export default NotificationSkeleton;
