import React, { memo, useMemo } from "react";
import { Pressable, View, StyleSheet } from "react-native";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { RADIUS, RAIL_WIDTH, HAIRLINE } from "@src/shared/ui/designLanguage";
import { productType } from "../../api";
import { getStep, getStepStatusConfig, STEP_PROGRESS } from "./utils";
import { OrderCardHeader } from "./components/OrderCardHeader";
import { OrderCardProgress } from "./components/OrderCardProgress";

/**
 * Compact order card for list display.
 * SRP: Only responsible for rendering a single order summary.
 * No API calls, no modals, no heavy sub-components.
 */

interface OrderListCardProps {
   order: productType;
   onPress: () => void;
}

const OrderListCardInner: React.FC<OrderListCardProps> = ({ order, onPress }) => {
   const { colors } = useAppTheme();
   const step = getStep(order.status, order.currentStatus);
   const stepConfig = useMemo(() => getStepStatusConfig(colors), [colors]);
   const statusCfg = stepConfig[step];
   const progress = STEP_PROGRESS[step];

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
         accessibilityRole="button"
         accessibilityLabel={`Commande ${order.code}, ${statusCfg.label}`}
      >
         {/* Status rail: the order's stage, readable before any text. */}
         <View
            style={[styles.rail, { backgroundColor: statusCfg.color }]}
            pointerEvents="none"
         />

         <OrderCardHeader
            orderCode={order.code}
            departureDate={order.departureDate}
            quantity={order.quantity}
            shippingMode={order.shippingMode}
            statusLabel={statusCfg.label}
            statusColor={statusCfg.color}
            statusBg={statusCfg.color + '15'}
         />
         <OrderCardProgress
            progress={progress}
            fillColor={statusCfg.color}
         />
      </Pressable>
   );
};

export const OrderListCard = memo(OrderListCardInner);

const styles = StyleSheet.create({
   // Border-first surface: the shadow/elevation stack is intentionally gone.
   card: {
      borderRadius: RADIUS.card,
      borderWidth: HAIRLINE,
      paddingHorizontal: 14,
      paddingLeft: 14 + RAIL_WIDTH,
      paddingVertical: 12,
      marginBottom: 10,
      overflow: "hidden",
   },
   rail: {
      position: "absolute",
      left: 0,
      top: 0,
      bottom: 0,
      width: RAIL_WIDTH,
   },
});
