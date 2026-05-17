import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { createPaymentInfoCardStyles } from "./PaymentInfoCard.styles";

const PAYMENT_METHODS: Record<
  string,
  { label: string; icon: string; color: string }
> = {
  CASH: { label: "Cash", icon: "cash", color: "#4CAF50" },
  BANK_TRANSFER: { label: "Bank Transfer", icon: "bank", color: "#2196F3" },
  MOBILE_MONEY: { label: "Mobile Money", icon: "cellphone", color: "#FF9800" },
  ORANGE_MONEY: { label: "Orange Money", icon: "cellphone", color: "#FF6600" },
  WAVE: { label: "Wave", icon: "wave", color: "#1E88E5" },
  CARD: { label: "Card", icon: "credit-card", color: "#9C27B0" },
};

interface PaymentMethodRowProps {
  paymentMethod: string;
}

export const PaymentMethodRow: React.FC<PaymentMethodRowProps> = ({
  paymentMethod,
}) => {
  const { colors } = useAppTheme();
  const styles = createPaymentInfoCardStyles(colors);
  const config = PAYMENT_METHODS[paymentMethod] || {
    label: paymentMethod,
    icon: "cash",
    color: colors.text.secondary,
  };

  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>Payment Method</Text>
      <View style={styles.methodContainer}>
        <MaterialCommunityIcons
          name={config.icon as any}
          size={18}
          color={config.color}
        />
        <Text style={[styles.methodText, { color: config.color }]}>
          {config.label}
        </Text>
      </View>
    </View>
  );
};
