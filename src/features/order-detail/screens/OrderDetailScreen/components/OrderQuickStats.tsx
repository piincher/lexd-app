import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { productType } from "@src/api/order";
import { COLORS } from "@src/constants/Colors";

interface OrderQuickStatsProps {
   order: productType;
}

export const OrderQuickStats: React.FC<OrderQuickStatsProps> = ({ order }) => (
   <View style={styles.container}>
      <StatBox
         icon="package-variant-closed"
         value={String(order.quantity ?? 0)}
         label="Colis"
      />
      <View style={styles.divider} />
      <StatBox
         icon="weight"
         value={order.packageWeight ? `${order.packageWeight} kg` : "--"}
         label="Poids"
      />
      <View style={styles.divider} />
      <StatBox
         icon="cube-outline"
         value={order.packageCBM ? `${order.packageCBM}` : "--"}
         label="CBM (m³)"
      />
   </View>
);

const StatBox = ({
   icon,
   value,
   label,
}: {
   icon: string;
   value: string;
   label: string;
}) => (
   <View style={styles.statBox}>
      <MaterialCommunityIcons name={icon as any} size={22} color={COLORS.green} />
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
   </View>
);

const styles = StyleSheet.create({
   container: {
      flexDirection: "row",
      marginHorizontal: 16,
      marginTop: 16,
      backgroundColor: "#FFFFFF",
      borderRadius: 14,
      paddingVertical: 16,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 2,
   },
   statBox: {
      flex: 1,
      alignItems: "center",
      gap: 4,
   },
   statValue: {
      fontSize: 16,
      fontWeight: "700",
      color: "#1F2937",
   },
   statLabel: {
      fontSize: 11,
      color: "#6B7280",
   },
   divider: {
      width: 1,
      backgroundColor: "#E5E7EB",
   },
});
