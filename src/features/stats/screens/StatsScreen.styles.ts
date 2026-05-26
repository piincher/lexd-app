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
    zone: {
      marginTop: 20,
    },
    zoneInnerGap: {
      height: 12,
    },
    footerZone: {
      marginTop: 20,
    },
    bottomPadding: {
      height: 40,
    },
  });
