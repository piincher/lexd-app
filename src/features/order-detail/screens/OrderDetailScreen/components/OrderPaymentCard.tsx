import React, { useMemo } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card, Chip, Divider } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { productType } from "@src/api/order";
import { Fonts } from "@src/constants/Fonts";
import { useAppTheme } from "@src/providers/ThemeProvider";

interface OrderPaymentCardProps {
   order: productType;
}

const formatCurrency = (amount?: number | null): string =>
   `${(amount ?? 0).toLocaleString("fr-FR")} FCFA`;

const PAYMENT_COLORS: Record<string, { text: string; label: string }> = {
   Paid: { text: "#2E7D32", label: "Payé" },
   Unpaid: { text: "#C62828", label: "Non payé" },
};

const InfoRow = ({
   icon,
   label,
   value,
}: {
   icon: string;
   label: string;
   value: string;
}) => {
   const { colors } = useAppTheme();

   const styles = useMemo(
      () =>
         StyleSheet.create({
            row: {
               flexDirection: "row",
               justifyContent: "space-between",
               alignItems: "center",
               paddingVertical: 10,
            },
            rowLeft: {
               flexDirection: "row",
               alignItems: "center",
               gap: 8,
            },
            label: {
               fontSize: 13,
               color: colors.text.secondary,
            },
            value: {
               fontSize: 14,
               fontWeight: "600",
               color: colors.text.primary,
            },
            divider: {
               backgroundColor: colors.border,
            },
         }),
      [colors]
   );

   return (
      <>
         <View style={styles.row}>
            <View style={styles.rowLeft}>
               <MaterialCommunityIcons name={icon as any} size={18} color={colors.text.secondary} />
               <Text style={styles.label}>{label}</Text>
            </View>
            <Text style={styles.value}>{value}</Text>
         </View>
         <Divider style={styles.divider} />
      </>
   );
};

export const OrderPaymentCard: React.FC<OrderPaymentCardProps> = ({ order }) => {
   const { colors } = useAppTheme();

   const styles = useMemo(
      () =>
         StyleSheet.create({
            card: {
               marginHorizontal: 16,
               marginTop: 16,
               borderRadius: 14,
               elevation: 2,
            },
            header: {
               flexDirection: "row",
               alignItems: "center",
               gap: 8,
               paddingHorizontal: 16,
               paddingTop: 16,
               paddingBottom: 8,
            },
            headerTitle: {
               fontSize: 16,
               fontWeight: "700",
               color: colors.text.primary,
            },
            row: {
               flexDirection: "row",
               justifyContent: "space-between",
               alignItems: "center",
               paddingVertical: 10,
            },
            rowLeft: {
               flexDirection: "row",
               alignItems: "center",
               gap: 8,
            },
            label: {
               fontSize: 13,
               color: colors.text.secondary,
            },
            value: {
               fontSize: 14,
               fontWeight: "600",
               color: colors.text.primary,
            },
            totalValue: {
               fontSize: 16,
               fontWeight: "800",
               color: colors.text.primary,
            },
            divider: {
               backgroundColor: colors.border,
            },
         }),
      [colors]
   );

   const paymentCfg = PAYMENT_COLORS[order.paymentStatus || ""] || PAYMENT_COLORS.Unpaid;
   const isAir = order.shippingMode === "air";

   // Compute total from populated goodsIds as fallback
   const goodsTotal = (order.goodsIds && Array.isArray(order.goodsIds))
      ? order.goodsIds.reduce((sum: number, g: any) =>
         sum + (typeof g === 'object' ? (parseFloat(String(g?.totalCost || 0)) || 0) : 0), 0)
      : 0;
   const totalPrice = parseFloat(String(order.calculatedTotal || 0))
      || parseFloat(String(order.priceTotal || 0))
      || goodsTotal;

   return (
      <Card style={styles.card}>
         <View style={styles.header}>
            <MaterialCommunityIcons name="cash-multiple" size={20} color={colors.status.success} />
            <Text style={styles.headerTitle}>Paiement</Text>
         </View>
         <Card.Content>
            {/* Payment Status */}
            <View style={styles.row}>
               <View style={styles.rowLeft}>
                  <MaterialCommunityIcons name="credit-card-check" size={18} color={colors.text.secondary} />
                  <Text style={styles.label}>Statut</Text>
               </View>
               <Chip
                  style={{ backgroundColor: paymentCfg.text + '20' }}
                  textStyle={{
                     color: paymentCfg.text,
                     fontFamily: Fonts.bold || undefined,
                     fontSize: 12,
                  }}
                  compact
               >
                  {paymentCfg.label}
               </Chip>
            </View>
            <Divider style={styles.divider} />

            {/* Shipping-specific fields */}
            {isAir ? (
               <>
                  {order.packageWeight ? (
                     <InfoRow
                        icon="weight"
                        label="Poids"
                        value={`${order.packageWeight} kg`}
                     />
                  ) : null}
                  {order.unitPrice ? (
                     <InfoRow
                        icon="tag"
                        label="Prix unitaire"
                        value={`${formatCurrency(order.unitPrice)}/kg`}
                     />
                  ) : null}
               </>
            ) : (
               <>
                  <InfoRow
                     icon="ruler-square"
                     label="CBM"
                     value={order.packageCBM || "N/A"}
                  />
                  {order.unitPrice ? (
                     <InfoRow
                        icon="tag"
                        label="Prix unitaire"
                        value={`${formatCurrency(order.unitPrice)}/m³`}
                     />
                  ) : null}
               </>
            )}

            {/* Total */}
            <View style={styles.row}>
               <View style={styles.rowLeft}>
                  <MaterialCommunityIcons name="cash" size={18} color={colors.text.secondary} />
                  <Text style={styles.label}>Prix total</Text>
               </View>
               <Text style={styles.totalValue}>
                  {totalPrice > 0
                     ? formatCurrency(totalPrice)
                     : "Non défini"}
               </Text>
            </View>
         </Card.Content>
      </Card>
   );
};
