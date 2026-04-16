import React, { useMemo } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Fonts } from "@src/constants/Fonts";
import { useAppTheme } from "@src/providers/ThemeProvider";

const STEPS = [
   { key: "pending", label: "Commande passée", icon: "clipboard-check" },
   { key: "warehouse", label: "Entrepôt", icon: "warehouse" },
   { key: "transit", label: "En transit", icon: "airplane" },
   { key: "arrived", label: "Arrivé", icon: "flag-checkered" },
   { key: "delivered", label: "Livré", icon: "check-circle" },
];

/**
 * Maps currentStatus (set by admin) to step index.
 * Exact matches against admin STATUS_ORDER keys.
 */
const CURRENT_STATUS_MAP: Record<string, number> = {
   "Order arrived at warehouse": 1,
   "Order in Processing": 1,
   "Order in Transit": 2,
   "Order in Arrived": 3,
   "Delivered": 4,
};

const getStepIndex = (status?: string, currentStatus?: string): number => {
   if (currentStatus && currentStatus in CURRENT_STATUS_MAP) {
      return CURRENT_STATUS_MAP[currentStatus];
   }

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

interface OrderTimelineProps {
   status?: string;
   currentStatus?: string;
}

export const OrderTimeline: React.FC<OrderTimelineProps> = ({
   status,
   currentStatus,
}) => {
   const { colors } = useAppTheme();
   const activeIndex = getStepIndex(status, currentStatus);

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
            timeline: {
               flexDirection: "row",
               justifyContent: "space-between",
               alignItems: "flex-start",
               paddingVertical: 12,
            },
            step: {
               alignItems: "center",
               flex: 1,
            },
            connector: {
               position: "absolute",
               top: 16,
               right: "50%",
               left: "-50%",
               height: 2,
               zIndex: -1,
            },
            circle: {
               width: 34,
               height: 34,
               borderRadius: 17,
               justifyContent: "center",
               alignItems: "center",
            },
            stepLabel: {
               fontSize: 10,
               marginTop: 6,
               textAlign: "center",
            },
            currentStatusRow: {
               flexDirection: "row",
               alignItems: "center",
               gap: 6,
               paddingTop: 8,
               paddingBottom: 4,
               borderTopWidth: 1,
               borderTopColor: colors.border,
            },
            currentStatusText: {
               fontSize: 13,
               color: colors.text.primary,
               fontWeight: "500",
            },
         }),
      [colors]
   );

   return (
      <Card style={styles.card}>
         <View style={styles.header}>
            <MaterialCommunityIcons
               name="timeline-clock"
               size={20}
               color={colors.status.success}
            />
            <Text style={styles.headerTitle}>Suivi du statut</Text>
         </View>
         <Card.Content>
            <View style={styles.timeline}>
               {STEPS.map((step, index) => {
                  const isCompleted = index <= activeIndex;
                  const isCurrent = index === activeIndex;

                  return (
                     <View key={step.key} style={styles.step}>
                        {index > 0 && (
                           <View
                              style={[
                                 styles.connector,
                                 {
                                    backgroundColor: isCompleted
                                       ? colors.status.success
                                       : colors.border,
                                 },
                              ]}
                           />
                        )}
                        <View
                           style={[
                              styles.circle,
                              {
                                 backgroundColor: isCompleted
                                    ? colors.status.success
                                    : colors.background.paper,
                                 borderColor: isCurrent ? colors.status.warning : "transparent",
                                 borderWidth: isCurrent ? 2 : 0,
                              },
                           ]}
                        >
                           <MaterialCommunityIcons
                              name={step.icon as any}
                              size={16}
                              color={isCompleted ? colors.text.inverse : colors.text.disabled}
                           />
                        </View>
                        <Text
                           style={[
                              styles.stepLabel,
                              {
                                 color: isCompleted ? colors.text.primary : colors.text.disabled,
                                 fontFamily: isCurrent ? Fonts.bold : Fonts.regular,
                              },
                           ]}
                        >
                           {step.label}
                        </Text>
                     </View>
                  );
               })}
            </View>

            {currentStatus && (
               <View style={styles.currentStatusRow}>
                  <MaterialCommunityIcons
                     name="map-marker"
                     size={14}
                     color={colors.status.success}
                  />
                  <Text style={styles.currentStatusText}>{currentStatus}</Text>
               </View>
            )}
         </Card.Content>
      </Card>
   );
};
