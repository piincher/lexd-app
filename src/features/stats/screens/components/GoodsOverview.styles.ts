import { StyleSheet } from 'react-native';
import { Fonts } from '@src/constants/Fonts';
import { HAIRLINE, RADIUS } from '@src/shared/ui/designLanguage';

export const createGoodsOverviewStyles = (colors: {
  background: { card: string; paper: string };
  text: { primary: string; secondary: string; disabled: string };
  primary: { main: string; light: string; '50': string };
  border: string;
}) =>
  StyleSheet.create({
    container: {
      marginHorizontal: 20,
      backgroundColor: colors.background.card,
      borderRadius: RADIUS.card,
      padding: 16,
      borderWidth: HAIRLINE,
      borderColor: colors.border,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 14,
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
    summaryBadge: {
      alignItems: 'center',
      backgroundColor: colors.primary['50'],
      paddingHorizontal: 14,
      paddingVertical: 6,
      borderRadius: RADIUS.badge,
    },
    summaryValue: {
      fontSize: 16,
      fontFamily: Fonts.bold,
      fontWeight: '700',
      color: colors.primary.main,
    },
    summaryLabel: {
      fontSize: 9,
      fontFamily: Fonts.regular,
      fontWeight: '700',
      letterSpacing: 0.6,
      textTransform: 'uppercase',
      color: colors.primary.light,
    },
    quickStats: {
      flexDirection: 'row',
      backgroundColor: colors.background.paper,
      borderRadius: RADIUS.control,
      padding: 14,
      marginBottom: 14,
    },
    quickStat: {
      flex: 1,
      alignItems: 'center',
      gap: 4,
    },
    quickStatValue: {
      fontSize: 16,
      fontFamily: Fonts.bold,
      fontWeight: '700',
      color: colors.text.primary,
    },
    quickStatLabel: {
      fontSize: 10,
      fontFamily: Fonts.medium,
      fontWeight: '700',
      letterSpacing: 0.6,
      textTransform: 'uppercase',
      color: colors.text.secondary,
    },
    quickStatDivider: {
      width: 1,
      backgroundColor: colors.border,
      marginHorizontal: 8,
    },
    statusSection: {
      gap: 2,
    },
    statusRow: {
      marginBottom: 10,
    },
    statusHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 5,
    },
    statusLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    statusDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
    },
    statusLabel: {
      fontSize: 12,
      fontFamily: Fonts.medium,
      color: colors.text.primary,
    },
    statusRight: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    statusCount: {
      fontSize: 13,
      fontFamily: Fonts.bold,
      fontWeight: '700',
      color: colors.text.primary,
    },
    statusPercent: {
      fontSize: 10,
      fontFamily: Fonts.medium,
      color: colors.text.disabled,
      minWidth: 28,
      textAlign: 'right',
    },
    barBg: {
      height: 4,
      backgroundColor: colors.border,
      borderRadius: 2,
      overflow: 'hidden',
    },
    barFill: {
      height: '100%',
      borderRadius: 2,
    },
  });
