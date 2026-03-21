import React, { memo } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { productType } from "@src/api/order";
import { useAppTheme } from "@src/providers";

/**
 * Compact order card for list display.
 * SRP: Only responsible for rendering a single order summary.
 * No API calls, no modals, no heavy sub-components.
 */

interface OrderListCardProps {
   order: productType;
   onPress: () => void;
}

// -- Status helpers --

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
   Active: { label: "En cours", color: "#1B365D", bg: "#E8EEF4" },
   "In Transit": { label: "En transit", color: "#2D8FDB", bg: "#E8F4FD" },
   Delivered: { label: "Livré", color: "#1AAE7E", bg: "#E6F7F1" },
   Inactive: { label: "En attente", color: "#8E99A4", bg: "#F0F2F4" },
   Arrived: { label: "Arrivé", color: "#F59E0B", bg: "#FEF3C7" },
};

type StepIndex = 0 | 1 | 2 | 3 | 4;

const STEP_PROGRESS: Record<StepIndex, number> = {
   0: 5,
   1: 25,
   2: 50,
   3: 75,
   4: 100,
};

const STEP_STATUS_CONFIG: Record<StepIndex, { label: string; color: string; bg: string }> = {
   0: STATUS_CONFIG.Inactive,
   1: STATUS_CONFIG.Active,
   2: STATUS_CONFIG["In Transit"],
   3: STATUS_CONFIG.Arrived,
   4: STATUS_CONFIG.Delivered,
};

// Exact matches against admin STATUS_ORDER keys
const CURRENT_STATUS_MAP: Record<string, StepIndex> = {
   "Order arrived at warehouse": 1,
   "Order in Processing": 1,
   "Order in Transit": 2,
   "Order in Arrived": 3,
   "Delivered": 4,
};

const getStep = (status?: string, currentStatus?: string): StepIndex => {
   if (currentStatus && currentStatus in CURRENT_STATUS_MAP) {
      return CURRENT_STATUS_MAP[currentStatus];
   }
   switch (status) {
      case "Delivered": return 4;
      case "In Transit": return 2;
      case "Active": return 1;
      default: return 0;
   }
};

const formatShortDate = (dateStr?: string): string => {
   if (!dateStr) return "--";
   const date = new Date(dateStr);
   if (isNaN(date.getTime())) return "--";
   return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
   });
};

const OrderListCardInner: React.FC<OrderListCardProps> = ({ order, onPress }) => {
   const { colors } = useAppTheme();
   const step = getStep(order.status, order.currentStatus);
   const statusCfg = STEP_STATUS_CONFIG[step];
   const progress = STEP_PROGRESS[step];
   const isSeaShipping = order.shippingMode === "sea";

   return (
      <Pressable
         onPress={onPress}
         style={({ pressed }) => [
            styles.card,
            {
               backgroundColor: colors.background.card,
               borderColor: colors.border,
               opacity: pressed ? 0.95 : 1,
            },
         ]}
      >
         {/* Row 1: Icon + Code + Status + Chevron */}
         <View style={styles.topRow}>
            <View style={styles.iconBox}>
               <MaterialCommunityIcons
                  name={isSeaShipping ? "ferry" : "airplane"}
                  size={20}
                  color="#1B365D"
               />
            </View>

            <View style={styles.topInfo}>
               <Text
                  style={[styles.orderCode, { color: colors.text.primary }]}
                  numberOfLines={1}
               >
                  {order.code || "---"}
               </Text>
               <View style={styles.metaRow}>
                  <Feather
                     name="calendar"
                     size={12}
                     color={colors.text.disabled}
                  />
                  <Text style={[styles.metaText, { color: colors.text.secondary }]}>
                     {formatShortDate(order.departureDate)}
                  </Text>
                  <View style={styles.metaDot} />
                  <MaterialCommunityIcons
                     name="package-variant"
                     size={12}
                     color={colors.text.disabled}
                  />
                  <Text style={[styles.metaText, { color: colors.text.secondary }]}>
                     {order.quantity ?? 1} colis
                  </Text>
               </View>
            </View>

            <View style={[styles.statusBadge, { backgroundColor: statusCfg.bg }]}>
               <Text style={[styles.statusText, { color: statusCfg.color }]}>
                  {statusCfg.label}
               </Text>
            </View>

            <Feather
               name="chevron-right"
               size={18}
               color={colors.text.disabled}
               style={styles.chevron}
            />
         </View>

         {/* Row 2: Progress bar */}
         <View style={styles.progressRow}>
            <View
               style={[
                  styles.progressTrack,
                  { backgroundColor: colors.border },
               ]}
            >
               <View
                  style={[
                     styles.progressFill,
                     {
                        backgroundColor: statusCfg.color,
                        width: `${progress}%`,
                     },
                  ]}
               />
            </View>
            <Text style={[styles.progressLabel, { color: colors.text.disabled }]}>
               {progress}%
            </Text>
         </View>
      </Pressable>
   );
};

export const OrderListCard = memo(OrderListCardInner);

const styles = StyleSheet.create({
   card: {
      borderRadius: 14,
      borderWidth: 1,
      paddingHorizontal: 14,
      paddingVertical: 12,
      marginBottom: 10,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.04,
      shadowRadius: 4,
      elevation: 2,
   },
   topRow: {
      flexDirection: "row",
      alignItems: "center",
   },
   iconBox: {
      width: 38,
      height: 38,
      borderRadius: 10,
      backgroundColor: "#E8EEF4",
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
      backgroundColor: "#D1D5DB",
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
   progressRow: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 10,
      gap: 8,
   },
   progressTrack: {
      flex: 1,
      height: 4,
      borderRadius: 2,
      overflow: "hidden",
   },
   progressFill: {
      height: "100%",
      borderRadius: 2,
   },
   progressLabel: {
      fontSize: 10,
      fontWeight: "600",
      width: 28,
      textAlign: "right",
   },
});
