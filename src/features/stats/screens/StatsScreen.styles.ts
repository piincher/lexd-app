import { StyleSheet } from 'react-native';

export const createStatsStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background.default,
    },
    scrollContent: {
      flexGrow: 1,
    },
    sectionGap: {
      height: 14,
    },
    bottomPadding: {
      height: 32,
    },
  });
