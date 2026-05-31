import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { createStyles } from './PaymentSection.styles';

interface PaymentActionsProps {
  paymentStatus: 'UNPAID' | 'PARTIAL' | 'PAID';
  primaryColor: string;
  onRecordPayment: () => void;
  onViewHistory: () => void;
  styles: ReturnType<typeof createStyles>;
}

export const PaymentActions: React.FC<PaymentActionsProps> = ({
  paymentStatus,
  primaryColor,
  onRecordPayment,
  onViewHistory,
  styles,
}) => (
  <View style={styles.actions}>
    {paymentStatus !== 'PAID' && (
      <Button
        mode="contained"
        onPress={onRecordPayment}
        style={styles.payButton}
        buttonColor={primaryColor}
        icon="cash-plus"
        labelStyle={styles.buttonLabel}
      >
        Enregistrer un paiement
      </Button>
    )}

    <Button
      mode="outlined"
      onPress={onViewHistory}
      style={styles.historyButton}
      textColor={primaryColor}
      icon="history"
      labelStyle={styles.buttonLabel}
    >
      Historique des paiements
    </Button>
  </View>
);
