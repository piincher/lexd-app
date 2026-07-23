import { StyleSheet } from 'react-native';
import { Fonts } from '@src/constants/Fonts';
import { lightTheme } from '@src/constants/Theme';
import { HAIRLINE, OVERLINE, RADIUS } from '@src/shared/ui/designLanguage';

export const createPaymentOverviewStyles = (colors: typeof lightTheme.colors) =>
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
    headerSubtitle: {
      fontSize: 12,
      fontFamily: Fonts.regular,
      color: colors.text.disabled,
      marginTop: 2,
    },
    rateBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: RADIUS.badge,
    },
    rateText: {
      fontSize: 13,
      fontFamily: Fonts.bold,
      fontWeight: '700',
    },
    statsRow: {
      flexDirection: 'row',
      gap: 10,
      marginBottom: 14,
    },
    statCard: {
      flex: 1,
      backgroundColor: colors.background.paper,
      borderRadius: RADIUS.control,
      padding: 14,
      borderLeftWidth: 3,
    },
    statAmount: {
      fontSize: 17,
      fontFamily: Fonts.bold,
      fontWeight: '700',
      color: colors.text.primary,
    },
    statCurrency: {
      fontSize: 10,
      fontFamily: Fonts.medium,
      fontWeight: '700',
      letterSpacing: 0.6,
      textTransform: 'uppercase',
      color: colors.text.disabled,
      marginBottom: 6,
    },
    statFooter: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    dot: {
      width: 6,
      height: 6,
      borderRadius: 3,
    },
    statLabel: {
      ...OVERLINE,
      fontFamily: Fonts.medium,
      color: colors.text.secondary,
    },
    barContainer: {
      marginBottom: 2,
    },
    barBg: {
      flexDirection: 'row',
      height: 5,
      borderRadius: 3,
      overflow: 'hidden',
    },
    barPaid: {
      backgroundColor: colors.status.success,
      borderRadius: 3,
    },
    barUnpaid: {
      backgroundColor: colors.status.error + '40',
      borderRadius: 3,
    },
    methodsSection: {
      marginTop: 14,
      paddingTop: 12,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    methodsTitle: {
      ...OVERLINE,
      fontFamily: Fonts.bold,
      color: colors.text.secondary,
      marginBottom: 10,
    },
    methodRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
      gap: 8,
    },
    methodIcon: {
      width: 28,
      height: 28,
      borderRadius: RADIUS.control,
      justifyContent: 'center',
      alignItems: 'center',
    },
    methodLabel: {
      flex: 1,
      fontSize: 12,
      fontFamily: Fonts.medium,
      color: colors.text.primary,
    },
    methodAmount: {
      fontSize: 12,
      fontFamily: Fonts.bold,
      fontWeight: '700',
      color: colors.text.primary,
    },
    methodPercent: {
      fontSize: 11,
      fontFamily: Fonts.medium,
      color: colors.text.disabled,
      minWidth: 30,
      textAlign: 'right',
    },
  });
