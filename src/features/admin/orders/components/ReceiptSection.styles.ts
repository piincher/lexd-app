import { StyleSheet } from 'react-native';
import { Fonts } from '@src/constants/Fonts';
import { AppTheme } from '@src/constants/Theme';

export const createReceiptSectionStyles = (colors: AppTheme['colors']) => StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
    backgroundColor: colors.background.card,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: Fonts.semiBold,
    marginLeft: 8,
    color: colors.text.primary,
  },
  receiptPreview: {
    alignItems: 'center',
    paddingVertical: 24,
    backgroundColor: colors.background.paper,
    borderRadius: 12,
    marginBottom: 16,
  },
  receiptText: {
    fontSize: 14,
    color: colors.text.secondary,
    fontFamily: Fonts.regular,
    marginTop: 8,
  },
  receiptNumber: {
    fontSize: 12,
    color: colors.text.secondary,
    fontFamily: Fonts.medium,
    marginTop: 4,
  },
  receiptActions: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  receiptButton: {
    flex: 1,
    borderRadius: 8,
  },
  shareButton: {
    borderRadius: 8,
    paddingVertical: 4,
  },
  loader: {
    marginTop: 8,
  },
  noReceiptContainer: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  noReceiptText: {
    fontSize: 14,
    color: colors.text.secondary,
    fontFamily: Fonts.regular,
    marginTop: 8,
  },
});
