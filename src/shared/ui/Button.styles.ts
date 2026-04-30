import { StyleSheet } from 'react-native';

export const createStyles = (colors: any) =>
  StyleSheet.create({
    base: {
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
    },
    content: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    primary: { backgroundColor: colors.primary.main },
    secondary: { backgroundColor: colors.background.paper },
    outline: {
      backgroundColor: 'transparent',
      borderWidth: 2,
      borderColor: colors.primary.main,
    },
    ghost: { backgroundColor: 'transparent' },
    danger: { backgroundColor: colors.status.error },
    small: { paddingVertical: 8, paddingHorizontal: 16, minHeight: 36 },
    medium: { paddingVertical: 12, paddingHorizontal: 24, minHeight: 48 },
    large: { paddingVertical: 16, paddingHorizontal: 32, minHeight: 56 },
    fullWidth: { width: '100%' },
    disabled: { opacity: 0.5 },
    textBase: { fontWeight: '600' },
    primaryText: { color: colors.text.inverse },
    secondaryText: { color: colors.text.primary },
    outlineText: { color: colors.primary.main },
    ghostText: { color: colors.primary.main },
    dangerText: { color: colors.text.inverse },
    smallText: { fontSize: 14 },
    mediumText: { fontSize: 16 },
    largeText: { fontSize: 18 },
    disabledText: { color: colors.text.disabled },
    iconLeft: { marginRight: 8 },
    iconRight: { marginLeft: 8 },
  });
