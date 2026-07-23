import { StyleSheet } from 'react-native';
import { Fonts } from '@src/constants/Fonts';
import { lightTheme } from '@src/constants/Theme';
import { HAIRLINE, OVERLINE, RADIUS } from '@src/shared/ui/designLanguage';

export const createOperationsHealthStyles = (colors: typeof lightTheme.colors) =>
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
    iconBox: {
      width: 36,
      height: 36,
      borderRadius: RADIUS.control,
      backgroundColor: colors.feedback.infoBg,
      alignItems: 'center',
      justifyContent: 'center',
    },
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 10,
    },
    metric: {
      flex: 1,
      minWidth: '46%',
      backgroundColor: colors.background.paper,
      borderRadius: RADIUS.control,
      padding: 12,
    },
    metricValue: {
      fontSize: 20,
      fontFamily: Fonts.bold,
      fontWeight: '700',
    },
    metricLabel: {
      ...OVERLINE,
      fontFamily: Fonts.medium,
      color: colors.text.disabled,
      marginTop: 4,
    },
    stuckList: {
      marginTop: 14,
      paddingTop: 12,
      borderTopWidth: 1,
      borderTopColor: colors.border,
      gap: 8,
    },
    stuckRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 10,
    },
    stuckText: {
      flex: 1,
      fontSize: 12,
      fontFamily: Fonts.medium,
      color: colors.text.secondary,
    },
    stuckDays: {
      fontSize: 12,
      fontFamily: Fonts.bold,
      color: colors.status.warning,
    },
    loaderGrid: {
      marginTop: 14,
    },
  });
