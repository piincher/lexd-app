import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { createPaymentInfoCardStyles } from "./PaymentInfoCard.styles";

interface StatusConfig {
  color: string;
  bgColor: string;
  label: string;
}

const getStatusConfig = (status: string, colors: any): StatusConfig => {
  switch (status?.toUpperCase()) {
    case "COMPLETED":
    case "PAID":
    case "SUCCESS":
      return { color: colors.status.success, bgColor: colors.feedback.successBg, label: "Completed" };
    case "PENDING":
      return { color: colors.status.warning, bgColor: colors.feedback.warningBg, label: "Pending" };
    case "FAILED":
      return { color: colors.status.error, bgColor: colors.feedback.errorBg, label: "Failed" };
    default:
      return {
        color: colors.text.secondary,
        bgColor: colors.background.paper,
        label: status || "Unknown",
      };
  }
};

interface PaymentStatusRowProps {
  status: string;
}

export const PaymentStatusRow: React.FC<PaymentStatusRowProps> = ({
  status,
}) => {
  const { colors } = useAppTheme();
  const styles = createPaymentInfoCardStyles(colors);
  const config = getStatusConfig(status, colors);

  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>Status</Text>
      <View style={[styles.statusBadge, { backgroundColor: config.bgColor }]}>
        <Text style={[styles.statusText, { color: config.color }]}>
          {config.label}
        </Text>
      </View>
    </View>
  );
};
