/**
 * HeroFloatingOrb
 * Animated floating decorative circle for the hero section
 */

import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming } from 'react-native-reanimated';

interface HeroFloatingOrbProps {
  size: number;
  color: string;
  top: number;
  left: number;
  duration: number;
}

export const HeroFloatingOrb: React.FC<HeroFloatingOrbProps> = ({ size, color, top, left, duration }) => {
  const floatY = useSharedValue(0);

  useEffect(() => {
    floatY.value = withRepeat(withTiming(-12, { duration }), -1, true);
  }, []);

  const style = useAnimatedStyle(() => ({
    transform: [{ translateY: floatY.value }],
  }));

  return (
    <Animated.View
      style={[
        styles.orb,
        { width: size, height: size, borderRadius: size / 2, backgroundColor: color, top, left },
        style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  orb: {
    position: 'absolute',
  },
});
