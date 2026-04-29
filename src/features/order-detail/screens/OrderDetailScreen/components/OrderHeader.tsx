import React, { useMemo } from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { productType } from "@src/features/orders/api";
import { useAppTheme } from "@src/providers/ThemeProvider";

const STATUS_MAP: Record<string, { label: string; color: string }> = {
   Active: { label: "En cours", color: "#1B365D" },
   "In Transit": { label: "En transit", color: "#2D8FDB" },
   Delivered: { label: "Livré", color: "#1AAE7E" },
   Inactive: { label: "En attente", color: "#8E99A4" },
};

const SHIPPING_MAP: Record<string, { label: string; icon: "airplane" | "ferry"; color: string }> = {
   air: { label: "Aérien", icon: "airplane", color: "#3F51B5" },
   sea: { label: "Maritime", icon: "ferry", color: "#0277BD" },
};

interface OrderHeaderProps {
   order: productType;
}

export const OrderHeader: React.FC<OrderHeaderProps> = ({ order }) => {
   const { colors } = useAppTheme();

   const styles = useMemo(
      () =>
         StyleSheet.create({
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
            date: { fontSize: 12, color: colors.text.secondary },
         }),
      [colors]
   );

   const status = STATUS_MAP[order.status || ""] || STATUS_MAP.Inactive;
   const shipping = SHIPPING_MAP[order.shippingMode || "sea"] || SHIPPING_MAP.sea;

   return (
      <View style={styles.container}>
         <View style={styles.row}>
            <View style={[styles.badge, { backgroundColor: status.color + '20' }]}>
               <Text style={[styles.badgeText, { color: status.color }]}>
                  {status.label}
               </Text>
            </View>
            <View style={[styles.badge, { backgroundColor: shipping.color + '20' }]}>
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
