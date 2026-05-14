import React, { useMemo } from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { productType } from '@src/shared/types/order';
import { useAppTheme } from "@src/providers/ThemeProvider";

const STATUS_MAP: Record<string, { label: string; colorKey: string }> = {
   Active: { label: "En cours", colorKey: "info" },
   "In Transit": { label: "En transit", colorKey: "info" },
   Delivered: { label: "Livré", colorKey: "success" },
   Inactive: { label: "En attente", colorKey: "disabled" },
};

const SHIPPING_MAP: Record<string, { label: string; icon: "airplane" | "ferry"; colorKey: string }> = {
   air: { label: "Aérien", icon: "airplane", colorKey: "info" },
   sea: { label: "Maritime", icon: "ferry", colorKey: "info" },
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

   const getStatusColor = (key: string) => {
      switch (key) {
         case "success": return colors.status.success;
         case "info": return colors.status.info;
         case "disabled": return colors.text.disabled;
         default: return colors.text.disabled;
      }
   };

   const statusColor = getStatusColor(status.colorKey);
   const shippingColor = getStatusColor(shipping.colorKey);

   return (
      <View style={styles.container}>
         <View style={styles.row}>
            <View style={[styles.badge, { backgroundColor: statusColor + '20' }]}>
               <Text style={[styles.badgeText, { color: statusColor }]}>
                  {status.label}
               </Text>
            </View>
            <View style={[styles.badge, { backgroundColor: shippingColor + '20' }]}>
               <MaterialCommunityIcons
                  name={shipping.icon}
                  size={14}
                  color={shippingColor}
               />
               <Text style={[styles.badgeText, { color: shippingColor }]}>
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
