/**
 * SMSBalanceCard - SMS balance widget component
 * SRP: Display SMS balance with progress bar ONLY
 */

import React from "react";
import { View, StyleSheet } from "react-native";
import { Card, Text, Badge, ProgressBar } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "@src/constants/Colors";
import { Fonts } from "@src/constants/Fonts";

interface SMSBalanceCardProps {
  balance: {
    totalUnits: number;
    percentageUsed: number;
    status: "success" | "warning" | "danger";
  };
}

export const SMSBalanceCard: React.FC<SMSBalanceCardProps> = ({ balance }) => (
  <Card style={styles.card}>
    <View style={styles.header}>
      <MaterialIcons name="sms" size={24} color={COLORS.blue} />
      <Text style={styles.title}>SMS Balance</Text>
      <Badge style={[styles.badge, { backgroundColor: COLORS[balance.status] || COLORS.success }]}>
        {balance.status === "success" ? "Good" : balance.status === "warning" ? "Low" : "Critical"}
      </Badge>
    </View>
    <ProgressBar
      progress={balance.percentageUsed}
      color={COLORS[balance.status] || COLORS.success}
      style={styles.progressBar}
    />
    <View style={styles.footer}>
      <Text style={styles.remaining}>{balance.totalUnits} SMS remaining</Text>
      <Text style={styles.percentage}>{Math.round(balance.percentageUsed * 100)}% used</Text>
    </View>
  </Card>
);

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
    padding: 16,
    borderRadius: 12,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    color: COLORS.DarkGrey,
    marginLeft: 8,
    flex: 1,
  },
  badge: {
    alignSelf: "flex-start",
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    backgroundColor: "#E0E0E0",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  remaining: {
    fontSize: 12,
    fontFamily: Fonts.regular,
    color: COLORS.grey,
  },
  percentage: {
    fontSize: 12,
    fontFamily: Fonts.bold,
    color: COLORS.DarkGrey,
  },
});

export default SMSBalanceCard;
