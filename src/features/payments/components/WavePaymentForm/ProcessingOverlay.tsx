import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { useWavePaymentFormStyles } from './useWavePaymentFormStyles';

export const ProcessingOverlay: React.FC = () => {
  const { colors } = useAppTheme();
  const styles = useWavePaymentFormStyles();

  return (
    <View style={styles.processingOverlay}>
      <ActivityIndicator size="large" color={colors.primary.main} />
      <Text style={styles.processingText}>
        Waiting for payment confirmation...
      </Text>
    </View>
  );
};
