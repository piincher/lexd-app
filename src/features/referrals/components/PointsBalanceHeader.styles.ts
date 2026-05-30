import { StyleSheet } from 'react-native';

export const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      borderRadius: 16,
      padding: 20,
      backgroundColor: colors.background.card,
      borderWidth: 1,
      borderColor: colors.border,
      alignItems: 'center',
      gap: 8,
    },
    iconCircle: {
      width: 48,
      height: 48,
      borderRadius: 24,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.primary.main + '18',
    },
    label: {
      fontSize: 13,
      color: colors.text.secondary,
      fontWeight: '600',
    },
    value: {
      fontSize: 36,
      fontWeight: '900',
      color: colors.text.primary,
    },
    subValue: {
      fontSize: 14,
      color: colors.text.secondary,
      fontWeight: '600',
    },
  });
