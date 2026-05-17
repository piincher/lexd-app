/**
 * OnboardingSquare - Animated rotating square decoration
 */

import React from "react";
import { StyleSheet, Animated, Dimensions } from "react-native";
import { useAppTheme } from "@src/providers/ThemeProvider";

const { height } = Dimensions.get("screen");

interface OnboardingSquareProps {
  scrollX: Animated.Value;
  width?: number;
}

export const OnboardingSquare: React.FC<OnboardingSquareProps> = ({
  scrollX,
  width = 0,
}) => {
  const { colors } = useAppTheme();

  // Create rotation and translation based on scroll position
  const rotate = scrollX.interpolate({
    inputRange: [0, width, 2 * width, 3 * width],
    outputRange: ["-35deg", "-35deg", "-35deg", "-35deg"],
  });

  const translateX = scrollX.interpolate({
    inputRange: [0, width],
    outputRange: [0, -height],
  });

  return (
    <Animated.View
      style={[
        styles.square,
        {
          backgroundColor: colors.text.inverse,
          transform: [{ rotate }, { translateX }],
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  square: {
    width: height,
    height: height,
    borderRadius: 86,
    position: "absolute",
    top: -height * 0.6,
    left: -height * 0.3,
  },
});

export default OnboardingSquare;
