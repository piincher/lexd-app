import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Fonts } from '@src/constants/Fonts';
import { useAppTheme } from '@src/providers/ThemeProvider';

export const PaymentHistoryEmptyState: React.FC = () => {
  const { colors } = useAppTheme();

  return (
    <View style={styles.emptyContainer}>
      <MaterialCommunityIcons
        name="credit-card-off"
        size={64}
        color={colors.text.disabled}
      />
      <Text style={[styles.emptyTitle, { color: colors.text.primary }]}>
        Aucun paiement pour le moment
      </Text>
      <Text style={[styles.emptyText, { color: colors.text.secondary }]}>
        Vos paiements validés apparaîtront ici.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 64,
  },
  emptyTitle: {
    fontSize: 18,
    fontFamily: Fonts.bold,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    textAlign: 'center',
    paddingHorizontal: 32,
  },
});
