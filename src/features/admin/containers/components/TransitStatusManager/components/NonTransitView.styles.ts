import { StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Theme.spacing.lg,
    paddingTop: Theme.spacing.lg,
  },
  card: {
    backgroundColor: Theme.colors.background.card,
    borderRadius: Theme.radius['2xl'],
    marginBottom: Theme.spacing.lg,
    ...Theme.shadows.md,
  },
  header: {
    marginBottom: Theme.spacing.lg,
    paddingBottom: Theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Theme.neutral[100],
  },
  containerNumber: {
    fontSize: 18,
    fontWeight: '800',
    color: Theme.neutral[800],
    letterSpacing: 0.5,
  },
  statusSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.lg,
  },
  iconContainer: {
    width: 64,
    height: 64,
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
    color: Theme.neutral[800],
    marginBottom: Theme.spacing.xs,
  },
  currentStatusText: {
    fontSize: 14,
    fontWeight: '500',
    color: Theme.neutral[500],
  },
  divider: {
    height: 1,
    backgroundColor: Theme.neutral[100],
    marginBottom: Theme.spacing.lg,
  },
  infoSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: Theme.primary[50],
    borderRadius: Theme.radius.lg,
    padding: Theme.spacing.lg,
    marginBottom: Theme.spacing.md,
  },
  infoIconContainer: {
    marginRight: Theme.spacing.md,
    marginTop: 2,
  },
  infoText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: Theme.primary[700],
    lineHeight: 22,
  },
  descriptionSection: {
    backgroundColor: Theme.neutral[50],
    borderRadius: Theme.radius.lg,
    padding: Theme.spacing.md,
  },
  descriptionText: {
    fontSize: 13,
    fontWeight: '400',
    color: Theme.neutral[500],
    lineHeight: 20,
    textAlign: 'center',
  },
  helperCard: {
    backgroundColor: Theme.colors.background.card,
    borderRadius: Theme.radius['2xl'],
    ...Theme.shadows.sm,
  },
  helperHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
    gap: Theme.spacing.sm,
  },
  helperTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Theme.neutral[700],
  },
  helperText: {
    fontSize: 14,
    fontWeight: '400',
    color: Theme.neutral[500],
    lineHeight: 20,
  },
  waypointPreviewSection: {
    backgroundColor: Theme.neutral[50],
    borderRadius: Theme.radius.lg,
    padding: Theme.spacing.md,
    marginBottom: Theme.spacing.md,
  },
  waypointPreviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.xs,
    gap: Theme.spacing.sm,
  },
  waypointPreviewTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Theme.neutral[600],
  },
  waypointCountText: {
    fontSize: 15,
    fontWeight: '500',
    color: Theme.neutral[700],
    paddingLeft: Theme.spacing.lg + Theme.spacing.sm,
  },
});
