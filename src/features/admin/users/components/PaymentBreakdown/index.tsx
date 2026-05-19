import React, { useMemo } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInUp } from "react-native-reanimated";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { productType } from "@src/shared/types/order";

interface PaymentBreakdownProps {
  orders: productType[];
}

export const PaymentBreakdown: React.FC<PaymentBreakdownProps> = ({ orders }) => {
  const { colors } = useAppTheme();

  const stats = useMemo(() => {
    let paid = 0, partial = 0, unpaid = 0, totalDue = 0, totalPaid = 0;
    orders.forEach((o) => {
      const status = o.paymentStatus?.toUpperCase();
      if (status === "PAID" || status === "Paid") paid++;
      else if (status === "PARTIAL") partial++;
      else unpaid++;

      const price = parseFloat(o.priceTotal?.toString() || "0") || 0;
      totalDue += price;
    });
    return { paid, partial, unpaid, totalDue, totalPaid };
  }, [orders]);

  if (orders.length === 0) return null;

  const total = stats.paid + stats.partial + stats.unpaid;
  const paidPct = total > 0 ? (stats.paid / total) * 100 : 0;
  const partialPct = total > 0 ? (stats.partial / total) * 100 : 0;
  const unpaidPct = total > 0 ? (stats.unpaid / total) * 100 : 0;

  return (
    <Animated.View entering={FadeInUp.delay(525)} style={[styles.card, { backgroundColor: colors.background.card, shadowColor: colors.neutral[900] }]}>
      <Text style={[styles.title, { color: colors.text.primary }]}>Statut des Paiements</Text>

      <View style={styles.barContainer}>
        <View style={[styles.barSegment, { width: `${paidPct}%`, backgroundColor: colors.status.success }]} />
        <View style={[styles.barSegment, { width: `${partialPct}%`, backgroundColor: colors.status.warning }]} />
        <View style={[styles.barSegment, { width: `${unpaidPct}%`, backgroundColor: colors.status.error }]} />
      </View>

      <View style={styles.legend}>
        <LegendItem icon="checkmark-circle" label="Payé" value={stats.paid} color={colors.status.success} />
        <LegendItem icon="remove-circle-outline" label="Partiel" value={stats.partial} color={colors.status.warning} />
        <LegendItem icon="close-circle-outline" label="Impayé" value={stats.unpaid} color={colors.status.error} />
      </View>

      <View style={[styles.footer, { borderTopColor: colors.neutral[200] }]}>
        <Text style={[styles.footerLabel, { color: colors.text.secondary }]}>Total dû sur commandes</Text>
        <Text style={[styles.footerValue, { color: colors.text.primary }]}>{stats.totalDue.toLocaleString("fr-FR")} FCFA</Text>
      </View>
    </Animated.View>
  );
};

const LegendItem: React.FC<{ icon: string; label: string; value: number; color: string }> = ({
  icon, label, value, color,
}) => (
  <View style={styles.legendItem}>
    <Ionicons name={icon as any} size={14} color={color} />
    <Text style={[styles.legendText, { color }]}>{value} {label}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 16,
    marginTop: 16,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 16,
  },
  barContainer: {
    flexDirection: "row",
    height: 12,
    borderRadius: 6,
    overflow: "hidden",
    marginBottom: 16,
  },
  barSegment: {
    height: "100%",
  },
  legend: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  legendText: {
    fontSize: 13,
    fontWeight: "600",
  },
  footer: {
    borderTopWidth: 1,
    paddingTop: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerLabel: {
    fontSize: 13,
    fontWeight: "500",
  },
  footerValue: {
    fontSize: 16,
    fontWeight: "800",
  },
});

export default PaymentBreakdown;
