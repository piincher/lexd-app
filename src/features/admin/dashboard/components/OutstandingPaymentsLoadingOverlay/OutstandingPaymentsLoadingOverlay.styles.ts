import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingOverlayDark: {
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  loadingOverlayLight: {
    backgroundColor: 'rgba(255,255,255,0.6)',
  },
});
