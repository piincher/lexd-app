/**
 * OnboardingBackground - Animated gradient background
 */

import React from "react";
import { View, StyleSheet, Animated } from "react-native";

interface OnboardingBackgroundProps {
  backgroundColor: Animated.AnimatedInterpolation<string>;
}

export const OnboardingBackground: React.FC<OnboardingBackgroundProps> = ({
  backgroundColor,
}) => {
  return (
    <Animated.View
      style={[
        styles.container,
        { backgroundColor },
      ]}
    >
      {/* Gradient Overlay */}
      <View style={styles.gradientOverlay} />
      
      {/* Decorative Elements */}
      <View style={[styles.blob, styles.blob1]} />
      <View style={[styles.blob, styles.blob2]} />
      <View style={[styles.blob, styles.blob3]} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.05)",
  },
  blob: {
    position: "absolute",
    borderRadius: 999,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
  },
  blob1: {
    width: 300,
    height: 300,
    top: -100,
    right: -100,
  },
  blob2: {
    width: 200,
    height: 200,
    bottom: "30%",
    left: -60,
  },
  blob3: {
    width: 150,
    height: 150,
    bottom: -40,
    right: "20%",
  },
});

export default OnboardingBackground;
