import { StyleSheet } from 'react-native';
import { HAIRLINE, RADIUS } from '@src/shared/ui/designLanguage';

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
      borderTopLeftRadius: RADIUS.sheet,
      borderTopRightRadius: RADIUS.sheet,
      padding: 20,
      gap: 14,
      borderWidth: HAIRLINE,
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
      borderRadius: RADIUS.control,
      padding: 10,
      gap: 4,
    },
    noteLabel: {
      fontSize: 11,
      fontWeight: '700',
      letterSpacing: 0.7,
      textTransform: 'uppercase',
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
      borderRadius: RADIUS.control,
    },
    cancelButton: {
      borderWidth: HAIRLINE,
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
