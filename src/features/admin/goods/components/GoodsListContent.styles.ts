import { StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';

export const createStyles = (colors: any, isDark?: boolean) => StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Theme.spacing['4xl'],
    paddingHorizontal: Theme.spacing.xl,
  },
  loadingText: {
    marginTop: Theme.spacing.lg,
    fontSize: 16,
    color: colors.text.secondary,
    fontWeight: '500',
  },
  errorIcon: {
    width: 120,
    height: 120,
    borderRadius: Theme.radius['3xl'],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Theme.spacing.xl,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: Theme.spacing.sm,
  },
  errorSubtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.neutral[500],
    textAlign: 'center',
    marginBottom: Theme.spacing.xl,
  },
  retryButton: {
    borderRadius: Theme.radius.full,
    overflow: 'hidden',
  },
  retryGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Theme.spacing.md,
    paddingHorizontal: Theme.spacing.xl,
  },
  retryText: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text.inverse,
    marginLeft: Theme.spacing.sm,
  },
  listContent: {
    paddingTop: Theme.spacing.sm,
    paddingBottom: 120,
  },
});
