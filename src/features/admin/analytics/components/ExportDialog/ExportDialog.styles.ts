import { StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';

export const styles = StyleSheet.create({
  exportText: {
    fontSize: 14,
    color: Theme.neutral[600],
    marginBottom: Theme.spacing.md,
  },
  exportButtons: {
    gap: Theme.spacing.sm,
  },
  exportButton: {
    marginVertical: Theme.spacing.xs,
  },
});
