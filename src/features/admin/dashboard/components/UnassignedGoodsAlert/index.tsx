import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { Theme } from "@src/constants/Theme";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { AlertHero } from "./components/AlertHero";
import { AlertBreakdown } from "./components/AlertBreakdown";
import { AlertFooter } from "./components/AlertFooter";

interface UnassignedGoodsAlertProps {
  total: number;
  byShippingMode: { AIR: number; SEA: number };
  byAge: { "0-3": number; "4-7": number; "8+": number };
  onPress: () => void;
}

export const UnassignedGoodsAlert: React.FC<UnassignedGoodsAlertProps> = ({
  total,
  byShippingMode,
  byAge,
  onPress,
}) => {
  const { colors, isDark } = useAppTheme();
  const hasUnassigned = total > 0;

  const styles = StyleSheet.create({
    card: {
      marginBottom: 16,
      borderRadius: 20,
      overflow: "hidden",
      backgroundColor: colors.background.card,
      borderWidth: 1,
      borderColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)",
      ...Theme.shadows.md,
    },
  });

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        pressed && { opacity: 0.92 },
      ]}
    >
      <AlertHero hasUnassigned={hasUnassigned} total={total} />
      {hasUnassigned && (
        <AlertBreakdown byShippingMode={byShippingMode} byAge={byAge} />
      )}
      <AlertFooter hasUnassigned={hasUnassigned} />
    </Pressable>
  );
};

export default UnassignedGoodsAlert;
