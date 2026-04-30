import React from 'react';
import Animated from 'react-native-reanimated';

export interface AppHeaderProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  right?: React.ReactNode;
  transparent?: boolean;
  scrollY?: Animated.SharedValue<number>;
  elevationThreshold?: number;
}
