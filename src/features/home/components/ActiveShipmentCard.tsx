import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers";
import { productType } from "@src/api/order";

// Design colors matching the screenshot
const SHIP_COLORS = {
   navy: "#1B365D",
   navyLight: "#2D5F8B",
   navyBorder: "#A8C4E0",
   grayLight: "#E8ECF0",
   grayText: "#8E99A4",
   progressTrack: "#E5E7EB",
};

type ShipmentStep = 0 | 1 | 2 | 3 | 4;

const STEPS = [
   { label: "Commande passée", icon: "clipboard-check" as const, lib: "mci" as const },
   { label: "Entrepôt", icon: "warehouse" as const, lib: "mci" as const },
   { label: "En transit", icon: "airplane" as const, lib: "mci" as const },
   { label: "Arrivé", icon: "flag-checkered" as const, lib: "mci" as const },
   { label: "Livré", icon: "check" as const, lib: "feather" as const },
];

/**
 * Maps `currentStatus` (granular, set by admin) and `status` (coarse) to a step index.
 *
 * Admin STATUS_ORDER (from OrderStatusTimeline):
 *   "Order arrived at warehouse" → step 1
 *   "Order in Processing"       → step 1
 *   "Order in Transit"          → step 2
 *   "Order in Arrived"          → step 3
 *   "Delivered"                 → step 4
 *
 * Falls back to coarse `status` if `currentStatus` is not set.
 */
const CURRENT_STATUS_MAP: Record<string, ShipmentStep> = {
   "Order arrived at warehouse": 1,
   "Order in Processing": 1,
   "Order in Transit": 2,
   "Order in Arrived": 3,
   "Delivered": 4,
};

const getStepFromStatus = (status?: string, currentStatus?: string): ShipmentStep => {
   // 1. Exact match against admin-defined currentStatus values
   if (currentStatus && currentStatus in CURRENT_STATUS_MAP) {
      return CURRENT_STATUS_MAP[currentStatus];
   }

   // 2. Fallback to coarse status
   switch (status) {
      case "Delivered":
         return 4;
      case "In Transit":
         return 2;
      case "Active":
         return 1;
      default:
         return 0;
   }
};

const BADGE_LABELS: Record<ShipmentStep, string> = {
   0: "En attente",
   1: "En entrepôt",
   2: "En transit",
   3: "Arrivé",
   4: "Livré",
};

const PROGRESS_MAP: Record<ShipmentStep, number> = {
   0: 5,
   1: 25,
   2: 50,
   3: 75,
   4: 100,
};

const formatDate = (dateStr?: string): string => {
   if (!dateStr) return "Non définie";
   const date = new Date(dateStr);
   if (isNaN(date.getTime())) return "Non définie";
   return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
      year: "numeric",
   });
};

interface ActiveShipmentCardProps {
   order: productType;
   onPress?: () => void;
}

export const ActiveShipmentCard: React.FC<ActiveShipmentCardProps> = ({
   order,
   onPress,
}) => {
   const { colors } = useAppTheme();
   const currentStep = getStepFromStatus(order.status, order.currentStatus);
   const progress = PROGRESS_MAP[currentStep];
   const statusText = BADGE_LABELS[currentStep];

   return (
      <Pressable
         style={[
            styles.card,
            {
               backgroundColor: colors.background.card,
               borderColor: colors.border,
            },
         ]}
         onPress={onPress}
      >
         {/* Header row */}
         <View style={styles.headerRow}>
            <View style={styles.headerLeft}>
               <View
                  style={[
                     styles.shipIcon,
                     { backgroundColor: SHIP_COLORS.grayLight },
                  ]}
               >
                  <MaterialCommunityIcons
                     name={order.shippingMode === "air" ? "airplane" : "ferry"}
                     size={24}
                     color={SHIP_COLORS.navy}
                  />
               </View>
               <View style={styles.headerInfo}>
                  <Text
                     style={[
                        styles.orderCode,
                        { color: colors.text.primary },
                     ]}
                  >
                     {order.code || "---"}
                  </Text>
                  <View style={[styles.statusBadge, { backgroundColor: colors.background.paper }]}>
                     <Text style={[styles.statusText, { color: colors.text.secondary }]}>{statusText}</Text>
                  </View>
               </View>
            </View>
            <Feather
               name="chevron-right"
               size={20}
               color={colors.text.secondary}
            />
         </View>

         {/* Route dashed line */}
         <View style={styles.routeLine}>
            <View style={styles.dashContainer}>
               {Array.from({ length: 35 }).map((_, i) => (
                  <View
                     key={i}
                     style={[
                        styles.dash,
                        { backgroundColor: SHIP_COLORS.grayText },
                     ]}
                  />
               ))}
            </View>
            <MaterialCommunityIcons
               name="arrow-right"
               size={20}
               color={SHIP_COLORS.navyLight}
            />
         </View>

         {/* Progress steps */}
         <View style={styles.stepsContainer}>
            {STEPS.map((step, index) => {
               const isCompleted = index < currentStep;
               const isActive = index === currentStep;
               const isInactive = index > currentStep;

               const circleStyle = isActive
                  ? [styles.stepCircle, styles.stepCircleActive]
                  : isCompleted
                  ? [styles.stepCircle, styles.stepCircleCompleted]
                  : [styles.stepCircle, styles.stepCircleInactive];

               const iconColor = isActive || isCompleted ? "#FFFFFF" : SHIP_COLORS.grayText;

               return (
                  <React.Fragment key={index}>
                     {index > 0 && (
                        <View
                           style={[
                              styles.stepLine,
                              {
                                 backgroundColor:
                                    index <= currentStep
                                       ? SHIP_COLORS.navy
                                       : SHIP_COLORS.progressTrack,
                              },
                           ]}
                        />
                     )}
                     <View style={styles.stepItem}>
                        <View style={circleStyle}>
                           {step.lib === "feather" ? (
                              <Feather
                                 name={step.icon}
                                 size={16}
                                 color={iconColor}
                              />
                           ) : (
                              <MaterialCommunityIcons
                                 name={step.icon}
                                 size={16}
                                 color={iconColor}
                              />
                           )}
                        </View>
                        <Text
                           style={[
                              styles.stepLabel,
                              {
                                 color: isActive
                                    ? SHIP_COLORS.navy
                                    : colors.text.secondary,
                                 fontWeight: isActive ? "700" : "400",
                              },
                           ]}
                        >
                           {step.label}
                        </Text>
                     </View>
                  </React.Fragment>
               );
            })}
         </View>

         {/* Progress bar */}
         <View style={styles.progressBarContainer}>
            <View
               style={[
                  styles.progressTrack,
                  { backgroundColor: SHIP_COLORS.progressTrack },
               ]}
            >
               <View
                  style={[
                     styles.progressFill,
                     {
                        backgroundColor: SHIP_COLORS.navy,
                        width: `${progress}%`,
                     },
                  ]}
               />
            </View>
            <Text
               style={[styles.progressText, { color: colors.text.secondary }]}
            >
               {progress}% complété
            </Text>
         </View>

         {/* Bottom info */}
         <View
            style={[
               styles.bottomDivider,
               { borderTopColor: colors.border },
            ]}
         />
         <View style={styles.bottomRow}>
            <View style={styles.bottomItem}>
               <Feather
                  name="calendar"
                  size={16}
                  color={colors.text.secondary}
               />
               <Text
                  style={[
                     styles.bottomText,
                     { color: colors.text.secondary },
                  ]}
               >
                  Arrivée: {formatDate(order.departureDate)}
               </Text>
            </View>
            <View style={styles.bottomItem}>
               <MaterialCommunityIcons
                  name="package-variant"
                  size={16}
                  color={colors.text.secondary}
               />
               <Text
                  style={[
                     styles.bottomText,
                     { color: colors.text.secondary },
                  ]}
               >
                  {order.quantity || 1} articles
               </Text>
            </View>
         </View>

         {/* Last updated */}
         {order.updatedAt && (
            <View style={styles.updatedRow}>
               <Feather
                  name="refresh-cw"
                  size={12}
                  color={colors.text.disabled}
               />
               <Text
                  style={[
                     styles.updatedText,
                     { color: colors.text.disabled },
                  ]}
               >
                  Mis à jour: {formatDate(order.updatedAt)}
               </Text>
            </View>
         )}
      </Pressable>
   );
};

const styles = StyleSheet.create({
   card: {
      marginHorizontal: 20,
      borderRadius: 16,
      borderWidth: 1,
      padding: 16,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.06,
      shadowRadius: 8,
      elevation: 3,
   },
   headerRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
   },
   headerLeft: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
   },
   shipIcon: {
      width: 48,
      height: 48,
      borderRadius: 12,
      justifyContent: "center",
      alignItems: "center",
   },
   headerInfo: {
      gap: 4,
   },
   orderCode: {
      fontSize: 16,
      fontWeight: "700",
   },
   statusBadge: {
      paddingHorizontal: 10,
      paddingVertical: 3,
      borderRadius: 6,
      alignSelf: "flex-start",
   },
   statusText: {
      fontSize: 12,
      fontWeight: "500",
   },
   routeLine: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 24,
      marginBottom: 8,
      paddingHorizontal: 4,
   },
   dashContainer: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
   },
   dash: {
      width: 6,
      height: 2,
      borderRadius: 1,
   },
   stepsContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 16,
      paddingHorizontal: 4,
   },
   stepItem: {
      alignItems: "center",
      gap: 6,
   },
   stepCircle: {
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: "center",
      alignItems: "center",
   },
   stepCircleActive: {
      backgroundColor: SHIP_COLORS.navy,
   },
   stepCircleCompleted: {
      backgroundColor: SHIP_COLORS.navy,
   },
   stepCircleInactive: {
      backgroundColor: "transparent",
      borderWidth: 2,
      borderColor: SHIP_COLORS.progressTrack,
   },
   stepLine: {
      height: 2,
      flex: 1,
      marginHorizontal: 2,
      marginBottom: 22,
   },
   stepLabel: {
      fontSize: 11,
      textAlign: "center",
   },
   progressBarContainer: {
      marginTop: 20,
      paddingHorizontal: 4,
   },
   progressTrack: {
      height: 6,
      borderRadius: 3,
      overflow: "hidden",
   },
   progressFill: {
      height: "100%",
      borderRadius: 3,
   },
   progressText: {
      fontSize: 12,
      marginTop: 6,
   },
   bottomDivider: {
      borderTopWidth: 1,
      marginTop: 16,
   },
   bottomRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 12,
   },
   bottomItem: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
   },
   bottomText: {
      fontSize: 13,
   },
   updatedRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
      marginTop: 10,
   },
   updatedText: {
      fontSize: 11,
   },
});
