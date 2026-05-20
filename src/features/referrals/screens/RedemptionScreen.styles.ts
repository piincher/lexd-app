import { StyleSheet } from 'react-native';

export const createStyles = (colors: any) =>
  StyleSheet.create({
    content: {
      flex: 1,
    },
    scroll: {
      padding: 16,
      gap: 14,
      paddingBottom: 32,
    },
    statsRow: {
      flexDirection: 'row',
      gap: 10,
    },
    statCard: {
      flex: 1,
      borderRadius: 10,
      padding: 12,
      alignItems: 'center',
      gap: 6,
    },
    statValue: {
      fontSize: 15,
      fontWeight: '800',
      color: colors.text.primary,
    },
    statLabel: {
      fontSize: 11,
      color: colors.text.secondary,
      fontWeight: '600',
    },
    newRequestButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      minHeight: 48,
      borderRadius: 10,
      backgroundColor: colors.primary.main,
    },
    newRequestText: {
      color: colors.text.inverse,
      fontSize: 14,
      fontWeight: '700',
    },
    state: {
      minHeight: 200,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 12,
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
    listCard: {
      borderRadius: 12,
      padding: 14,
      gap: 8,
      backgroundColor: colors.background.card,
      borderWidth: 1,
      borderColor: colors.border,
    },
    listHeader: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: 12,
    },
    listPoints: {
      fontSize: 15,
      fontWeight: '700',
      color: colors.text.primary,
    },
    listValue: {
      fontSize: 13,
      color: colors.text.secondary,
      marginTop: 2,
    },
    listDate: {
      fontSize: 12,
      color: colors.text.disabled,
    },
    detailWrapper: {
      marginTop: 8,
      gap: 12,
    },
    cancelButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
      minHeight: 42,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.status.error + '40',
      backgroundColor: colors.status.error + '08',
    },
    cancelButtonDisabled: {
      opacity: 0.5,
    },
    cancelText: {
      fontSize: 13,
      fontWeight: '700',
    },
  });
