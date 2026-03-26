/**
 * OutstandingPaymentsCard - Outstanding payments summary card
 * SRP: Display outstanding payment summary with status counts ONLY
 */

import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Text, Card, Badge } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "@src/constants/Colors";
import { Fonts } from "@src/constants/Fonts";
import { styles } from "./OutstandingPaymentsCard.styles";

interface OutstandingPaymentsCardProps {
  totalOutstanding: number;
  counts: { UNPAID: number; PARTIAL: number; PAID: number };
  onPress: () => void;
}

const CRITICAL_THRESHOLD = 1_000_000; // 1M FCFA

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "XAF",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const OutstandingPaymentsCard: React.FC<OutstandingPaymentsCardProps> = ({
  totalOutstanding,
  counts,
  onPress,
}) => {
  const isCritical = totalOutstanding > CRITICAL_THRESHOLD;
  const accentColor = isCritical ? COLORS.danger : COLORS.green;

  const statusConfig = [
    { key: "UNPAID" as const, label: "Unpaid", icon: "warning", color: COLORS.danger },
    { key: "PARTIAL" as const, label: "Partial", icon: "timelapse", color: COLORS.yellow },
    { key: "PAID" as const, label: "Paid", icon: "check-circle", color: COLORS.success },
  ];

  return (
    <Card style={styles.card}>
      <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
        {/* Header */}
        <View style={styles.header}>
          <View style={[styles.iconContainer, { backgroundColor: accentColor + "20" }]}>
            <MaterialIcons name="attach-money" size={24} color={accentColor} />
          </View>
          <Text style={styles.title}>Outstanding Payments</Text>
          {isCritical && (
            <Badge style={[styles.criticalBadge, { backgroundColor: COLORS.danger }]}>
              Critical
            </Badge>
          )}
        </View>

        {/* Total Amount */}
        <View style={styles.amountContainer}>
          <Text style={[styles.amount, { color: accentColor }]}>
            {formatCurrency(totalOutstanding)}
          </Text>
          <Text style={styles.amountLabel}>Total Outstanding</Text>
        </View>

        {/* Status Counts */}
        <View style={styles.statusContainer}>
          {statusConfig.map((status) => (
            <View key={status.key} style={styles.statusItem}>
              <View style={[styles.statusIconContainer, { backgroundColor: status.color + "15" }]}>
                <MaterialIcons name={status.icon as any} size={16} color={status.color} />
              </View>
              <Text style={styles.statusCount}>{counts[status.key]}</Text>
              <Text style={[styles.statusLabel, { color: status.color }]}>
                {status.label}
              </Text>
            </View>
          ))}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Tap to view details</Text>
          <MaterialIcons name="chevron-right" size={20} color={COLORS.grey} />
        </View>
      </TouchableOpacity>
    </Card>
  );
};

export default OutstandingPaymentsCard;
