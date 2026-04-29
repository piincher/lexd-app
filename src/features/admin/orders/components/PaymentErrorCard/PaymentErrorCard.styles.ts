import { StyleSheet } from 'react-native';
import { Fonts } from '@src/constants/Fonts';

export const createPaymentErrorCardStyles = (colors: any) => StyleSheet.create({
  errorCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    backgroundColor: colors.status.error,
  },
  errorText: {
    color: colors.status.error,
    fontFamily: Fonts.medium,
  },
});
