import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createPaymentHistoryEmptyStyles } from './PaymentHistoryEmpty.styles';

export const PaymentHistoryEmpty: React.FC = () => {
  const { colors } = useAppTheme();
  const styles = createPaymentHistoryEmptyStyles(colors);

  return (
    <View style={styles.emptyContainer}>
      <MaterialCommunityIcons name="cash-remove" size={64} color={colors.neutral[200]} />
      <Text style={styles.emptyTitle}>Aucun paiement</Text>
      <Text style={styles.emptyText}>
        Aucun paiement n'a été enregistré pour cette commande.
      </Text>
    </View>
  );
};
