import { StyleSheet } from 'react-native';
import { Fonts } from '@src/constants/Fonts';

export const createRecordPaymentScreenStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.background.default,
  },
  submitButton: {
    marginVertical: 16,
    paddingVertical: 8,
    borderRadius: 10,
  },
  submitLabel: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: Fonts.semiBold,
  },
});
