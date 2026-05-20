import { StyleSheet } from 'react-native';

export const createStyles = (colors: any) =>
  StyleSheet.create({
    content: {
      flex: 1,
    },
    scroll: {
      padding: 16,
      gap: 20,
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
    ledgerSection: {
      gap: 10,
    },
    ledgerHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    ledgerTitle: {
      fontSize: 16,
      fontWeight: '800',
      color: colors.text.primary,
    },
    ledgerLink: {
      fontSize: 14,
      fontWeight: '700',
    },
    referralCard: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderRadius: 12,
      padding: 14,
      gap: 10,
    },
    referralLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      flex: 1,
    },
    referralTitle: {
      fontSize: 14,
      fontWeight: '700',
    },
    referralSubtitle: {
      fontSize: 12,
      color: colors.text.secondary,
      marginTop: 2,
    },
  });
