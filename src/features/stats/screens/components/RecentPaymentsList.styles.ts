import { StyleSheet } from 'react-native';
import { Fonts } from '@src/constants/Fonts';
import { HAIRLINE, RADIUS } from '@src/shared/ui/designLanguage';

export const getStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      marginHorizontal: 20,
      paddingVertical: 14,
      borderTopWidth: HAIRLINE,
      borderTopColor: colors.border,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
    },
    title: {
      fontSize: 16,
      fontFamily: Fonts.bold,
      fontWeight: '700',
      color: colors.text.primary,
      letterSpacing: -0.2,
    },
    subtitle: {
      fontSize: 12,
      fontFamily: Fonts.regular,
      color: colors.text.disabled,
      marginTop: 2,
    },
    countBadge: {
      backgroundColor: colors.primary[50],
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: RADIUS.badge,
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
