import { StyleSheet } from 'react-native';
import { Fonts } from '@src/constants/Fonts';

export const createPaymentHistoryEmptyStyles = (colors: any) => StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 64,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: Fonts.semiBold,
    color: colors.text.primary,
    marginTop: 16,
  },
  emptyText: {
    fontSize: 14,
    color: colors.text.secondary,
    fontFamily: Fonts.regular,
    textAlign: 'center',
    marginTop: 8,
    paddingHorizontal: 32,
  },
});
