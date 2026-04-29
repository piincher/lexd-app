import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';

interface PaymentScreenFooterProps {
  amount: number;
  isValid: boolean;
  isProcessing: boolean;
  onPay: () => void;
}

export const PaymentScreenFooter: React.FC<PaymentScreenFooterProps> = ({
  amount,
  isValid,
  isProcessing,
  onPay,
}) => {
  const { colors } = useAppTheme();

  return (
    <View style={[styles.footer, { borderTopColor: colors.border }]}>
      <View style={styles.totalContainer}>
        <Text style={[styles.totalLabel, { color: colors.text.secondary }]}>Total Amount</Text>
        <Text style={[styles.totalAmount, { color: colors.text.primary }]}>
          {(amount / 100).toLocaleString()} FCFA
        </Text>
      </View>

      <TouchableOpacity
        style={[
          styles.payButton,
          { backgroundColor: isValid ? colors.primary.main : colors.neutral[200] },
        ]}
        onPress={onPay}
        disabled={!isValid || isProcessing}
        activeOpacity={0.8}
      >
        <Text style={[styles.payButtonText, { color: colors.text.inverse }]}>
          {isProcessing ? 'Processing...' : 'Pay Now'}
        </Text>
        {!isProcessing && (
          <MaterialCommunityIcons name="arrow-right" size={20} color={colors.text.inverse} />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    padding: 16,
    borderTopWidth: 1,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 14,
    fontFamily: Fonts.regular,
  },
  totalAmount: {
    fontSize: 20,
    fontFamily: Fonts.bold,
  },
  payButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    paddingVertical: 16,
    gap: 8,
  },
  payButtonText: {
    fontSize: 16,
    fontFamily: Fonts.bold,
  },
});
