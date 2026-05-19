import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInUp } from "react-native-reanimated";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { useNavigation } from "@react-navigation/native";
import type { NavigationProp } from "@react-navigation/native";
import { useClientPayments } from "../../hooks/useClientPayments";

interface ClientPaymentsSectionProps {
  userId: string;
}

const STATUS_LABELS: Record<string, string> = {
  PENDING: "En attente",
  SUCCESS: "Réussi",
  FAILED: "Échoué",
  REFUNDED: "Remboursé",
  CANCELLED: "Annulé",
};

const STATUS_COLORS: Record<string, { bg: string; text: string }> = {
  PENDING: { bg: "#FEF3C7", text: "#D97706" },
  SUCCESS: { bg: "#D1FAE5", text: "#059669" },
  FAILED: { bg: "#FEE2E2", text: "#DC2626" },
  REFUNDED: { bg: "#E0E7FF", text: "#4F46E5" },
  CANCELLED: { bg: "#F3F4F6", text: "#6B7280" },
};

export const ClientPaymentsSection: React.FC<ClientPaymentsSectionProps> = ({ userId }) => {
  const { colors } = useAppTheme();
  const navigation = useNavigation<NavigationProp<any>>();
  const { data, isLoading } = useClientPayments(userId);
  const payments = data?.payments ?? [];

  if (isLoading) {
    return (
      <View style={[styles.card, { backgroundColor: colors.background.card }]}>
        <Text style={[styles.title, { color: colors.text.primary }]}>Historique Paiements</Text>
        <Text style={{ color: colors.text.secondary }}>Chargement...</Text>
      </View>
    );
  }

  if (payments.length === 0) return null;

  return (
    <Animated.View entering={FadeInUp.delay(575)} style={[styles.card, { backgroundColor: colors.background.card, shadowColor: colors.neutral[900] }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text.primary }]}>Paiements ({payments.length})</Text>
      </View>

      {payments.slice(0, 3).map((payment: any) => {
        const statusStyle = STATUS_COLORS[payment.status] ?? STATUS_COLORS.CANCELLED;
        return (
          <TouchableOpacity
            key={payment.id}
            onPress={() => navigation.navigate("PaymentDetail", { paymentId: payment.id })}
            style={[styles.paymentRow, { borderBottomColor: colors.neutral[200] }]}
          >
            <View style={styles.paymentLeft}>
              <Text style={[styles.paymentId, { color: colors.text.primary }]} numberOfLines={1}>
                {payment.paymentId}
              </Text>
              <Text style={[styles.paymentMeta, { color: colors.text.secondary }]}>
                {payment.paymentMethod} · {new Date(payment.createdAt).toLocaleDateString("fr-FR")}
              </Text>
            </View>
            <View style={styles.paymentRight}>
              <Text style={[styles.amount, { color: colors.text.primary }]}>
                {payment.amountFCFA.toLocaleString("fr-FR")} FCFA
              </Text>
              <View style={[styles.badge, { backgroundColor: statusStyle.bg }]}>
                <Text style={[styles.badgeText, { color: statusStyle.text }]}>
                  {STATUS_LABELS[payment.status] ?? payment.status}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </Animated.View>
  );
};

const styles = {
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
  header: {
    flexDirection: "row" as const,
    justifyContent: "space-between" as const,
    alignItems: "center" as const,
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "700" as const,
  },
  paymentRow: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    justifyContent: "space-between" as const,
    paddingVertical: 12,
    borderBottomWidth: 1,
    gap: 8,
  },
  paymentLeft: {
    flex: 1,
    gap: 2,
  },
  paymentId: {
    fontSize: 14,
    fontWeight: "600" as const,
  },
  paymentMeta: {
    fontSize: 12,
    fontWeight: "500" as const,
  },
  paymentRight: {
    alignItems: "flex-end" as const,
    gap: 4,
  },
  amount: {
    fontSize: 14,
    fontWeight: "700" as const,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "700" as const,
  },
};

export default ClientPaymentsSection;
