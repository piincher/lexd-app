import React from "react";
import { Pressable } from "react-native";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { productType } from "@src/shared/types/order";
import { createStyles } from "./ActiveShipmentCard.styles";
import { SHIP_COLORS, getStepFromStatus, BADGE_LABELS, PROGRESS_MAP } from "./ActiveShipmentCard.constants";
import { ShipmentHeader } from "./ShipmentHeader";
import { ShipmentTimeline } from "./ShipmentTimeline";
import { ShipmentFooter } from "./ShipmentFooter";

const styles = createStyles(SHIP_COLORS);

interface ActiveShipmentCardProps {
  order: productType;
  onPress?: () => void;
}

export const ActiveShipmentCard: React.FC<ActiveShipmentCardProps> = ({ order, onPress }) => {
  const { colors } = useAppTheme();
  const currentStep = getStepFromStatus(order.status, order.currentStatus);
  const progress = PROGRESS_MAP[currentStep];
  const statusText = BADGE_LABELS[currentStep];

  return (
    <Pressable
      style={[styles.card, { backgroundColor: colors.background.card, borderColor: colors.border }]}
      onPress={onPress}
    >
      <ShipmentHeader
        code={order.code}
        statusText={statusText}
        shippingMode={order.shippingMode}
        colors={colors}
      />
      <ShipmentTimeline currentStep={currentStep} progress={progress} colors={colors} />
      <ShipmentFooter
        departureDate={order.departureDate}
        quantity={order.quantity}
        updatedAt={order.updatedAt}
        colors={colors}
      />
    </Pressable>
  );
};
