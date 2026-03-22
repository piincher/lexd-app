/**
 * OnboardingBackdrop - Animated background color component
 * Interpolates background color based on scroll position
 */

import React from "react";
import { StyleSheet, Animated } from "react-native";

interface OnboardingBackdropProps {
  scrollX: Animated.Value;
  colors: string[];
  width?: number;
}

export const OnboardingBackdrop: React.FC<OnboardingBackdropProps> = ({
  scrollX,
  colors,
  width = 0,
}) => {
  // Create input range based on slide positions
  const inputRange = colors.map((_, index) => index * width);

  // Interpolate background color
  const backgroundColor = scrollX.interpolate({
    inputRange,
    outputRange: colors,
  });

  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFillObject,
        { backgroundColor },
      ]}
    />
  );
};

export default OnboardingBackdrop;
