import { StyleSheet } from 'react-native';

export const createStyles = (colors: any) =>
  StyleSheet.create({
    content: {
      flex: 1,
    },
    headerWrap: {
      paddingHorizontal: 16,
      paddingTop: 16,
      paddingBottom: 16,
      gap: 16,
    },
    emptyWrap: {
      paddingHorizontal: 16,
      paddingTop: 8,
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
  });
