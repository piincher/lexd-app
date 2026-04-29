import { StyleSheet } from 'react-native';
import { Fonts } from '@src/constants/Fonts';

export const createPaymentPreviewCardStyles = (colors: any) => StyleSheet.create({
  previewCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
    backgroundColor: colors.background.paper,
  },
  previewTitle: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: Fonts.semiBold,
    marginBottom: 12,
    color: colors.primary.main,
  },
  previewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 6,
  },
  previewLabel: {
    fontSize: 14,
    color: colors.text.secondary,
    fontFamily: Fonts.regular,
  },
  previewValue: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: Fonts.semiBold,
    color: colors.text.primary,
  },
  overpaymentLabel: {
    fontSize: 14,
    color: '#E65100',
    fontFamily: Fonts.regular,
  },
  overpaymentValue: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: Fonts.semiBold,
    color: '#E65100',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    fontFamily: Fonts.semiBold,
  },
});
