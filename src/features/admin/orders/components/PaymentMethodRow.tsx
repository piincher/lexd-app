import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { createPaymentInfoCardStyles } from "./PaymentInfoCard.styles";

// Payment method brand colors — themed where possible
const getPaymentMethods = (colors: any) => ({
  CASH: { label: "Cash", icon: "cash", color: colors.status.success },
  BANK_TRANSFER: { label: "Bank Transfer", icon: "bank", color: colors.status.info },
  MOBILE_MONEY: { label: "Mobile Money", icon: "cellphone", color: colors.status.warning },
  ORANGE_MONEY: { label: "Orange Money", icon: "cellphone", color: colors.status.warning },
  WAVE: { label: "Wave", icon: "wave", color: colors.status.info },
  CARD: { label: "Card", icon: "credit-card", color: (colors.accent as any).purple || "#9C27B0" },
});

interface PaymentMethodRowProps {
  paymentMethod: string;
}

export const PaymentMethodRow: React.FC<PaymentMethodRowProps> = ({
  paymentMethod,
}) => {
  const { colors } = useAppTheme();
  const styles = createPaymentInfoCardStyles(colors);
  const paymentMethods = getPaymentMethods(colors);
  const config = paymentMethods[paymentMethod] || {
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
