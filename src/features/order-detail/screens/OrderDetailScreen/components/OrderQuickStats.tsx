import React, { useMemo } from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { productType } from '@src/shared/types/order';
import { useAppTheme } from "@src/providers/ThemeProvider";

interface OrderQuickStatsProps {
   order: productType;
}

const StatBox = ({
   icon,
   value,
   label,
}: {
   icon: string;
   value: string;
   label: string;
}) => {
   const { colors } = useAppTheme();

   const styles = useMemo(
      () =>
         StyleSheet.create({
            statBox: {
               flex: 1,
               alignItems: "center",
               gap: 4,
            },
            statValue: {
               fontSize: 16,
               fontWeight: "700",
               color: colors.text.primary,
            },
            statLabel: {
               fontSize: 11,
               color: colors.text.secondary,
            },
         }),
      [colors]
   );

   return (
      <View style={styles.statBox}>
         <MaterialCommunityIcons name={icon as any} size={22} color={colors.status.success} />
         <Text style={styles.statValue}>{value}</Text>
         <Text style={styles.statLabel}>{label}</Text>
      </View>
   );
};

export const OrderQuickStats: React.FC<OrderQuickStatsProps> = ({ order }) => {
   const { colors } = useAppTheme();

   const styles = useMemo(
      () =>
         StyleSheet.create({
            container: {
               flexDirection: "row",
               marginHorizontal: 16,
               marginTop: 16,
               backgroundColor: colors.background.card,
               borderRadius: 14,
               paddingVertical: 16,
               shadowColor: colors.neutral[900],
               shadowOffset: { width: 0, height: 1 },
               shadowOpacity: 0.05,
               shadowRadius: 4,
               elevation: 2,
            },
            divider: {
               width: 1,
               backgroundColor: colors.border,
            },
         }),
      [colors]
   );

   return (
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
            value={
               order.packageCBM
                  ? `${order.packageCBM}`
                  : order.calculatedCBM
                     ? `${order.calculatedCBM}`
                     : "--"
            }
            label="CBM (m³)"
         />
         <View style={styles.divider} />
         <StatBox
            icon={order.shippingMode?.toLowerCase() === 'air' ? 'airplane' : 'ferry'}
            value={order.shippingMode?.toLowerCase() === 'air' ? 'Aérien' : 'Maritime'}
            label="Mode"
         />
      </View>
   );
};
