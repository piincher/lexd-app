import { StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';

export const styles = StyleSheet.create({
  container: {
    marginTop: Theme.spacing['2xl'],
    paddingHorizontal: Theme.spacing.lg,
  },
  surface: {
    padding: Theme.spacing.xl,
    borderRadius: Theme.radius.xl,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: Theme.neutral[800],
    marginBottom: Theme.spacing.sm,
  },
  subtitle: {
    fontSize: 14,
    color: Theme.neutral[500],
    textAlign: 'center',
    marginBottom: Theme.spacing.lg,
  },
  button: {
    width: '100%',
    borderRadius: Theme.radius.lg,
  },
  buttonContent: {
    height: 50,
  },
  hint: {
    fontSize: 12,
    color: Theme.neutral[400],
    marginTop: Theme.spacing.md,
  },
});
