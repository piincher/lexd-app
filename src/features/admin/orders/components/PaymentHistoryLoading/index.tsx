import React, { useMemo } from 'react';
import { View } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createPaymentHistoryLoadingStyles } from './PaymentHistoryLoading.styles';

export const PaymentHistoryLoading: React.FC = () => {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createPaymentHistoryLoadingStyles(colors), [colors]);

  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={colors.primary.main} />
      <Text style={styles.loadingText}>Chargement des paiements...</Text>
    </View>
  );
};
