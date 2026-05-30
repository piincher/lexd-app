import { StyleSheet } from 'react-native';

export const createStyles = (colors: any) =>
  StyleSheet.create({
    content: {
      flex: 1,
    },
    header: {
      paddingHorizontal: 16,
      paddingTop: 16,
      paddingBottom: 12,
      gap: 12,
    },
    grid: {
      paddingHorizontal: 16,
      paddingBottom: 32,
    },
    state: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 12,
      padding: 24,
    },
    stateText: {
      fontSize: 15,
      color: colors.text.secondary,
      textAlign: 'center',
    },
    retryText: {
      fontSize: 14,
      fontWeight: '700',
      color: colors.primary.main,
    },
    fabRow: {
      position: 'absolute',
      right: 16,
      bottom: 16,
      gap: 10,
      alignItems: 'flex-end',
    },
    fab: {
      width: 48,
      height: 48,
      borderRadius: 24,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.primary.main,
      shadowColor: colors.text.primary,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 4,
    },
  });
