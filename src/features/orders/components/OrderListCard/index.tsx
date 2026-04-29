import React, { memo } from "react";
import { Pressable, StyleSheet } from "react-native";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { productType } from "../../api";
import { getStep, STEP_STATUS_CONFIG, STEP_PROGRESS } from "./utils";
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
   const statusCfg = STEP_STATUS_CONFIG[step];
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
      >
         <OrderCardHeader
            orderCode={order.code}
            departureDate={order.departureDate}
            quantity={order.quantity}
            shippingMode={order.shippingMode}
            statusLabel={statusCfg.label}
            statusColor={statusCfg.color}
            statusBg={statusCfg.bg}
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
});
