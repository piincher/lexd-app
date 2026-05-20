import { StyleSheet } from 'react-native';

export const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      gap: 12,
    },
    modeRow: {
      flexDirection: 'row',
      gap: 10,
    },
    modeButton: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
      minHeight: 40,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.background.paper,
    },
    modeButtonActive: {
      borderColor: colors.primary.main,
      backgroundColor: colors.primary.main + '10',
    },
    modeText: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.text.secondary,
    },
    modeTextActive: {
      color: colors.primary.main,
      fontWeight: '700',
    },
    inputRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    inputLabel: {
      fontSize: 13,
      fontWeight: '600',
      color: colors.text.secondary,
      width: 100,
    },
    input: {
      flex: 1,
      minHeight: 44,
      borderWidth: 1,
      borderRadius: 8,
      borderColor: colors.border,
      backgroundColor: colors.background.paper,
      color: colors.text.primary,
      fontSize: 15,
      fontWeight: '600',
      paddingHorizontal: 12,
    },
    resultBox: {
      borderRadius: 10,
      padding: 14,
      gap: 8,
      backgroundColor: colors.background.paper,
      borderWidth: 1,
      borderColor: colors.border,
    },
    resultRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    resultLabel: {
      fontSize: 13,
      color: colors.text.secondary,
    },
    resultValue: {
      fontSize: 15,
      fontWeight: '800',
      color: colors.text.primary,
    },
    formula: {
      fontSize: 11,
      color: colors.text.disabled,
      textAlign: 'center',
      fontStyle: 'italic',
    },
  });
