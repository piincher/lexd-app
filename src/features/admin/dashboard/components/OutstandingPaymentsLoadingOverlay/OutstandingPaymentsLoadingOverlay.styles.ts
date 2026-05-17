import { StyleSheet } from 'react-native';

export const getStyles = (colors: any) =>
  StyleSheet.create({
    loadingOverlay: {
      ...StyleSheet.absoluteFillObject,
      alignItems: 'center',
      justifyContent: 'center',
    },
    loadingOverlayDark: {
      backgroundColor: colors.background.overlay,
    },
    loadingOverlayLight: {
      backgroundColor: colors.background.overlay,
    },
  });
