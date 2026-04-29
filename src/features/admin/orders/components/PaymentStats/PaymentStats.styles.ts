import { StyleSheet } from 'react-native';
import { Fonts } from '@src/constants/Fonts';

export const createPaymentStatsStyles = (colors: any) => StyleSheet.create({
  summaryCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    backgroundColor: colors.background.card,
    elevation: 2,
  },
  backfillButton: {
    borderRadius: 8,
    marginBottom: 16,
    paddingVertical: 2,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryDivider: {
    width: 1,
    height: 40,
    backgroundColor: colors.border,
  },
  summaryLabel: {
    fontSize: 12,
    color: colors.text.secondary,
    fontFamily: Fonts.regular,
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: Fonts.bold,
    color: colors.text.primary,
  },
});
