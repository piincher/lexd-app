import { StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';

export const createStyles = (colors: any) => StyleSheet.create({
  card: {
    backgroundColor: colors.feedback?.errorBg || '#FEF2F2',
    borderLeftWidth: 4,
    borderLeftColor: colors.status?.error || '#DC2626',
    marginBottom: Theme.spacing.lg,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.status?.error || '#DC2626',
    marginBottom: Theme.spacing.sm,
  },
  text: {
    fontSize: 14,
    color: colors.text?.secondary || '#6B7280',
    lineHeight: 20,
  },
});
