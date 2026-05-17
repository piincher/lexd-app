import { StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';
import { Fonts } from '@src/constants/Fonts';

export const getStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      marginHorizontal: 20,
      backgroundColor: colors.background.card,
      borderRadius: 16,
      padding: 18,
      ...Theme.shadows.sm,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    title: {
      fontSize: 15,
      fontFamily: Fonts.bold,
      fontWeight: '700',
      color: colors.text.primary,
    },
    subtitle: {
      fontSize: 11,
      fontFamily: Fonts.regular,
      color: colors.text.disabled,
      marginTop: 2,
    },
    countBadge: {
      backgroundColor: colors.primary[50],
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 10,
    },
    countText: {
      fontSize: 13,
      fontFamily: Fonts.bold,
      fontWeight: '700',
      color: colors.primary.main,
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
