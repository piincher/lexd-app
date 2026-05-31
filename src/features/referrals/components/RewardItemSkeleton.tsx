import React, { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from './RewardItemSkeleton.styles';

interface RewardItemSkeletonProps {
  /** Number of placeholder cards to render (defaults to 6 = three rows of two). */
  count?: number;
}

/** Loading placeholder grid that mirrors the reward card layout. */
export const RewardItemSkeleton: React.FC<RewardItemSkeletonProps> = ({ count = 6 }) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);
  const pulse = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1, duration: 700, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 0.4, duration: 700, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [pulse]);

  return (
    <View style={styles.grid}>
      {Array.from({ length: count }).map((_, index) => (
        <Animated.View key={index} style={[styles.card, { opacity: pulse }]}>
          <View style={styles.image} />
          <View style={styles.body}>
            <View style={[styles.line, { width: '90%' }]} />
            <View style={[styles.line, { width: '55%' }]} />
            <View style={[styles.line, styles.lineWide, { width: '40%' }]} />
          </View>
        </Animated.View>
      ))}
    </View>
  );
};
