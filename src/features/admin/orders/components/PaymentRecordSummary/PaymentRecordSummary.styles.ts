import { StyleSheet } from 'react-native';
import { Fonts } from '@src/constants/Fonts';

export const createPaymentRecordSummaryStyles = (colors: any) => StyleSheet.create({
  summaryCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: Fonts.semiBold,
    marginBottom: 12,
    color: colors.text.primary,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  summaryLabel: {
    fontSize: 14,
    color: colors.text.secondary,
    fontFamily: Fonts.regular,
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: Fonts.semiBold,
    color: colors.text.primary,
  },
  balanceValue: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: Fonts.semiBold,
    color: '#F44336',
  },
  divider: {
    marginVertical: 12,
  },
});
