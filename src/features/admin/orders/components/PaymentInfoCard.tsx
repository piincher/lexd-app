/**
 * PaymentInfoCard - Displays payment information details
 * SRP: Show payment ID, amount, method, status, date, reference, and notes
 */

import React from "react";
import { Surface } from "react-native-paper";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { createPaymentInfoCardStyles } from "./PaymentInfoCard.styles";
import { PaymentCardHeader } from "./PaymentCardHeader";
import { PaymentAmountDisplay } from "./PaymentAmountDisplay";
import { PaymentDetailRow } from "./PaymentDetailRow";
import { PaymentMethodRow } from "./PaymentMethodRow";
import { PaymentStatusRow } from "./PaymentStatusRow";
import { PaymentNotesSection } from "./PaymentNotesSection";

interface PaymentInfoCardProps {
  paymentId: string;
  amount: number;
  paymentMethod: string;
  status: string;
  paidAt: string;
  referenceNumber?: string;
  notes?: string;
}

const formatDate = (dateString: string) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return date.toLocaleString("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const PaymentInfoCard: React.FC<PaymentInfoCardProps> = ({
  paymentId,
  amount,
  paymentMethod,
  status,
  paidAt,
  referenceNumber,
  notes,
}) => {
  const { colors } = useAppTheme();
  const styles = createPaymentInfoCardStyles(colors);

  return (
    <Surface style={styles.card}>
      <PaymentCardHeader title="Payment Information" />

      <PaymentAmountDisplay amount={amount} />

      <PaymentDetailRow label="Payment ID" value={paymentId} />
      <PaymentMethodRow paymentMethod={paymentMethod} />
      <PaymentStatusRow status={status} />
      <PaymentDetailRow label="Paid At" value={formatDate(paidAt)} />

      {referenceNumber && (
        <PaymentDetailRow label="Reference Number" value={referenceNumber} />
      )}

      {notes && <PaymentNotesSection notes={notes} />}
    </Surface>
  );
};
