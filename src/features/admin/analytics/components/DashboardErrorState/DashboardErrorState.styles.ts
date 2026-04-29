import { StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.neutral[50],
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing['3xl'],
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Theme.neutral[800],
    marginTop: Theme.spacing.lg,
  },
  errorText: {
    fontSize: 14,
    color: Theme.neutral[500],
    textAlign: 'center',
    marginTop: Theme.spacing.sm,
  },
  retryButton: {
    marginTop: Theme.spacing.xl,
  },
});
