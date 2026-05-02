import { StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';
import { Fonts } from '@src/constants/Fonts';

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
      borderRadius: 16,
      padding: 18,
      ...Theme.shadows.sm,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 14,
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
    summaryBadge: {
      alignItems: 'center',
      backgroundColor: colors.primary[50],
      paddingHorizontal: 14,
      paddingVertical: 6,
      borderRadius: 12,
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
      color: colors.primary.light,
    },
    quickStats: {
      flexDirection: 'row',
      backgroundColor: colors.background.paper,
      borderRadius: 12,
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
