import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { createPaymentInfoCardStyles } from "./PaymentInfoCard.styles";

interface PaymentAmountDisplayProps {
  amount: number;
  label?: string;
}

export const PaymentAmountDisplay: React.FC<PaymentAmountDisplayProps> = ({
  amount,
  label = "Amount Paid",
}) => {
  const { colors } = useAppTheme();
  const styles = createPaymentInfoCardStyles(colors);

  return (
    <View style={styles.amountContainer}>
      <Text style={styles.amountLabel}>{label}</Text>
      <Text style={styles.amountValue}>
        {amount?.toLocaleString() || 0} FCFA
      </Text>
    </View>
  );
};
