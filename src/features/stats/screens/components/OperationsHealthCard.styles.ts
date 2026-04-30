import { StyleSheet } from 'react-native';
import { Fonts } from '@src/constants/Fonts';
import { Theme, lightTheme } from '@src/constants/Theme';

export const createOperationsHealthStyles = (colors: typeof lightTheme.colors) =>
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
      borderRadius: 12,
      padding: 12,
    },
    metricValue: {
      fontSize: 18,
      fontFamily: Fonts.bold,
      fontWeight: '700',
    },
    metricLabel: {
      fontSize: 10,
      fontFamily: Fonts.medium,
      color: colors.text.disabled,
      marginTop: 3,
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
      fontSize: 11,
      fontFamily: Fonts.medium,
      color: colors.text.secondary,
    },
    stuckDays: {
      fontSize: 11,
      fontFamily: Fonts.bold,
      color: colors.status.warning,
    },
    loaderGrid: {
      marginTop: 14,
    },
  });
