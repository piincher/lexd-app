import { StyleSheet } from 'react-native';
import { Fonts } from '@src/constants/Fonts';
import { lightTheme } from '@src/constants/Theme';

export const createOperationsDrilldownStyles = (colors: typeof lightTheme.colors) =>
  StyleSheet.create({
    container: {
      marginHorizontal: 20,
      backgroundColor: colors.background.card,
      borderRadius: 16,
      padding: 16,
      borderWidth: 1,
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
    sectionTitle: {
      fontSize: 11,
      fontFamily: Fonts.bold,
      fontWeight: '700',
      color: colors.text.secondary,
      marginTop: 10,
      marginBottom: 6,
      letterSpacing: 0.3,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 10,
      borderTopWidth: 1,
      borderTopColor: colors.border,
      gap: 10,
    },
    rowMain: {
      flex: 1,
    },
    rowTitle: {
      fontSize: 13,
      fontFamily: Fonts.bold,
      fontWeight: '600',
      color: colors.text.primary,
    },
    rowMeta: {
      fontSize: 11,
      fontFamily: Fonts.regular,
      color: colors.text.disabled,
      marginTop: 2,
    },
    value: {
      fontSize: 13,
      fontFamily: Fonts.bold,
      fontWeight: '700',
      textAlign: 'right',
    },
    emptyText: {
      fontSize: 12,
      fontFamily: Fonts.regular,
      color: colors.text.disabled,
      paddingVertical: 8,
    },
    loaderGap: {
      gap: 10,
    },
  });
