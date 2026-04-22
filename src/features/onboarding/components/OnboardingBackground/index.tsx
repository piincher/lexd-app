/**
 * OnboardingBackground - Animated gradient background
 */

import React from "react";
import { View, StyleSheet, Animated, useWindowDimensions } from "react-native";

interface OnboardingBackgroundProps {
  backgroundColor: Animated.AnimatedInterpolation<string>;
}

export const OnboardingBackground: React.FC<OnboardingBackgroundProps> = ({
  backgroundColor,
}) => {
  const { width, height } = useWindowDimensions();
  const styles = React.useMemo(
    () => createStyles(width, height),
    [height, width]
  );

  return (
    <Animated.View
      pointerEvents="none"
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

const createStyles = (width: number, height: number) => {
  const largeBlob = Math.min(Math.max(width * 0.72, 240), 360);
  const midBlob = Math.min(Math.max(width * 0.48, 160), 240);
  const smallBlob = Math.min(Math.max(width * 0.34, 120), 180);

  return StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
    },
    gradientOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: "rgba(0, 0, 0, 0.08)",
    },
    blob: {
      position: "absolute",
      borderRadius: 999,
      backgroundColor: "rgba(255, 255, 255, 0.07)",
    },
    blob1: {
      width: largeBlob,
      height: largeBlob,
      top: -largeBlob * 0.36,
      right: -largeBlob * 0.28,
    },
    blob2: {
      width: midBlob,
      height: midBlob,
      top: height * 0.46,
      left: -midBlob * 0.3,
    },
    blob3: {
      width: smallBlob,
      height: smallBlob,
      bottom: -smallBlob * 0.22,
      right: width * 0.22,
    },
  });
};

export default OnboardingBackground;
