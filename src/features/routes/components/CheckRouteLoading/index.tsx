import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { ShimmerBlock } from '@src/shared/ui';
import { CheckRouteCard } from '../CheckRouteCard';

export const CheckRouteLoading: React.FC = () => {
  return (
    <Animated.View entering={FadeIn.duration(200)}>
      <CheckRouteCard>
        <View style={styles.loadingBlock}>
          <ShimmerBlock width="60%" height={18} borderRadius={6} />
          <ShimmerBlock width="40%" height={12} borderRadius={4} />
          <View style={styles.spacer} />
          <ShimmerBlock width="100%" height={48} borderRadius={8} />
          <ShimmerBlock width="100%" height={48} borderRadius={8} />
          <ShimmerBlock width="100%" height={48} borderRadius={8} />
        </View>
      </CheckRouteCard>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  loadingBlock: {
    gap: 10,
  },
  spacer: {
    height: 12,
  },
});
