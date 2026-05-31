import { StyleSheet } from 'react-native';
import { Fonts } from '@src/constants/Fonts';

export const createStyles = (colors: any, isDark?: boolean) =>
  StyleSheet.create({
    container: {
      marginHorizontal: 12,
      marginBottom: 12,
      padding: 16,
      borderRadius: 16,
      backgroundColor: colors.background.card,
      elevation: 2,
      shadowColor: colors.neutral[900],
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 8,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      marginBottom: 16,
    },
    title: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text.primary,
      fontFamily: Fonts.semiBold,
    },
    statusCard: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      borderRadius: 12,
      marginBottom: 16,
    },
    statusIconContainer: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: colors.background.card,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 14,
      elevation: 2,
    },
    statusContent: {
      flex: 1,
    },
    statusLabel: {
      fontSize: 14,
      fontWeight: '600',
      fontFamily: Fonts.semiBold,
      marginBottom: 4,
    },
    statusAmount: {
      fontSize: 18,
      fontWeight: '700',
      color: colors.text.primary,
      fontFamily: Fonts.bold,
    },
    progressBlock: {
      marginBottom: 16,
      gap: 8,
    },
    progressMetaRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    progressMetaLabel: {
      fontSize: 12.5,
      color: colors.text.secondary,
      fontFamily: Fonts.medium,
    },
    progressPercent: {
      fontSize: 13,
      fontWeight: '700',
      fontFamily: Fonts.bold,
    },
    progressTrack: {
      height: 8,
      borderRadius: 999,
      backgroundColor: colors.background.paper,
      overflow: 'hidden',
    },
    progressFill: {
      height: '100%',
      borderRadius: 999,
    },
    progressRemaining: {
      fontSize: 11.5,
      color: colors.text.secondary,
      fontFamily: Fonts.medium,
    },
    breakdown: {
      backgroundColor: colors.background.paper,
      borderRadius: 10,
      padding: 14,
      marginBottom: 16,
    },
    breakdownRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 6,
    },
    breakdownLabel: {
      fontSize: 13,
      color: colors.text.secondary,
      fontFamily: Fonts.medium,
    },
    breakdownValue: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.text.primary,
      fontFamily: Fonts.semiBold,
    },
    actions: {
      gap: 10,
    },
    payButton: {
      borderRadius: 10,
      paddingVertical: 6,
    },
    historyButton: {
      borderRadius: 10,
      borderColor: colors.primary.main,
      paddingVertical: 6,
    },
    buttonLabel: {
      fontSize: 14,
      fontWeight: '600',
      fontFamily: Fonts.semiBold,
    },
    adminNote: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: 6,
      marginTop: 14,
      paddingTop: 14,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    adminNoteText: {
      flex: 1,
      fontSize: 11,
      color: colors.text.secondary,
      fontFamily: Fonts.regular,
      lineHeight: 16,
    },
  });

export default createStyles;
