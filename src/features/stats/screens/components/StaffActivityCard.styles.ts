import { StyleSheet } from 'react-native';
import { Fonts } from '@src/constants/Fonts';
import { Theme, lightTheme } from '@src/constants/Theme';

export const createStaffActivityStyles = (colors: typeof lightTheme.colors) =>
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
      alignItems: 'center',
      justifyContent: 'space-between',
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
    iconBox: {
      width: 36,
      height: 36,
      borderRadius: 10,
      backgroundColor: colors.feedback.warningBg,
      alignItems: 'center',
      justifyContent: 'center',
    },
    summaryRow: {
      flexDirection: 'row',
      gap: 10,
      marginBottom: 14,
    },
    summaryItem: {
      flex: 1,
      backgroundColor: colors.background.paper,
      borderRadius: 12,
      padding: 10,
    },
    summaryValue: {
      fontSize: 17,
      fontFamily: Fonts.bold,
      fontWeight: '700',
      color: colors.text.primary,
    },
    summaryLabel: {
      fontSize: 10,
      fontFamily: Fonts.medium,
      color: colors.text.disabled,
      marginTop: 2,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 8,
      borderTopWidth: 1,
      borderTopColor: colors.border,
      gap: 10,
    },
    rowText: {
      flex: 1,
      fontSize: 12,
      fontFamily: Fonts.medium,
      color: colors.text.secondary,
    },
    rowMeta: {
      fontSize: 11,
      fontFamily: Fonts.bold,
      color: colors.status.warning,
    },
    emptyText: {
      fontSize: 12,
      fontFamily: Fonts.regular,
      color: colors.text.disabled,
    },
  });
