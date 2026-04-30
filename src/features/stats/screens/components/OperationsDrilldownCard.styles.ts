import { StyleSheet } from 'react-native';
import { Fonts } from '@src/constants/Fonts';
import { Theme, lightTheme } from '@src/constants/Theme';

export const createOperationsDrilldownStyles = (colors: typeof lightTheme.colors) =>
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
    sectionTitle: {
      fontSize: 11,
      fontFamily: Fonts.bold,
      fontWeight: '700',
      color: colors.text.secondary,
      marginTop: 8,
      marginBottom: 4,
      textTransform: 'uppercase',
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 9,
      borderTopWidth: 1,
      borderTopColor: colors.border,
      gap: 10,
    },
    rowMain: {
      flex: 1,
    },
    rowTitle: {
      fontSize: 12,
      fontFamily: Fonts.bold,
      fontWeight: '600',
      color: colors.text.primary,
    },
    rowMeta: {
      fontSize: 10,
      fontFamily: Fonts.regular,
      color: colors.text.disabled,
      marginTop: 2,
    },
    value: {
      fontSize: 12,
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
