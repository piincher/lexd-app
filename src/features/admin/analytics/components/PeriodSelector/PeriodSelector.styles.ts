import { StyleSheet } from 'react-native';

export const createStyles = (colors: any, isDark?: boolean) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
  },
  button: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: colors.neutral[100],
  },
  buttonActive: {
    backgroundColor: colors.primary.main,
  },
  buttonText: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.text.secondary,
  },
  buttonTextActive: {
    color: colors.text.inverse,
  },
});
