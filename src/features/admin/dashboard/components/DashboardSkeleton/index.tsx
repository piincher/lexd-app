import React, { useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { useAppTheme } from "@src/providers/ThemeProvider";

const createStyles = (colors: any, isDark?: boolean) =>
  StyleSheet.create({
    container: {
      padding: 16,
    },
    skelHero: {
      height: 170,
      borderRadius: 24,
      marginBottom: 20,
      backgroundColor: isDark ? colors.neutral[800] : colors.neutral[100],
    },
    skelKpiHero: {
      height: 120,
      borderRadius: 20,
      marginBottom: 12,
      backgroundColor: isDark ? colors.neutral[800] : colors.neutral[100],
    },
    skelRow: {
      flexDirection: "row",
      gap: 12,
      marginBottom: 20,
    },
    skelKpiSmall: {
      flex: 1,
      height: 130,
      borderRadius: 18,
      backgroundColor: isDark ? colors.neutral[800] : colors.neutral[100],
    },
    skelSection: {
      height: 140,
      borderRadius: 18,
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
