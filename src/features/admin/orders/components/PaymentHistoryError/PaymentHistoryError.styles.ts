import { StyleSheet } from 'react-native';
import { Fonts } from '@src/constants/Fonts';

export const createPaymentHistoryErrorStyles = (colors: any) => StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: Fonts.semiBold,
    color: colors.status.error,
    marginTop: 16,
  },
  errorText: {
    fontSize: 14,
    color: colors.text.secondary,
    fontFamily: Fonts.regular,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: colors.primary.main,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryText: {
    color: colors.text.inverse,
    fontWeight: '600',
    fontFamily: Fonts.semiBold,
  },
});
