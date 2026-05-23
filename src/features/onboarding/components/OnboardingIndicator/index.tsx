/**
 * OnboardingIndicator — Minimal brand dot indicators
 */

import React, { useMemo } from "react";
import { View, StyleSheet, Animated } from "react-native";
import { useAppTheme } from "@src/providers/ThemeProvider";

interface OnboardingIndicatorProps {
  scrollX: Animated.Value;
  count: number;
  currentIndex: number;
  width?: number;
}

const DOT_SIZE = 8;
const ACTIVE_DOT_WIDTH = 24;

export const OnboardingIndicator: React.FC<OnboardingIndicatorProps> = ({
  scrollX,
  count,
  width = 0,
}) => {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  return (
    <View style={styles.container}>
      {Array.from({ length: count }).map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

        const scale = scrollX.interpolate({
          inputRange,
          outputRange: [0.85, 1, 0.85],
          extrapolate: "clamp",
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.35, 1, 0.35],
          extrapolate: "clamp",
        });

        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [DOT_SIZE, ACTIVE_DOT_WIDTH, DOT_SIZE],
          extrapolate: "clamp",
        });

        const backgroundColor = scrollX.interpolate({
          inputRange,
          outputRange: [
            colors.text.muted,
            colors.primary.main,
            colors.text.muted,
          ],
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
                backgroundColor,
              },
            ]}
          />
        );
      })}
    </View>
  );
};

const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      gap: 8,
    },
    dot: {
      height: DOT_SIZE,
      borderRadius: DOT_SIZE / 2,
    },
  });

export default OnboardingIndicator;
