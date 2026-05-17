import { StyleSheet } from 'react-native';
import { Fonts } from '@src/constants/Fonts';

export const getStyles = (colors: any) =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 10,
      gap: 12,
    },
    rowBorder: {
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    methodIcon: {
      width: 36,
      height: 36,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    info: {
      flex: 1,
    },
    customerName: {
      fontSize: 13,
      fontFamily: Fonts.bold,
      fontWeight: '600',
      color: colors.text.primary,
    },
    date: {
      fontSize: 10,
      fontFamily: Fonts.regular,
      color: colors.text.disabled,
      marginTop: 2,
    },
    amount: {
      fontSize: 13,
      fontFamily: Fonts.bold,
      fontWeight: '700',
      color: colors.status.success,
    },
  });
