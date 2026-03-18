import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { Text, Card, Chip } from "react-native-paper";
import { COLORS } from "@src/constants/Colors";

interface ManualOrderCardProps {
  order: {
    _id: string;
    code: string;
    clientName: string;
    clientPhone?: string;
    manualOrderStatus: "PREBOOKING" | "AWAITING_GOODS" | "LINKED";
    estimatedCbm: number;
    shippingMode: "air" | "sea";
    createdAt: string;
  };
  selected?: boolean;
  onPress?: () => void;
}

export const ManualOrderCard: React.FC<ManualOrderCardProps> = ({
  order,
  selected,
  onPress,
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "PREBOOKING":
        return COLORS.orange || "#FF9800";
      case "AWAITING_GOODS":
        return COLORS.blue;
      case "LINKED":
        return COLORS.green || "#4CAF50";
      default:
        return COLORS.grey;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "PREBOOKING":
        return "Pré-réservation";
      case "AWAITING_GOODS":
        return "En attente";
      case "LINKED":
        return "Lié";
      default:
        return status;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR");
  };

  return (
    <Pressable onPress={onPress}>
      <Card
        style={[
          styles.card,
          selected && styles.cardSelected,
        ]}
      >
        <Card.Content>
          <View style={styles.header}>
            <Text style={styles.code}>{order.code}</Text>
            <Chip
              style={{ backgroundColor: getStatusColor(order.manualOrderStatus) + "20" }}
              textStyle={{ color: getStatusColor(order.manualOrderStatus) }}
            >
              {getStatusLabel(order.manualOrderStatus)}
            </Chip>
          </View>

          <Text style={styles.clientName}>{order.clientName}</Text>
          {order.clientPhone && (
            <Text style={styles.phone}>📞 {order.clientPhone}</Text>
          )}

          <View style={styles.footer}>
            <Text style={styles.meta}>
              {order.shippingMode === "air" ? "✈️" : "🚢"} {order.estimatedCbm > 0 ? `${order.estimatedCbm} CBM` : "N/A"}
            </Text>
            <Text style={styles.date}>{formatDate(order.createdAt)}</Text>
          </View>
        </Card.Content>
      </Card>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 8,
    backgroundColor: COLORS.white,
  },
  cardSelected: {
    borderWidth: 2,
    borderColor: COLORS.blue,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  code: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.black,
  },
  clientName: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
  },
  phone: {
    fontSize: 14,
    color: COLORS.grey,
    marginBottom: 8,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGrey,
  },
  meta: {
    fontSize: 14,
    color: COLORS.darkGrey,
  },
  date: {
    fontSize: 12,
    color: COLORS.grey,
  },
});
