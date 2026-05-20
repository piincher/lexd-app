import { StyleSheet } from 'react-native';

export const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 16,
      gap: 12,
    },
    left: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      flex: 1,
    },
    iconCircle: {
      width: 44,
      height: 44,
      borderRadius: 22,
      alignItems: 'center',
      justifyContent: 'center',
    },
    textBlock: {
      flex: 1,
      gap: 2,
    },
    title: {
      fontSize: 15,
      fontWeight: '700',
      color: colors.text.primary,
    },
    subtitle: {
      fontSize: 13,
      color: colors.text.secondary,
      lineHeight: 18,
    },
    toggleTrack: {
      width: 52,
      height: 30,
      borderRadius: 15,
      backgroundColor: colors.neutral[300],
      padding: 3,
      justifyContent: 'center',
    },
    toggleTrackActive: {
      backgroundColor: colors.status.success,
    },
    toggleDisabled: {
      opacity: 0.5,
    },
    toggleThumb: {
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: colors.neutral.white,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation: 2,
    },
    toggleThumbActive: {
      transform: [{ translateX: 22 }],
    },
  });
