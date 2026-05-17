import React from "react";
import { View, Text } from "react-native";
import { Card } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { productType } from "@src/shared/types/order";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { useOrderPaymentData } from "../../../hooks/useOrderPaymentData";
import { useOrderPaymentCardStyles } from "./OrderPaymentCard.styles";
import { PaymentStatusChip } from "./PaymentStatusChip";
import { ShippingDetails } from "./ShippingDetails";
import { PaymentAmountSummary } from "./PaymentAmountSummary";

interface OrderPaymentCardProps {
  order: productType;
}

export const OrderPaymentCard: React.FC<OrderPaymentCardProps> = ({ order }) => {
  const { colors } = useAppTheme();
  const styles = useOrderPaymentCardStyles();
  const {
    isAir,
    totalPrice,
    paidAmount,
    balanceDue,
    paymentStatus,
    cbmValue,
  } = useOrderPaymentData(order);

  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <MaterialCommunityIcons
          name="cash-multiple"
          size={20}
          color={colors.status.success}
        />
        <Text style={styles.headerTitle}>Paiement</Text>
      </View>
      <Card.Content>
        <PaymentStatusChip status={paymentStatus} />

        <ShippingDetails order={order} isAir={isAir} cbmValue={cbmValue} />

        <PaymentAmountSummary
          totalPrice={totalPrice}
          paidAmount={paidAmount}
          balanceDue={balanceDue}
          paymentStatus={paymentStatus}
        />
      </Card.Content>
    </Card>
  );
};
