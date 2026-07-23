import { StyleSheet } from 'react-native';
import { Fonts } from '@src/constants/Fonts';
import { lightTheme } from '@src/constants/Theme';
import { HAIRLINE, OVERLINE, RADIUS } from '@src/shared/ui/designLanguage';

export const createStaffActivityStyles = (colors: typeof lightTheme.colors) =>
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
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 12,
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
    iconBox: {
      width: 36,
      height: 36,
      borderRadius: RADIUS.control,
      backgroundColor: colors.feedback.warningBg,
      alignItems: 'center',
      justifyContent: 'center',
    },
    summaryRow: {
      flexDirection: 'row',
      gap: 10,
      marginBottom: 12,
    },
    summaryItem: {
      flex: 1,
      backgroundColor: colors.background.paper,
      borderRadius: RADIUS.control,
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
      fontWeight: '700',
      letterSpacing: 0.6,
      textTransform: 'uppercase',
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
      paddingVertical: 8,
    },
  });
