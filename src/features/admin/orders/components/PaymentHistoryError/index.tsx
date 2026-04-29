import React, { useMemo } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createPaymentHistoryErrorStyles } from './PaymentHistoryError.styles';

interface PaymentHistoryErrorProps {
  error: Error;
  onRetry: () => void;
}

export const PaymentHistoryError: React.FC<PaymentHistoryErrorProps> = ({ error, onRetry }) => {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createPaymentHistoryErrorStyles(colors), [colors]);

  return (
    <View style={styles.errorContainer}>
      <MaterialCommunityIcons name="alert-circle" size={48} color={colors.status.error} />
      <Text style={styles.errorTitle}>Échec du chargement</Text>
      <Text style={styles.errorText}>{error.message}</Text>
      <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
        <Text style={styles.retryText}>Réessayer</Text>
      </TouchableOpacity>
    </View>
  );
};
