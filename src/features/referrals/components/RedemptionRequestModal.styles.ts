import { StyleSheet } from 'react-native';

export const createStyles = (colors: any) =>
  StyleSheet.create({
    backdrop: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
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
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      padding: 20,
      paddingBottom: 32,
      gap: 14,
      backgroundColor: colors.background.card,
      maxHeight: '90%',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 4,
    },
    title: {
      color: colors.text.primary,
      fontSize: 18,
      fontWeight: '800',
    },
    iconButton: {
      width: 36,
      height: 36,
      borderRadius: 18,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.background.paper,
    },
    disabledBox: {
      borderRadius: 10,
      padding: 16,
      alignItems: 'center',
      gap: 10,
      marginVertical: 8,
    },
    disabledText: {
      fontSize: 14,
      fontWeight: '600',
      textAlign: 'center',
    },
    copy: {
      color: colors.text.secondary,
      fontSize: 14,
      lineHeight: 20,
    },
    infoBox: {
      borderRadius: 10,
      padding: 14,
      gap: 8,
      backgroundColor: colors.background.paper,
    },
    infoRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    infoText: {
      color: colors.text.primary,
      fontSize: 13,
      fontWeight: '600',
    },
    quickSelectRow: {
      flexDirection: 'row',
      gap: 10,
    },
    quickButton: {
      flex: 1,
      minHeight: 42,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.background.paper,
    },
    quickButtonActive: {
      backgroundColor: colors.primary.main + '18',
      borderColor: colors.primary.main,
    },
    quickButtonText: {
      fontSize: 14,
      fontWeight: '700',
      color: colors.text.primary,
    },
    quickButtonTextActive: {
      color: colors.primary.main,
    },
    input: {
      minHeight: 48,
      borderWidth: 1,
      borderRadius: 10,
      paddingHorizontal: 14,
      color: colors.text.primary,
      borderColor: colors.border,
      backgroundColor: colors.background.default,
      fontSize: 15,
    },
    inputError: {
      borderColor: colors.status.error,
    },
    noteInput: {
      minHeight: 80,
      paddingTop: 12,
      textAlignVertical: 'top',
    },
    errorText: {
      fontSize: 12,
      fontWeight: '600',
      marginTop: -8,
    },
    preview: {
      color: colors.text.primary,
      fontSize: 15,
      fontWeight: '700',
    },
    previewMuted: {
      color: colors.text.disabled,
    },
    submitButton: {
      minHeight: 50,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.primary.main,
      marginTop: 4,
    },
    submitDisabled: {
      opacity: 0.45,
    },
    submitText: {
      color: colors.text.inverse,
      fontSize: 15,
      fontWeight: '800',
    },
  });
