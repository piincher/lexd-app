import React, { useMemo } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card, Chip, Divider } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { productType } from '@src/shared/types/order';
import { Fonts } from "@src/constants/Fonts";
import { useAppTheme } from "@src/providers/ThemeProvider";

interface OrderPaymentCardProps {
   order: productType;
}

const formatCurrency = (amount?: number | null): string =>
   `${(amount ?? 0).toLocaleString("fr-FR")} FCFA`;

const parsePrice = (value: unknown): number => {
   if (value === null || value === undefined || value === '') return 0;
   const num = parseFloat(String(value));
   return isNaN(num) ? 0 : num;
};

const parseCBM = (value: unknown): string => {
   if (value === null || value === undefined || value === '' || value === '0') return '';
   return String(value);
};

const InfoRow = ({
   icon,
   label,
   value,
   valueColor,
}: {
   icon: string;
   label: string;
   value: string;
   valueColor?: string;
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
            <Text style={[styles.value, valueColor ? { color: valueColor } : undefined]}>
               {value}
            </Text>
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

   const isAir = order.shippingMode?.toLowerCase() === "air";

   // Compute total from populated goodsIds as fallback
   const goodsTotal = (order.goodsIds && Array.isArray(order.goodsIds))
      ? order.goodsIds.reduce((sum: number, g: unknown) => {
         if (typeof g === 'object' && g !== null && 'totalCost' in g) {
            const costVal = (g as { totalCost?: unknown }).totalCost;
            return sum + (parseFloat(String(costVal || 0)) || 0);
         }
         return sum;
      }, 0)
      : 0;
   const totalPrice = parsePrice(order.calculatedTotal)
      || parsePrice(order.priceTotal)
      || parsePrice(order.totalCost)
      || goodsTotal;

   // Get payment info from API (same logic as admin PaymentSection)
   const paidAmount = parsePrice(order.paidAmount);
   const balanceDue = parsePrice(order.balanceDue) || Math.max(0, totalPrice - paidAmount);

   // Determine payment status from amount data (more reliable than string status)
   let paymentStatus: 'UNPAID' | 'PARTIAL' | 'PAID' = 'UNPAID';
   if (totalPrice > 0 && (balanceDue <= 0 || paidAmount >= totalPrice)) {
      paymentStatus = 'PAID';
   } else if (paidAmount > 0 && totalPrice > 0) {
      paymentStatus = 'PARTIAL';
   }

   // Also check the string paymentStatus as fallback
   const apiStatus = (order.paymentStatus || '').toUpperCase();
   if (apiStatus === 'PAID' || apiStatus === 'FULLYPAID') {
      paymentStatus = 'PAID';
   } else if (apiStatus === 'PARTIAL' || apiStatus === 'PARTIALLYPAID') {
      paymentStatus = 'PARTIAL';
   }

   const statusConfig = {
      PAID: { label: 'Payé', color: colors.status.success },
      PARTIAL: { label: 'Partiellement payé', color: colors.status.warning },
      UNPAID: { label: 'Non payé', color: colors.status.error },
   };

   const paymentLabel = statusConfig[paymentStatus].label;
   const paymentColor = statusConfig[paymentStatus].color;

   // CBM resolution: packageCBM → calculatedCBM → goods array → N/A
   let cbmValue = parseCBM(order.packageCBM) || parseCBM(order.calculatedCBM);
   if (!cbmValue && order.goodsIds && Array.isArray(order.goodsIds)) {
      const totalGoodsCBM = order.goodsIds.reduce((sum: number, g: unknown) => {
         if (typeof g === 'object' && g !== null && 'cbm' in g) {
            const cbmVal = (g as { cbm?: unknown }).cbm;
            return sum + (parseFloat(String(cbmVal)) || 0);
         }
         return sum;
      }, 0);
      if (totalGoodsCBM > 0) cbmValue = totalGoodsCBM.toFixed(4);
   }

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
                  style={{ backgroundColor: paymentColor + '20' }}
                  textStyle={{
                     color: paymentColor,
                     fontFamily: Fonts.bold || undefined,
                     fontSize: 12,
                  }}
                  compact
               >
                  {paymentLabel}
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
                     value={cbmValue ? `${cbmValue} m³` : "N/A"}
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

            {/* Total Order Amount */}
            <InfoRow
               icon="cash-register"
               label="Total commande"
               value={totalPrice > 0 ? formatCurrency(totalPrice) : "Non défini"}
            />

            {/* Amount Paid */}
            {paidAmount > 0 && (
               <InfoRow
                  icon="cash-check"
                  label="Montant payé"
                  value={formatCurrency(paidAmount)}
                  valueColor={colors.status.success}
               />
            )}

            {/* Balance Due */}
            {paymentStatus !== 'PAID' && balanceDue > 0 && (
               <InfoRow
                  icon="cash-remove"
                  label="Reste à payer"
                  value={formatCurrency(balanceDue)}
                  valueColor={colors.status.error}
               />
            )}

            {/* Total / Final row */}
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
