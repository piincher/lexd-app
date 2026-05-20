import { StyleSheet } from 'react-native';

export const createStyles = (colors: any) =>
  StyleSheet.create({
    keyboardView: {
      flex: 1,
    },
    scroll: {
      padding: 16,
      gap: 16,
      paddingBottom: 100,
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
    statusBanner: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: 8,
      borderRadius: 8,
      padding: 10,
      marginTop: 4,
    },
    statusText: {
      flex: 1,
      fontSize: 12,
      fontWeight: '600',
      lineHeight: 17,
    },
    ledgerError: {
      alignItems: 'center',
      padding: 16,
    },
    ledgerErrorText: {
      fontSize: 14,
      color: colors.text.secondary,
    },
    bottomPadding: {
      height: 20,
    },
    actionBar: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 12,
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderTopWidth: 1,
      backgroundColor: colors.background.card,
    },
    resetButton: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.background.paper,
    },
    resetText: {
      fontSize: 14,
      fontWeight: '700',
      color: colors.text.secondary,
    },
    saveButton: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
      minHeight: 46,
      borderRadius: 10,
      backgroundColor: colors.text.disabled,
    },
    saveText: {
      fontSize: 14,
      fontWeight: '800',
      color: colors.text.inverse,
    },
    actionDisabled: {
      opacity: 0.45,
    },
  });
