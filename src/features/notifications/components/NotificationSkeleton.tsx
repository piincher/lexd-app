/**
 * NotificationSkeleton Component
 * Skeleton loading state for notification list
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

import { useAppTheme } from '@src/providers/ThemeProvider';

interface NotificationSkeletonProps {
  count?: number;
}

type SkeletonStyles = ReturnType<typeof StyleSheet.create>;

const SkeletonBlock: React.FC<{ style: object; shimmerColor: string }> = ({ style, shimmerColor }) => (
  <View style={style}>
    <LinearGradient
      colors={['transparent', shimmerColor, 'transparent']}
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
      style={StyleSheet.absoluteFill}
    />
  </View>
);

const SkeletonItem: React.FC<{ styles: SkeletonStyles; shimmerColor: string }> = ({ styles, shimmerColor }) => (
  <View style={styles.container}>
    <SkeletonBlock style={styles.iconSkeleton} shimmerColor={shimmerColor} />

    <View style={styles.content}>
      <SkeletonBlock style={styles.titleSkeleton} shimmerColor={shimmerColor} />
      <SkeletonBlock style={styles.messageSkeleton} shimmerColor={shimmerColor} />
      <SkeletonBlock style={[styles.messageSkeleton, styles.shortMessage]} shimmerColor={shimmerColor} />
      <SkeletonBlock style={styles.timeSkeleton} shimmerColor={shimmerColor} />
    </View>
  </View>
);

const NotificationSkeleton: React.FC<NotificationSkeletonProps> = ({ count = 5 }) => {
  const { colors, isDark } = useAppTheme();
  const styles = StyleSheet.create({
    list: {
      paddingVertical: 8,
    },
    container: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      padding: 16,
      backgroundColor: colors.background.card,
      marginHorizontal: 16,
      marginVertical: 4,
      borderRadius: 12,
    },
    iconSkeleton: {
      width: 48,
      height: 48,
      borderRadius: 12,
      backgroundColor: colors.neutral[200],
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
      backgroundColor: colors.neutral[200],
      overflow: 'hidden',
    },
    messageSkeleton: {
      height: 12,
      width: '100%',
      borderRadius: 4,
      backgroundColor: colors.neutral[200],
      overflow: 'hidden',
    },
    shortMessage: {
      width: '60%',
    },
    timeSkeleton: {
      height: 10,
      width: 60,
      borderRadius: 4,
      backgroundColor: colors.neutral[200],
      overflow: 'hidden',
      marginTop: 4,
    },
  });

  const shimmerColor = isDark ? colors.neutral[700] : colors.neutral[50];

  return (
    <Animated.View entering={FadeIn} style={styles.list}>
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonItem key={index} styles={styles} shimmerColor={shimmerColor} />
      ))}
    </Animated.View>
  );
};

export default NotificationSkeleton;
