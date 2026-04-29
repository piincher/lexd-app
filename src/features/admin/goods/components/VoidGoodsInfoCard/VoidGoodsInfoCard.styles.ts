import { StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';

export const createStyles = (colors: any) => StyleSheet.create({
  card: {
    marginBottom: Theme.spacing.lg,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text?.muted || '#9CA3AF',
    textTransform: 'uppercase',
    marginTop: Theme.spacing.sm,
  },
  value: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text?.primary || '#1F2937',
    marginTop: Theme.spacing.xs,
  },
});
