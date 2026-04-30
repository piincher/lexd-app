import React, { useMemo } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card, Divider } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { productType } from '@src/shared/types/order';
import { useAppTheme } from "@src/providers/ThemeProvider";

interface OrderShippingCardProps {
   order: productType;
}

const formatDate = (dateStr?: string): string => {
   if (!dateStr) return "N/A";
   const d = new Date(dateStr);
   if (isNaN(d.getTime())) return "N/A";
   return d.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
   });
};

const InfoRow = ({
   icon,
   label,
   value,
   optional,
}: {
   icon: string;
   label: string;
   value?: string | null;
   optional?: boolean;
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
               maxWidth: "50%",
               textAlign: "right",
            },
            divider: {
               backgroundColor: colors.border,
            },
         }),
      [colors]
   );

   if (optional && !value) return null;
   return (
      <>
         <View style={styles.row}>
            <View style={styles.rowLeft}>
               <MaterialCommunityIcons name={icon as any} size={18} color={colors.text.secondary} />
               <Text style={styles.label}>{label}</Text>
            </View>
            <Text style={styles.value} numberOfLines={1}>
               {value || "—"}
            </Text>
         </View>
         <Divider style={styles.divider} />
      </>
   );
};

export const OrderShippingCard: React.FC<OrderShippingCardProps> = ({ order }) => {
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
         }),
      [colors]
   );

   return (
      <Card style={styles.card}>
         <View style={styles.header}>
            <MaterialCommunityIcons name="truck-fast" size={20} color={colors.status.success} />
            <Text style={styles.headerTitle}>Expédition</Text>
         </View>
         <Card.Content>
            <InfoRow
               icon="map-marker-outline"
               label="Origine"
               value="Chine"
            />
            <InfoRow
               icon="map-marker-check"
               label="Destination"
               value="Bamako, Mali"
            />
            <InfoRow
               icon="progress-check"
               label="Statut actuel"
               value={order.currentStatus || "Commande passée"}
            />
            <InfoRow
               icon="map-marker"
               label="Position"
               value={
                  order.currentPosition?.coordinates?.[
                     order.currentPosition.coordinates.length - 1
                  ]?.location
               }
               optional
            />
            <InfoRow
               icon="calendar-arrow-right"
               label="Date de départ"
               value={order.departureDate ? formatDate(order.departureDate) : null}
               optional
            />
            <InfoRow
               icon="calendar-check"
               label="Date de réception"
               value={(order.dateOfReceipt || order.dateOfReception) ? formatDate(order.dateOfReceipt || order.dateOfReception) : null}
               optional
            />
            <InfoRow
               icon="update"
               label="Dernière mise à jour"
               value={formatDate(order.updatedAt)}
            />
         </Card.Content>
      </Card>
   );
};
