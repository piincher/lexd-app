import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { createPaymentInfoCardStyles } from "./PaymentInfoCard.styles";

interface PaymentDetailRowProps {
  label: string;
  value: React.ReactNode;
}

export const PaymentDetailRow: React.FC<PaymentDetailRowProps> = ({
  label,
  value,
}) => {
  const { colors } = useAppTheme();
  const styles = createPaymentInfoCardStyles(colors);

  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      {typeof value === "string" || typeof value === "number" ? (
        <Text style={styles.infoValue}>{value || "N/A"}</Text>
      ) : (
        value
      )}
    </View>
  );
};
