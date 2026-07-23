import { StyleSheet } from 'react-native';
import { Fonts } from '@src/constants/Fonts';
import { HAIRLINE, OVERLINE, RADIUS } from '@src/shared/ui/designLanguage';

export const createStatusBreakdownStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      marginHorizontal: 20,
      borderRadius: RADIUS.card,
      padding: 18,
      borderWidth: HAIRLINE,
      borderColor: colors.border,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    title: {
      fontSize: 15,
      fontFamily: Fonts.bold,
      fontWeight: '700',
    },
    headerSubtitle: {
      fontSize: 11,
      fontFamily: Fonts.regular,
      marginTop: 2,
    },
    totalBadgeContainer: {
      alignItems: 'center',
      paddingHorizontal: 14,
      paddingVertical: 6,
      borderRadius: RADIUS.badge,
    },
    totalBadge: {
      fontSize: 18,
      fontFamily: Fonts.bold,
      fontWeight: '700',
    },
    totalBadgeLabel: {
      ...OVERLINE,
      fontSize: 10,
      letterSpacing: 0.6,
      fontFamily: Fonts.regular,
    },
  });
