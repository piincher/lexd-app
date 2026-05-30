import { StyleSheet } from 'react-native';

export const createStyles = (colors: any) =>
  StyleSheet.create({
    backdrop: {
      flex: 1,
      backgroundColor: colors.background.overlay || 'rgba(0,0,0,0.5)',
      justifyContent: 'flex-end',
    },
    keyboardView: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    scrollContent: {
      flexGrow: 1,
      justifyContent: 'flex-end',
    },
    sheet: {
      backgroundColor: colors.background.card,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: 20,
      gap: 14,
      borderWidth: 1,
      borderColor: colors.border,
      borderBottomWidth: 0,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    title: {
      fontSize: 18,
      fontWeight: '800',
      color: colors.text.primary,
    },
    iconButton: {
      width: 32,
      height: 32,
      borderRadius: 16,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.background.paper,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      minHeight: 28,
    },
    rowLabel: {
      fontSize: 14,
      color: colors.text.secondary,
      fontWeight: '600',
      width: 100,
    },
    rowValue: {
      flex: 1,
      fontSize: 14,
      fontWeight: '700',
      color: colors.text.primary,
      textAlign: 'right',
    },
    noteBox: {
      backgroundColor: colors.background.paper,
      borderRadius: 8,
      padding: 10,
      gap: 4,
    },
    noteLabel: {
      fontSize: 12,
      fontWeight: '700',
      color: colors.text.secondary,
    },
    noteText: {
      fontSize: 13,
      color: colors.text.primary,
      lineHeight: 18,
    },
    actions: {
      flexDirection: 'row',
      gap: 10,
      marginTop: 6,
    },
    button: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 48,
      borderRadius: 10,
    },
    cancelButton: {
      borderWidth: 1,
      backgroundColor: colors.background.paper,
    },
    cancelText: {
      fontSize: 14,
      fontWeight: '700',
    },
    confirmButton: {
      backgroundColor: colors.primary.main,
    },
    confirmDisabled: {
      opacity: 0.5,
    },
    confirmText: {
      fontSize: 14,
      fontWeight: '700',
      color: colors.text.inverse,
    },
  });
