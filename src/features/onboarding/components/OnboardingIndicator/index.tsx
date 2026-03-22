/**
 * OnboardingIndicator - Dot indicators for onboarding slides
 * Animated scale and opacity based on scroll position
 */

import React from "react";
import { View, StyleSheet, Animated } from "react-native";

interface OnboardingIndicatorProps {
  scrollX: Animated.Value;
  count: number;
  currentIndex: number;
  width?: number;
}

export const OnboardingIndicator: React.FC<OnboardingIndicatorProps> = ({
  scrollX,
  count,
  width = 0,
}) => {
  return (
    <View style={styles.container}>
      {Array.from({ length: count }).map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
        
        const scale = scrollX.interpolate({
          inputRange,
          outputRange: [0.8, 1.4, 0.8],
          extrapolate: "clamp",
        });
        
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.4, 1, 0.4],
          extrapolate: "clamp",
        });

        return (
          <Animated.View
            key={`indicator-${i}`}
            style={[
              styles.dot,
              {
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
    position: "absolute",
    bottom: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
    margin: 8,
  },
});

export default OnboardingIndicator;
