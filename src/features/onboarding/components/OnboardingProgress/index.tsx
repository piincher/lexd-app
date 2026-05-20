/**
 * OnboardingProgress - Top progress bar showing onboarding progress
 */

import React, { useMemo } from "react";
import { View, StyleSheet, Animated } from "react-native";
import { useAppTheme } from "@src/providers/ThemeProvider";

interface OnboardingProgressProps {
  currentIndex: number;
  totalSlides: number;
  scrollX: Animated.Value;
  width?: number;
}

export const OnboardingProgress: React.FC<OnboardingProgressProps> = ({
  totalSlides,
  scrollX,
  width = 0,
}) => {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const progressWidth = scrollX.interpolate({
    inputRange: [0, (totalSlides - 1) * width],
    outputRange: ["0%", "100%"],
    extrapolate: "clamp",
  });

  return (
    <View style={styles.container}>
      <View style={styles.track}>
        <Animated.View
          style={[
            styles.progress,
            { width: progressWidth },
          ]}
        />
      </View>
    </View>
  );
};

const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 24,
      paddingTop: 16,
      paddingBottom: 8,
    },
    track: {
      height: 4,
      backgroundColor: colors.neutral.white + "4D",
      borderRadius: 2,
      overflow: "hidden",
    },
    progress: {
      height: "100%",
      backgroundColor: colors.neutral.white,
      borderRadius: 2,
    },
  });

export default OnboardingProgress;
