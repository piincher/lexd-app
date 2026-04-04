/**
 * OnboardingIndicator - Modern animated dot indicators
 */

import React from "react";
import { View, StyleSheet, Animated } from "react-native";

interface OnboardingIndicatorProps {
  scrollX: Animated.Value;
  count: number;
  currentIndex: number;
  width?: number;
}

const DOT_SIZE = 10;
const ACTIVE_DOT_WIDTH = 28;

export const OnboardingIndicator: React.FC<OnboardingIndicatorProps> = ({
  scrollX,
  count,
  width = 0,
}) => {
  return (
    <View style={styles.container}>
      {Array.from({ length: count }).map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

        // Scale animation
        const scale = scrollX.interpolate({
          inputRange,
          outputRange: [0.8, 1, 0.8],
          extrapolate: "clamp",
        });

        // Opacity animation
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.4, 1, 0.4],
          extrapolate: "clamp",
        });

        // Width animation for active state
        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [DOT_SIZE, ACTIVE_DOT_WIDTH, DOT_SIZE],
          extrapolate: "clamp",
        });

        return (
          <Animated.View
            key={`indicator-${i}`}
            style={[
              styles.dot,
              {
                width: dotWidth,
                opacity,
                transform: [{ scale }],
              },
            ]}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  dot: {
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    backgroundColor: "#FFFFFF",
  },
});

export default OnboardingIndicator;
