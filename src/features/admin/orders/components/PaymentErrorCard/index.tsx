import React from 'react';
import { Text, Surface } from 'react-native-paper';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createPaymentErrorCardStyles } from './PaymentErrorCard.styles';

interface PaymentErrorCardProps {
  message: string;
}

export const PaymentErrorCard: React.FC<PaymentErrorCardProps> = ({ message }) => {
  const { colors } = useAppTheme();
  const styles = createPaymentErrorCardStyles(colors);

  return (
    <Surface style={styles.errorCard}>
      <Text style={styles.errorText}>Error: {message}</Text>
    </Surface>
  );
};

export default PaymentErrorCard;
