import React from "react";
import { View, Text } from "react-native";
import { Chip } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { Fonts } from "@src/constants/Fonts";
import { useOrderPaymentCardStyles } from "./OrderPaymentCard.styles";
import { PaymentStatus } from "../../../hooks/useOrderPaymentData";

interface PaymentStatusChipProps {
  status: PaymentStatus;
}

const STATUS_CONFIG: Record<
  PaymentStatus,
  { label: string; colorKey: "success" | "warning" | "error" }
> = {
  PAID: { label: "Payé", colorKey: "success" },
  PARTIAL: { label: "Partiellement payé", colorKey: "warning" },
  UNPAID: { label: "Non payé", colorKey: "error" },
};

export const PaymentStatusChip: React.FC<PaymentStatusChipProps> = ({
  status,
}) => {
  const { colors } = useAppTheme();
  const styles = useOrderPaymentCardStyles();
  const config = STATUS_CONFIG[status];
  const color = colors.status[config.colorKey];

  return (
    <View style={styles.row}>
      <View style={styles.rowLeft}>
        <MaterialCommunityIcons
          name="credit-card-check"
          size={18}
          color={colors.text.secondary}
        />
        <Text style={styles.label}>Statut</Text>
      </View>
      <Chip
        style={{ backgroundColor: color + "20" }}
        textStyle={{
          color: color,
          fontFamily: Fonts.bold || undefined,
          fontSize: 12,
        }}
        compact
      >
        {config.label}
      </Chip>
    </View>
  );
};
