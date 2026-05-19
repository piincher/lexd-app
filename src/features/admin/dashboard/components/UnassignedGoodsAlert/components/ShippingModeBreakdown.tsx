import React, { useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Fonts } from "@src/constants/Fonts";
import { useAppTheme } from "@src/providers/ThemeProvider";

interface ShippingModeBreakdownProps {
  byShippingMode: { AIR: number; SEA: number };
}

const getIconBgStyle = (color: string) =>
  StyleSheet.create({ iconBg: { backgroundColor: `${color}20` } }).iconBg;

export const ShippingModeBreakdown: React.FC<ShippingModeBreakdownProps> = ({
  byShippingMode,
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const createStyles = (colors: any) => StyleSheet.create({
    row: {
      flexDirection: "row",
      gap: 8,
      marginBottom: 10,
    },
    modePill: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      padding: 10,
      borderRadius: 12,
      backgroundColor: colors.action.hover,
    },
    modeIconWrap: {
      width: 30,
      height: 30,
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center",
    },
    modeValue: {
      fontSize: 15,
      fontFamily: Fonts.bold,
      color: colors.text.primary,
    },
    modeLabel: {
      fontSize: 10,
      fontFamily: Fonts.regular,
      color: colors.text.secondary,
      textTransform: "uppercase",
      letterSpacing: 0.4,
      marginTop: 1,
    },
    modeTextContainer: {
      flex: 1,
    },
  });

  const shippingModes = [
    { key: "AIR" as const, label: "Air", icon: "airplane", color: colors.status.info, value: byShippingMode.AIR },
    { key: "SEA" as const, label: "Maritime", icon: "ferry", color: colors.status.info, value: byShippingMode.SEA },
  ];

  return (
    <View style={styles.row}>
      {shippingModes.map((mode) => (
        <View key={mode.key} style={styles.modePill}>
          <View style={[styles.modeIconWrap, getIconBgStyle(mode.color)]}>
            <MaterialCommunityIcons name={mode.icon as any} size={16} color={mode.color} />
          </View>
          <View style={styles.modeTextContainer}>
            <Text style={styles.modeValue}>{mode.value}</Text>
            <Text style={styles.modeLabel}>{mode.label}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};
