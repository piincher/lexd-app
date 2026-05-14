import { StyleSheet, Platform } from 'react-native';
import { Theme } from '@src/constants/Theme';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: Theme.spacing.md,
  },
  sequenceBadge: {
    width: 40,
    alignItems: 'center',
    marginRight: Theme.spacing.sm,
  },
  sequenceGradient: {
    width: 32,
    height: 32,
    borderRadius: Theme.radius.full,
    justifyContent: 'center',
    alignItems: 'center',
    ...Theme.shadows.sm,
  },
  sequenceNumber: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFF',
  },
  progressLineContainer: {
    position: 'absolute',
    left: 16,
    top: 36,
    bottom: -16,
    width: 4,
    alignItems: 'center',
  },
  progressLine: {
    width: 2,
    height: '100%',
    borderRadius: 1,
  },
  progressLineComplete: {
    backgroundColor: Theme.status.success,
  },
  progressLinePending: {
    backgroundColor: Theme.neutral[200],
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: Theme.neutral[300],
  },
  content: {
    flex: 1,
    backgroundColor: Theme.colors.background.card,
    borderRadius: Theme.radius.lg,
    padding: Theme.spacing.md,
    ...Theme.shadows.sm,
    borderLeftWidth: 4,
    borderLeftColor: Theme.neutral[200],
  },
  contentLoaded: {
    borderLeftColor: Theme.status.success,
    backgroundColor: Theme.colors.status.success + '15',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Theme.spacing.sm,
  },
  goodsIdContainer: {
    flex: 1,
    marginRight: Theme.spacing.sm,
  },
  goodsId: {
    fontSize: 13,
    fontWeight: '700',
    color: Theme.neutral[800],
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    marginBottom: 4,
  },
  clientBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: Theme.radius.full,
    alignSelf: 'flex-start',
    gap: 4,
  },
  clientDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  clientName: {
    fontSize: 11,
    fontWeight: '600',
    maxWidth: 120,
  },
  statusButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: 6,
    borderRadius: Theme.radius.full,
    gap: 4,
    minWidth: 90,
    justifyContent: 'center',
  },
  statusButtonLoaded: {
    backgroundColor: Theme.colors.status.success + '18',
  },
  statusButtonDisabled: {
    opacity: 0.6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
  },
  description: {
    fontSize: 13,
    fontWeight: '500',
    color: Theme.neutral[600],
    marginBottom: Theme.spacing.md,
    lineHeight: 18,
  },
  footer: {
    flexDirection: 'row',
    gap: Theme.spacing.lg,
  },
  metric: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metricText: {
    fontSize: 12,
    fontWeight: '600',
    color: Theme.neutral[600],
  },
});
