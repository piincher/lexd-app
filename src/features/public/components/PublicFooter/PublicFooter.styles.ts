import { StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';

export const styles = StyleSheet.create({
  container: {
    marginTop: Theme.spacing['3xl'],
    paddingHorizontal: Theme.spacing.lg,
    alignItems: 'center',
    paddingBottom: Theme.spacing['4xl'],
  },
  divider: {
    width: '100%',
    marginBottom: Theme.spacing.lg,
  },
  linksRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Theme.spacing.xl,
    marginBottom: Theme.spacing.lg,
  },
  linkItem: {
    padding: Theme.spacing.sm,
  },
  linkText: {
    fontSize: 14,
    color: Theme.neutral[600],
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Theme.spacing.md,
    marginBottom: Theme.spacing.lg,
  },
  socialButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  copyright: {
    fontSize: 12,
    color: Theme.neutral[400],
  },
  contact: {
    fontSize: 12,
    color: Theme.neutral[400],
    marginTop: Theme.spacing.xs,
  },
});
