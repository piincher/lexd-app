import React from "react";
import { View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { useOrderPaymentCardStyles } from "./OrderPaymentCard.styles";
import { PaymentInfoRow } from "./PaymentInfoRow";
import { PaymentStatus } from "../../../../hooks/useOrderPaymentData";

const formatCurrency = (amount?: number | null): string =>
  `${(amount ?? 0).toLocaleString("fr-FR")} FCFA`;

interface PaymentAmountSummaryProps {
  totalPrice: number;
  paidAmount: number;
  balanceDue: number;
  paymentStatus: PaymentStatus;
}

export const PaymentAmountSummary: React.FC<PaymentAmountSummaryProps> = ({
  totalPrice,
  paidAmount,
  balanceDue,
  paymentStatus,
}) => {
  const { colors } = useAppTheme();
  const styles = useOrderPaymentCardStyles();

  return (
    <>
      <PaymentInfoRow
        icon="cash-register"
        label="Total commande"
        value={totalPrice > 0 ? formatCurrency(totalPrice) : "Non défini"}
      />

      {paidAmount > 0 && (
        <PaymentInfoRow
          icon="cash-check"
          label="Montant payé"
          value={formatCurrency(paidAmount)}
          valueColor={colors.status.success}
        />
      )}

      {paymentStatus !== "PAID" && balanceDue > 0 && (
        <PaymentInfoRow
          icon="cash-remove"
          label="Reste à payer"
          value={formatCurrency(balanceDue)}
          valueColor={colors.status.error}
        />
      )}

      <View style={styles.row}>
        <View style={styles.rowLeft}>
          <MaterialCommunityIcons
            name="cash"
            size={18}
            color={colors.text.secondary}
          />
          <Text style={styles.label}>Prix total</Text>
        </View>
        <Text style={styles.totalValue}>
          {totalPrice > 0 ? formatCurrency(totalPrice) : "Non défini"}
        </Text>
      </View>
    </>
  );
};
