import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { RADIUS, HAIRLINE } from "@src/shared/ui/designLanguage";
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
   // Sea runs brand green, air runs amber — the same mode coding used on the
   // home service cards and the dashboard shipment card.
   const modeColor = isSeaShipping ? colors.primary.main : colors.accent.amber;

   return (
      <View style={styles.topRow}>
         <View style={[styles.iconBox, { backgroundColor: `${modeColor}14` }]}>
            <MaterialCommunityIcons
               name={isSeaShipping ? "ferry" : "airplane"}
               size={20}
               color={modeColor}
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
      borderRadius: RADIUS.control,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 10,
   },
   topInfo: {
      flex: 1,
      marginRight: 8,
   },
   // Order codes are reference numbers — tracked so they read as a document
   // identifier rather than a title.
   orderCode: {
      fontSize: 15,
      fontWeight: "700",
      letterSpacing: 0.4,
   },
   metaRow: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 3,
      gap: 5,
   },
   metaText: {
      fontSize: 11,
   },
   // Hairline rule separator instead of a bullet dot.
   metaDot: {
      width: HAIRLINE,
      height: 9,
   },
   statusBadge: {
      paddingHorizontal: 7,
      paddingVertical: 3,
      borderRadius: RADIUS.badge,
   },
   statusText: {
      fontSize: 10,
      fontWeight: "700",
      letterSpacing: 0.6,
      textTransform: "uppercase",
   },
   chevron: {
      marginLeft: 6,
   },
});
