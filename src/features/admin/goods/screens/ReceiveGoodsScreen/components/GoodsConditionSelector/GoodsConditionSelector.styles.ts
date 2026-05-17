import { StyleSheet } from 'react-native';

export const createStyles = (colors: any) =>
  StyleSheet.create({
    card: {
      marginVertical: 8,
      borderRadius: 12,
      backgroundColor: colors.background.card,
    },
    cardContent: {
      padding: 16,
    },
    sectionLabel: {
      fontSize: 14,
      fontWeight: '700',
      marginBottom: 16,
      color: colors.text.primary,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    optionsContainer: {
      gap: 12,
    },
    option: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: colors.border,
      backgroundColor: colors.background.paper,
    },
    optionSelected: {
      backgroundColor: colors.background.card,
      borderWidth: 2,
    },
    iconContainer: {
      width: 48,
      height: 48,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
    },
    textContainer: {
      flex: 1,
    },
    optionLabel: {
      fontSize: 15,
      fontWeight: '700',
      marginBottom: 4,
    },
    optionDescription: {
      fontSize: 13,
      color: colors.text.secondary,
    },
    radio: {
      width: 24,
      height: 24,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: colors.neutral[200],
      justifyContent: 'center',
      alignItems: 'center',
    },
    radioSelected: {
      borderColor: colors.status.success,
    },
    radioInner: {
      width: 12,
      height: 12,
      borderRadius: 6,
    },
    errorText: {
      color: colors.status.error,
      fontSize: 12,
      marginTop: 8,
      marginLeft: 4,
    },
  });
