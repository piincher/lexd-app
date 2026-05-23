/**
 * OnboardingBackground — Solid brand surface, no decorative blobs
 */

import React from "react";
import { View, StyleSheet, useWindowDimensions } from "react-native";
import { useAppTheme } from "@src/providers/ThemeProvider";

interface OnboardingBackgroundProps {
  isDark: boolean;
}

export const OnboardingBackground: React.FC<OnboardingBackgroundProps> = ({
  isDark,
}) => {
  const { width, height } = useWindowDimensions();
  const { colors } = useAppTheme();
  const styles = React.useMemo(
    () => createStyles(width, height, colors, isDark),
    [height, width, colors, isDark]
  );

  return (
    <View pointerEvents="none" style={styles.container}>
      <View style={styles.subtleTint} />
    </View>
  );
};

const createStyles = (
  width: number,
  height: number,
  colors: any,
  isDark: boolean
) =>
  StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: isDark ? colors.background.default : "#F6F7F6",
    },
    subtleTint: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: isDark
        ? colors.primary.main + "08"
        : colors.primary.main + "06",
    },
  });

export default OnboardingBackground;
