import { StyleSheet } from 'react-native';
import { Fonts } from '@src/constants/Fonts';

export const createTopCustomersStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      marginHorizontal: 20,
      paddingVertical: 14,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    loader: {
      paddingVertical: 24,
    },
    emptyContainer: {
      alignItems: 'center',
      paddingVertical: 20,
      gap: 6,
    },
    emptyText: {
      fontSize: 12,
      fontFamily: Fonts.regular,
      color: colors.text.disabled,
    },
  });
