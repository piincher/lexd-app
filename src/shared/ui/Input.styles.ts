import { StyleSheet } from 'react-native';

export const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      marginBottom: 16,
    },
    fullWidth: {
      width: '100%',
    },
    label: {
      fontSize: 14,
      fontWeight: '600',
      marginBottom: 8,
      color: colors.text.secondary,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.background.card,
    },
    default: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 8,
    },
    filled: {
      backgroundColor: colors.neutral[200],
      borderRadius: 8,
    },
    outlined: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 12,
    },
    underlined: {
      borderBottomWidth: 2,
      borderBottomColor: colors.border,
      backgroundColor: 'transparent',
    },
    small: {
      paddingVertical: 8,
      paddingHorizontal: 12,
      minHeight: 40,
    },
    medium: {
      paddingVertical: 12,
      paddingHorizontal: 16,
      minHeight: 48,
    },
    large: {
      paddingVertical: 16,
      paddingHorizontal: 20,
      minHeight: 56,
    },
    errorBorder: {
      borderColor: colors.status.error,
    },
    disabled: {
      backgroundColor: colors.neutral[200],
      opacity: 0.7,
    },
    input: {
      flex: 1,
      fontSize: 16,
      color: colors.text.primary,
    },
    smallInput: {
      fontSize: 14,
    },
    mediumInput: {
      fontSize: 16,
    },
    largeInput: {
      fontSize: 18,
    },
    inputWithLeftIcon: {
      marginLeft: 8,
    },
    inputWithRightIcon: {
      marginRight: 8,
    },
    leftIcon: {
      marginLeft: 4,
    },
    rightIcon: {
      marginRight: 4,
    },
    helperText: {
      fontSize: 12,
      color: colors.text.secondary,
      marginTop: 4,
    },
    errorText: {
      fontSize: 12,
      color: colors.status.error,
      marginTop: 4,
    },
  });
