/**
 * BadgesScreenSummary
 * Summary card showing earned count, total CBM, and shipment count
 */

import React, { useMemo } from "react";
import { View, Text, StyleSheet } from "react-native";
import { MotiView } from "moti";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from "@src/constants/Fonts";
import type { BadgeSummary } from "../api/badgeApi";

interface BadgesScreenSummaryProps {
  summary: BadgeSummary;
}

const hexToRgba = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
};

export const BadgesScreenSummary: React.FC<BadgesScreenSummaryProps> = ({ summary }) => {
  const { colors } = useAppTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        summaryCard: {
          backgroundColor: hexToRgba(colors.text.inverse, 0.1),
          borderRadius: 16,
          padding: 20,
          marginBottom: 24,
          borderWidth: 1,
          borderColor: hexToRgba(colors.accent.gold, 0.2),
        },
        summaryRow: {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
        },
        summaryItem: {
          alignItems: "center",
          flex: 1,
        },
        summaryValue: {
          color: colors.text.inverse,
          fontFamily: Fonts.bold,
          fontSize: 22,
          marginTop: 6,
        },
        summaryLabel: {
          color: hexToRgba(colors.text.inverse, 0.5),
          fontFamily: Fonts.regular,
          fontSize: 11,
          marginTop: 2,
          textAlign: "center",
        },
        summaryDivider: {
          width: 1,
          height: 40,
          backgroundColor: hexToRgba(colors.text.inverse, 0.1),
        },
      }),
    [colors]
  );

  return (
    <MotiView
      from={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: "spring", damping: 15, stiffness: 120 }}
      style={styles.summaryCard}
    >
      <View style={styles.summaryRow}>
        <View style={styles.summaryItem}>
          <MaterialCommunityIcons name="medal" size={24} color={colors.accent.gold} />
          <Text style={styles.summaryValue}>{summary.earnedCount}</Text>
          <Text style={styles.summaryLabel}>Badges obtenus</Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryItem}>
          <MaterialCommunityIcons name="cube-send" size={24} color={colors.status.info} />
          <Text style={styles.summaryValue}>{summary.totalCBM.toFixed(1)}</Text>
          <Text style={styles.summaryLabel}>CBM total</Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryItem}>
          <MaterialCommunityIcons name="truck-check" size={24} color={colors.status.success} />
          <Text style={styles.summaryValue}>{summary.shipmentCount}</Text>
          <Text style={styles.summaryLabel}>Expéditions</Text>
        </View>
      </View>
    </MotiView>
  );
};
