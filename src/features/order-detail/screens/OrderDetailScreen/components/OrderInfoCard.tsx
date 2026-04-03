import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Card, Divider } from "react-native-paper";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { productType } from "@src/api/order";
import { COLORS } from "@src/constants/Colors";

interface OrderInfoCardProps {
   order: productType;
   onCopyCode?: () => void;
}

const InfoRow = ({
   icon,
   label,
   value,
   trailing,
   optional,
}: {
   icon: string;
   label: string;
   value?: string | null;
   trailing?: React.ReactNode;
   optional?: boolean;
}) => {
   if (optional && !value && !trailing) return null;
   return (
      <>
         <View style={styles.row}>
            <View style={styles.rowLeft}>
               <MaterialCommunityIcons name={icon as any} size={18} color="#6B7280" />
               <Text style={styles.label}>{label}</Text>
            </View>
            {trailing || (
               <Text style={styles.value} numberOfLines={1}>
                  {value || "—"}
               </Text>
            )}
         </View>
         <Divider style={styles.divider} />
      </>
   );
};

export const OrderInfoCard: React.FC<OrderInfoCardProps> = ({
   order,
   onCopyCode,
}) => (
   <Card style={styles.card}>
      <View style={styles.header}>
         <MaterialCommunityIcons name="information" size={20} color={COLORS.green} />
         <Text style={styles.headerTitle}>Informations</Text>
      </View>
      <Card.Content>
         <InfoRow
            icon="pound-box"
            label="N° de suivi"
            trailing={
               <Pressable onPress={onCopyCode} style={styles.codeRow}>
                  <Text style={styles.codeText}>{order.code || "N/A"}</Text>
                  <Feather name="copy" size={14} color={COLORS.green} />
               </Pressable>
            }
         />
         <InfoRow icon="account" label="Client" value={order.clientName} />
         <InfoRow icon="phone" label="Téléphone" value={order.clientPhone} />
         <InfoRow
            icon="shape"
            label="Catégorie"
            value={order.category?.name || order.typeOfPackage}
            optional
         />
         <InfoRow
            icon="truck-delivery"
            label="Transporteur"
            value={order.contenairNumber || order.partenaire}
         />
      </Card.Content>
   </Card>
);

const styles = StyleSheet.create({
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
      color: "#1F2937",
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
      color: "#6B7280",
   },
   value: {
      fontSize: 14,
      fontWeight: "600",
      color: "#1F2937",
      maxWidth: "50%",
      textAlign: "right",
   },
   divider: {
      backgroundColor: "#F3F4F6",
   },
   codeRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
   },
   codeText: {
      fontSize: 14,
      fontWeight: "700",
      color: COLORS.green,
   },
});
