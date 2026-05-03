import React from 'react';
import Animated, { FadeInDown } from 'react-native-reanimated';

interface AnimatedSectionProps {
  children: React.ReactNode;
  delay?: number;
  style?: any;
}

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({ children, delay = 0, style }) => (
  <Animated.View entering={FadeInDown.duration(600).delay(delay)} style={style}>
    {children}
  </Animated.View>
);
