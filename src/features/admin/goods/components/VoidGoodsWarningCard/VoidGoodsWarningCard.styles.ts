import { StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';

export const createStyles = (colors: any) => StyleSheet.create({
  card: {
    backgroundColor: colors.feedback.errorBg,
    borderLeftWidth: 4,
    borderLeftColor: colors.status.error,
    marginBottom: Theme.spacing.lg,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.status.error,
    marginBottom: Theme.spacing.sm,
  },
  text: {
    fontSize: 14,
    color: colors.text.secondary,
    lineHeight: 20,
  },
});
