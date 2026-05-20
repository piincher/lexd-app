import { StyleSheet } from 'react-native';

export const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      gap: 6,
    },
    labelRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    label: {
      fontSize: 13,
      fontWeight: '700',
      color: colors.text.secondary,
      textTransform: 'uppercase',
      letterSpacing: 0.3,
    },
    inputRow: {
      flexDirection: 'row',
      alignItems: 'center',
      minHeight: 48,
      borderWidth: 1,
      borderRadius: 10,
      borderColor: colors.border,
      backgroundColor: colors.background.paper,
      paddingHorizontal: 12,
      gap: 8,
    },
    inputRowError: {
      borderColor: colors.status.error,
      backgroundColor: colors.status.error + '06',
    },
    inputRowDisabled: {
      opacity: 0.5,
      backgroundColor: colors.background.default,
    },
    input: {
      flex: 1,
      color: colors.text.primary,
      fontSize: 15,
      fontWeight: '600',
      paddingVertical: 10,
    },
    suffix: {
      fontSize: 14,
      fontWeight: '700',
      color: colors.text.secondary,
    },
    errorRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    errorText: {
      fontSize: 12,
      fontWeight: '600',
    },
    helpText: {
      fontSize: 12,
      color: colors.text.secondary,
      lineHeight: 16,
    },
  });
