import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { formatShortDate } from "../utils";

interface OrderCardHeaderProps {
   orderCode?: string;
   departureDate?: string;
   quantity?: number;
   shippingMode?: string;
   statusLabel: string;
   statusColor: string;
   statusBg: string;
}

export const OrderCardHeader: React.FC<OrderCardHeaderProps> = ({
   orderCode,
   departureDate,
   quantity,
   shippingMode,
   statusLabel,
   statusColor,
   statusBg,
}) => {
   const { colors } = useAppTheme();
   const isSeaShipping = shippingMode === "sea";

   return (
      <View style={styles.topRow}>
         <View style={[styles.iconBox, { backgroundColor: colors.background.paper }]}>
            <MaterialCommunityIcons
               name={isSeaShipping ? "ferry" : "airplane"}
               size={20}
               color={colors.primary.dark}
            />
         </View>

         <View style={styles.topInfo}>
            <Text
               style={[styles.orderCode, { color: colors.text.primary }]}
               numberOfLines={1}
            >
               {orderCode || "---"}
            </Text>
            <View style={styles.metaRow}>
               <Feather
                  name="calendar"
                  size={12}
                  color={colors.text.disabled}
               />
               <Text style={[styles.metaText, { color: colors.text.secondary }]}>
                  {formatShortDate(departureDate)}
               </Text>
               <View style={[styles.metaDot, { backgroundColor: colors.border }]} />
               <MaterialCommunityIcons
                  name="package-variant"
                  size={12}
                  color={colors.text.disabled}
               />
               <Text style={[styles.metaText, { color: colors.text.secondary }]}>
                  {quantity ?? 1} colis
               </Text>
            </View>
         </View>

         <View style={[styles.statusBadge, { backgroundColor: statusBg }]}>
            <Text style={[styles.statusText, { color: statusColor }]}>
               {statusLabel}
            </Text>
         </View>

         <Feather
            name="chevron-right"
            size={18}
            color={colors.text.disabled}
            style={styles.chevron}
         />
      </View>
   );
};

const styles = StyleSheet.create({
   topRow: {
      flexDirection: "row",
      alignItems: "center",
   },
   iconBox: {
      width: 38,
      height: 38,
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 10,
   },
   topInfo: {
      flex: 1,
      marginRight: 8,
   },
   orderCode: {
      fontSize: 15,
      fontWeight: "700",
   },
   metaRow: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 3,
      gap: 4,
   },
   metaText: {
      fontSize: 11,
   },
   metaDot: {
      width: 3,
      height: 3,
      borderRadius: 1.5,
   },
   statusBadge: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 6,
   },
   statusText: {
      fontSize: 11,
      fontWeight: "600",
   },
   chevron: {
      marginLeft: 6,
   },
});
