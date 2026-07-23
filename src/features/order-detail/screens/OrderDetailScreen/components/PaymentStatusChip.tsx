import React from "react";
import { View, Text } from "react-native";
import { Chip } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { Fonts } from "@src/constants/Fonts";
import { RADIUS } from "@src/shared/ui/designLanguage";
import { useOrderPaymentCardStyles } from "./OrderPaymentCard.styles";
import { PaymentStatus } from "../../../hooks/useOrderPaymentData";

interface PaymentStatusChipProps {
  status: PaymentStatus;
}

const STATUS_CONFIG: Record<
  PaymentStatus,
  { label: string; tone: "success" | "warning" | "error" }
> = {
  PAID: { label: "Payé", tone: "success" },
  PARTIAL: { label: "Partiellement payé", tone: "warning" },
  UNPAID: { label: "Non payé", tone: "error" },
};

export const PaymentStatusChip: React.FC<PaymentStatusChipProps> = ({
  status,
}) => {
  const { colors } = useAppTheme();
  const styles = useOrderPaymentCardStyles();
  const config = STATUS_CONFIG[status];

  // Uses the paired feedback tokens rather than a 20%-alpha tint of the raw
  // status hue. The old approach put status.warning (#DC6803) on near-white at
  // 3.49:1, which fails AA at this text size; these pairs are 5.08–7.97.
  const bg = colors.feedback[`${config.tone}Bg` as const];
  const fg = colors.feedback[`${config.tone}Dark` as const];

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
        style={{ backgroundColor: bg, borderRadius: RADIUS.badge }}
        textStyle={{
          color: fg,
          fontFamily: Fonts.bold || undefined,
          fontSize: 10,
          letterSpacing: 0.6,
          textTransform: "uppercase",
        }}
        compact
      >
        {config.label}
      </Chip>
    </View>
  );
};
