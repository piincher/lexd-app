import React from "react";
import { View, StyleSheet } from "react-native";
import { useAppTheme } from "@src/providers/ThemeProvider";

export const DashboardSkeleton: React.FC = () => {
  const { isDark } = useAppTheme();
  const blockColor = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)";

  return (
    <View style={styles.container}>
      <View style={[styles.skelHero, { backgroundColor: blockColor }]} />
      <View style={[styles.skelKpiHero, { backgroundColor: blockColor }]} />
      <View style={styles.skelRow}>
        <View style={[styles.skelKpiSmall, { backgroundColor: blockColor }]} />
        <View style={[styles.skelKpiSmall, { backgroundColor: blockColor }]} />
      </View>
      <View style={[styles.skelSection, { backgroundColor: blockColor }]} />
      <View style={[styles.skelSection, { backgroundColor: blockColor }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  skelHero: {
    height: 170,
    borderRadius: 24,
    marginBottom: 20,
  },
  skelKpiHero: {
    height: 120,
    borderRadius: 20,
    marginBottom: 12,
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
  },
  skelSection: {
    height: 140,
    borderRadius: 18,
    marginBottom: 16,
  },
});

export default DashboardSkeleton;
