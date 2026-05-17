import { StyleSheet } from 'react-native';
import { Theme, AppTheme } from '@src/constants/Theme';

export const createStyles = (colors: AppTheme['colors']) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
  },
  button: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: Theme.colors.neutral[100],
  },
  buttonActive: {
    backgroundColor: colors.primary.main,
  },
  buttonText: {
    fontSize: 12,
    fontWeight: '500',
    color: Theme.colors.text.secondary,
  },
  buttonTextActive: {
    color: colors.text.inverse,
  },
});
