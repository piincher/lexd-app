import { StyleSheet } from 'react-native';
import { Fonts } from '@src/constants/Fonts';
import { HAIRLINE, RADIUS } from '@src/shared/ui/designLanguage';

export const createTopCustomerRowStyles = (colors: any) =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 10,
      gap: 10,
    },
    rowBorder: {
      borderBottomWidth: HAIRLINE,
      borderBottomColor: colors.border,
    },
    rankBadge: {
      width: 30,
      height: 30,
      borderRadius: RADIUS.control,
      backgroundColor: colors.background.paper,
      justifyContent: 'center',
      alignItems: 'center',
    },
    rankText: {
      fontSize: 12,
      fontFamily: Fonts.bold,
      fontWeight: '700',
      color: colors.text.secondary,
    },
    customerInfo: {
      flex: 1,
    },
    customerName: {
      fontSize: 13,
      fontFamily: Fonts.bold,
      fontWeight: '600',
      color: colors.text.primary,
    },
    customerMeta: {
      fontSize: 10,
      fontFamily: Fonts.regular,
      color: colors.text.disabled,
      marginTop: 2,
    },
    revenueContainer: {
      alignItems: 'flex-end',
    },
    revenueAmount: {
      fontSize: 13,
      fontFamily: Fonts.bold,
      fontWeight: '700',
      color: colors.text.primary,
    },
  });
