import React from "react";
import { View, Text, Pressable } from "react-native";
import { getStatusColor } from "../utils/statusColors";

interface OrderRowProps {
  order: {
    id: string;
    code: string;
    clientName: string;
    status: string;
    date: string;
  };
  isLast: boolean;
  styles: any;
  onPress: () => void;
}

export const OrderRow: React.FC<OrderRowProps> = ({ order, isLast, styles, onPress }) => {
  const statusColor = getStatusColor(order.status);
  const initials =
    order.clientName
      ?.split(" ")
      .map((n) => n[0])
      .filter(Boolean)
      .slice(0, 2)
      .join("")
      .toUpperCase() || "?";

  const formattedDate = (() => {
    try {
      return new Date(order.date).toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "short",
      });
    } catch {
      return "";
    }
  })();

  return (
    <>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [styles.item, pressed && { opacity: 0.7 }]}
      >
        <View style={[styles.avatar, { backgroundColor: statusColor + "22" }]}>
          <Text style={[styles.avatarText, { color: statusColor }]}>
            {initials}
          </Text>
        </View>
        <View style={styles.middle}>
          <Text style={styles.clientName} numberOfLines={1}>
            {order.clientName}
          </Text>
          <View style={styles.subRow}>
            <Text style={styles.orderCode}>{order.code}</Text>
            {formattedDate ? (
              <>
                <View style={styles.dot} />
                <Text style={styles.date}>{formattedDate}</Text>
              </>
            ) : null}
          </View>
        </View>
        <View
          style={[styles.statusPill, { backgroundColor: statusColor + "22" }]}
        >
          <Text style={[styles.statusText, { color: statusColor }]}>
            {order.status.toLowerCase()}
          </Text>
        </View>
      </Pressable>
      {!isLast && <View style={styles.itemDivider} />}
    </>
  );
};
