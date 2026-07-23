import React, { useMemo } from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { productType } from '@src/shared/types/order';
import { useAppTheme } from "@src/providers/ThemeProvider";
import { RADIUS, HAIRLINE } from "@src/shared/ui/designLanguage";

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
               fontSize: 9,
               fontWeight: "700",
               letterSpacing: 0.6,
               textTransform: "uppercase",
               color: colors.text.muted,
            },
         }),
      [colors]
   );

   return (
      <View style={styles.statBox}>
         {/* Brand green: these are figures, not success states. */}
         <MaterialCommunityIcons name={icon as any} size={21} color={colors.primary.main} />
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
            // Manifest-style figure strip: bordered, unshadowed.
            container: {
               flexDirection: "row",
               marginHorizontal: 16,
               marginTop: 16,
               backgroundColor: colors.background.card,
               borderRadius: RADIUS.card,
               borderWidth: HAIRLINE,
               borderColor: colors.border,
               paddingVertical: 16,
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
