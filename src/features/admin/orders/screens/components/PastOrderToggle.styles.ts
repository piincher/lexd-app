import { StyleSheet } from 'react-native';
import { Fonts } from '@src/constants/Fonts';

export const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      padding: 4,
      borderRadius: 12,
      backgroundColor: colors.background.paper,
      marginHorizontal: 16,
      marginBottom: 16,
    },
    tab: {
      flex: 1,
      paddingVertical: 10,
      alignItems: 'center',
      borderRadius: 8,
    },
    activeTab: {
      backgroundColor: colors.primary.main,
    },
    tabText: {
      fontFamily: Fonts.semiBold,
      fontSize: 14,
      color: colors.text.secondary,
    },
    activeTabText: {
      color: colors.text.inverse,
    },
    indicator: {
      width: 4,
      height: 4,
      borderRadius: 2,
      backgroundColor: colors.primary.main,
      marginTop: 4,
    },
    toggleContainer: {
      flexDirection: 'row',
      padding: 4,
      borderRadius: 12,
      backgroundColor: colors.background.paper,
      marginHorizontal: 16,
      marginBottom: 16,
    },
    toggleButton: {
      flex: 1,
      paddingVertical: 10,
      alignItems: 'center',
      borderRadius: 8,
    },
    activeToggle: {
      backgroundColor: colors.primary.main,
    },
    toggleText: {
      fontFamily: Fonts.semiBold,
      fontSize: 14,
      color: colors.text.secondary,
    },
    activeToggleText: {
      color: colors.text.inverse,
    },
    toggleSeparator: {
      width: 1,
      backgroundColor: colors.border,
      marginVertical: 8,
    },
  });
