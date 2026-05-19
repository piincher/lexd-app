import { StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';

export const createStyles = (colors: any, isDark?: boolean) => StyleSheet.create({
  card: {
    backgroundColor: colors.background.card,
    borderRadius: Theme.radius['2xl'],
    marginHorizontal: Theme.spacing.lg,
    marginVertical: Theme.spacing.md,
    ...Theme.shadows.md,
  },
  header: {
    marginBottom: Theme.spacing.lg,
    paddingBottom: Theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[100],
  },
  containerNumber: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.neutral[800],
    letterSpacing: 0.5,
  },
  progressContainer: {
    marginBottom: Theme.spacing.lg,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: colors.neutral[200],
    borderRadius: Theme.radius.full,
    overflow: 'hidden',
    marginBottom: Theme.spacing.sm,
  },
  progressBar: {
    height: '100%',
    borderRadius: Theme.radius.full,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.neutral[600],
    textAlign: 'center',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.lg,
  },
  statusIconContainer: {
    width: 56,
    height: 56,
    borderRadius: Theme.radius.xl,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Theme.spacing.lg,
  },
  statusInfo: {
    flex: 1,
  },
  statusLabel: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.neutral[800],
    marginBottom: Theme.spacing.xs,
  },
  timestamp: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.neutral[500],
  },
  locationContainer: {
    padding: Theme.spacing.md,
    backgroundColor: colors.neutral[50],
    borderRadius: Theme.radius.lg,
  },
  locationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.xs,
    gap: Theme.spacing.xs,
  },
  locationLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.neutral[500],
    textTransform: 'uppercase',
  },
  locationName: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.neutral[800],
  },
  locationCountry: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.neutral[600],
    marginTop: 2,
  },
  locationDescription: {
    fontSize: 13,
    fontWeight: '400',
    color: colors.neutral[500],
    marginTop: Theme.spacing.sm,
    fontStyle: 'italic',
  },
  loadingContainer: {
    padding: Theme.spacing.xl,
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.neutral[500],
  },
});
