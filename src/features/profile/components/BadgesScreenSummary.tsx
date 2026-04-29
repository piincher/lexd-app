/**
 * BadgesScreenSummary
 * Summary card showing earned count, total CBM, and shipment count
 */

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MotiView } from "moti";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Fonts } from "@src/constants/Fonts";
import type { BadgeSummary } from "../api/badgeApi";

interface BadgesScreenSummaryProps {
  summary: BadgeSummary;
}

export const BadgesScreenSummary: React.FC<BadgesScreenSummaryProps> = ({ summary }) => (
  <MotiView
    from={{ opacity: 0, translateY: 20 }}
    animate={{ opacity: 1, translateY: 0 }}
    transition={{ type: "spring", damping: 15, stiffness: 120 }}
    style={styles.summaryCard}
  >
    <View style={styles.summaryRow}>
      <View style={styles.summaryItem}>
        <MaterialCommunityIcons name="medal" size={24} color="#d4a843" />
        <Text style={styles.summaryValue}>{summary.earnedCount}</Text>
        <Text style={styles.summaryLabel}>Badges obtenus</Text>
      </View>
      <View style={styles.summaryDivider} />
      <View style={styles.summaryItem}>
        <MaterialCommunityIcons name="cube-send" size={24} color="#3B82F6" />
        <Text style={styles.summaryValue}>{summary.totalCBM.toFixed(1)}</Text>
        <Text style={styles.summaryLabel}>CBM total</Text>
      </View>
      <View style={styles.summaryDivider} />
      <View style={styles.summaryItem}>
        <MaterialCommunityIcons name="truck-check" size={24} color="#10B981" />
        <Text style={styles.summaryValue}>{summary.shipmentCount}</Text>
        <Text style={styles.summaryLabel}>Expéditions</Text>
      </View>
    </View>
  </MotiView>
);

const styles = StyleSheet.create({
  summaryCard: { backgroundColor: "rgba(255,255,255,0.1)", borderRadius: 16, padding: 20, marginBottom: 24, borderWidth: 1, borderColor: "rgba(212,168,67,0.2)" },
  summaryRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-around" },
  summaryItem: { alignItems: "center", flex: 1 },
  summaryValue: { color: "#FFFFFF", fontFamily: Fonts.bold, fontSize: 22, marginTop: 6 },
  summaryLabel: { color: "rgba(255,255,255,0.5)", fontFamily: Fonts.regular, fontSize: 11, marginTop: 2, textAlign: "center" },
  summaryDivider: { width: 1, height: 40, backgroundColor: "rgba(255,255,255,0.1)" },
});
