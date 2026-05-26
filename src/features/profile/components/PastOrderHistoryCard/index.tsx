import React from "react";
import { Pressable, View } from "react-native";
import { Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { formatCurrency } from "@src/shared/lib/currency";
import type { productType } from "@src/shared/types/order";
import { getOrderAmount, isOrderPaid } from "../../hooks/pastOrdersTransforms";
import { createStyles } from "./PastOrderHistoryCard.styles";

interface PastOrderHistoryCardProps {
  order: productType;
  onPress: (order: productType) => void;
}

const getModeMeta = (mode?: string) => {
  const normalized = mode?.toLowerCase();
  if (normalized === "air") return { label: "Aérien", icon: "airplane" as const };
  if (normalized === "sea") return { label: "Maritime", icon: "ferry" as const };
  return { label: "Expédition", icon: "truck-delivery-outline" as const };
};

const formatDateLabel = (date?: string) => {
  if (!date) return "Date non précisée";
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return "Date non précisée";
  return parsed.toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" });
};

export const PastOrderHistoryCard: React.FC<PastOrderHistoryCardProps> = ({ order, onPress }) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);
  const mode = getModeMeta(order.shippingMode);
  const paid = isOrderPaid(order);
  const code = order.code || order.orderId || "Sans code";
  const amount = getOrderAmount(order);

  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      onPress={() => onPress(order)}
      accessibilityRole="button"
      accessibilityLabel={`Voir les details de l'expedition ${code}`}
    >
      <View style={styles.topRow}>
        <View style={styles.modePill}>
          <MaterialCommunityIcons name={mode.icon} size={16} color={colors.primary.main} />
          <Text style={styles.modeText}>{mode.label}</Text>
        </View>
        <View style={[styles.paymentPill, paid ? styles.paymentPaid : styles.paymentOpen]}>
          <Text style={[styles.paymentText, paid ? styles.paymentPaidText : styles.paymentOpenText]}>
            {paid ? "Payé" : "À solder"}
          </Text>
        </View>
      </View>

      <View style={styles.mainRow}>
        <View style={styles.titleBlock}>
          <Text style={styles.code} numberOfLines={1}>{code}</Text>
          <Text style={styles.destination} numberOfLines={1}>
            {order.destinationCountry || order.partenaire || "Destination à confirmer"}
          </Text>
        </View>
        <MaterialCommunityIcons name="chevron-right" size={24} color={colors.text.disabled} />
      </View>

      <View style={styles.detailRail}>
        <View style={styles.detailItem}>
          <Text style={styles.detailValue}>{formatDateLabel(order.updatedAt || order.departureDate)}</Text>
          <Text style={styles.detailLabel}>dernière activité</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailValue}>{order.quantity ?? 0}</Text>
          <Text style={styles.detailLabel}>colis</Text>
        </View>
        <View style={styles.detailItemWide}>
          <Text style={styles.detailValue} numberOfLines={1}>{formatCurrency(amount)}</Text>
          <Text style={styles.detailLabel}>montant</Text>
        </View>
      </View>
    </Pressable>
  );
};
