import React from 'react';
import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { useWavePaymentFormStyles } from './useWavePaymentFormStyles';

export const SecurityNote: React.FC = () => {
  const { colors } = useAppTheme();
  const styles = useWavePaymentFormStyles();

  return (
    <View style={styles.securityNote}>
      <MaterialCommunityIcons
        name="shield-check"
        size={16}
        color={colors.status.success}
      />
      <Text style={styles.securityText}>
        Your payment is protected by Wave's security. We never store your PIN.
      </Text>
    </View>
  );
};
