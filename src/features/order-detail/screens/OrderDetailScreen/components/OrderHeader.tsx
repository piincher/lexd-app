import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { productType } from "@src/api/order";

const STATUS_MAP: Record<string, { label: string; color: string; bg: string }> = {
   Active: { label: "En cours", color: "#1B365D", bg: "#E8EEF4" },
   "In Transit": { label: "En transit", color: "#2D8FDB", bg: "#E8F4FD" },
   Delivered: { label: "Livré", color: "#1AAE7E", bg: "#E6F7F1" },
   Inactive: { label: "En attente", color: "#8E99A4", bg: "#F0F2F4" },
};

const SHIPPING_MAP: Record<string, { label: string; icon: "airplane" | "ferry"; color: string; bg: string }> = {
   air: { label: "Aérien", icon: "airplane", color: "#3F51B5", bg: "#E8EAF6" },
   sea: { label: "Maritime", icon: "ferry", color: "#0277BD", bg: "#E1F5FE" },
};

interface OrderHeaderProps {
   order: productType;
}

export const OrderHeader: React.FC<OrderHeaderProps> = ({ order }) => {
   const status = STATUS_MAP[order.status || ""] || STATUS_MAP.Inactive;
   const shipping = SHIPPING_MAP[order.shippingMode || "sea"] || SHIPPING_MAP.sea;

   return (
      <View style={styles.container}>
         <View style={styles.row}>
            <View style={[styles.badge, { backgroundColor: status.bg }]}>
               <Text style={[styles.badgeText, { color: status.color }]}>
                  {status.label}
               </Text>
            </View>
            <View style={[styles.badge, { backgroundColor: shipping.bg }]}>
               <MaterialCommunityIcons
                  name={shipping.icon}
                  size={14}
                  color={shipping.color}
               />
               <Text style={[styles.badgeText, { color: shipping.color }]}>
                  {shipping.label}
               </Text>
            </View>
         </View>
         <Text style={styles.date}>
            {order.createdAt
               ? new Date(order.createdAt).toLocaleDateString("fr-FR", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                 })
               : ""}
         </Text>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingVertical: 12,
   },
   row: { flexDirection: "row", gap: 8 },
   badge: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 8,
   },
   badgeText: { fontSize: 12, fontWeight: "600" },
   date: { fontSize: 12, color: "#6B7280" },
});
