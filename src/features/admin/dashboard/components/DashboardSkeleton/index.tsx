import React, { useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { useAppTheme } from "@src/providers/ThemeProvider";
import type { ThemeContextType } from "@src/constants/Theme";

type AppThemeColors = ThemeContextType["colors"];

const createStyles = (colors: AppThemeColors, isDark?: boolean) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 12,
      paddingTop: 10,
    },
    skelHero: {
      height: 138,
      borderRadius: 16,
      marginBottom: 14,
      backgroundColor: isDark ? colors.neutral[800] : colors.neutral[100],
    },
    skelKpiHero: {
      height: 120,
      borderRadius: 16,
      marginBottom: 12,
      backgroundColor: isDark ? colors.neutral[800] : colors.neutral[100],
    },
    skelRow: {
      flexDirection: "row",
      gap: 12,
      marginBottom: 16,
    },
    skelKpiSmall: {
      flex: 1,
      height: 122,
      borderRadius: 14,
      backgroundColor: isDark ? colors.neutral[800] : colors.neutral[100],
    },
    skelSection: {
      height: 140,
      borderRadius: 16,
      marginBottom: 16,
      backgroundColor: isDark ? colors.neutral[800] : colors.neutral[100],
    },
  });

export const DashboardSkeleton: React.FC = () => {
  const { colors, isDark } = useAppTheme();
  const styles = useMemo(() => createStyles(colors, isDark), [colors, isDark]);

  return (
    <View style={styles.container}>
      <View style={styles.skelHero} />
      <View style={styles.skelKpiHero} />
      <View style={styles.skelRow}>
        <View style={styles.skelKpiSmall} />
        <View style={styles.skelKpiSmall} />
      </View>
      <View style={styles.skelSection} />
      <View style={styles.skelSection} />
    </View>
  );
};

export default DashboardSkeleton;
