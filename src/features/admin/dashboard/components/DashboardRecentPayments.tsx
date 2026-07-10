/**
 * DashboardRecentPayments - Recent payment list for the admin dashboard
 * Shows the latest incoming payments with customer, method, date, and amount.
 */

import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { formatCurrency } from "@src/shared/lib/currency";
import { formatDateTime } from "@src/shared/lib/formatters";
import type { RecentPayment } from "@src/shared/types/adminDashboard";

export interface DashboardRecentPaymentsProps {
  payments: RecentPayment[];
}

export const DashboardRecentPayments: React.FC<DashboardRecentPaymentsProps> = ({ payments }) => {
  const { colors } = useAppTheme();
  const displayPayments = payments.slice(0, 5);

  if (displayPayments.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={[styles.emptyText, { color: colors.text.secondary }]}>
          Aucun paiement récent
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.list}>
      {displayPayments.map((payment) => (
        <View key={payment.paymentId} style={styles.row}>
          <View style={[styles.iconCircle, { backgroundColor: colors.feedback.successBg }]}>
            <Ionicons name="cash-outline" size={16} color={colors.feedback.successDark} />
          </View>
          <View style={styles.info}>
            <Text style={[styles.customer, { color: colors.text.primary }]} numberOfLines={1}>
              {payment.customer.name}
            </Text>
            <Text style={[styles.meta, { color: colors.text.secondary }]}>
              {formatDateTime(payment.paidAt)} · {payment.paymentMethod}
            </Text>
          </View>
          <Text style={[styles.amount, { color: colors.status.success }]}>
            {formatCurrency(payment.amountFCFA)}
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  list: {},
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  iconCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  customer: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 2,
  },
  meta: {
    fontSize: 12,
  },
  amount: {
    fontSize: 14,
    fontWeight: "700",
    marginLeft: 8,
  },
  empty: {
    paddingVertical: 16,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 14,
  },
});

export default DashboardRecentPayments;
