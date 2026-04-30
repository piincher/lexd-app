import { StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';

export const styles = StyleSheet.create({
  waypointCard: {
    backgroundColor: Theme.colors.background.card,
    borderRadius: Theme.radius.xl,
    marginBottom: Theme.spacing.md,
    overflow: 'hidden',
    ...Theme.shadows.sm,
  },
  waypointCardCurrent: {
    borderWidth: 2,
    borderColor: Theme.status.info,
    ...Theme.shadows.md,
  },
  waypointCardCompleted: {
    opacity: 0.9,
  },
  waypointCardDakar: {
    borderWidth: 2,
    borderColor: '#0EA5E9',
    ...Theme.shadows.md,
  },
  waypointCardBorder: {
    borderWidth: 2,
    borderColor: '#F59E0B',
    ...Theme.shadows.md,
  },
  waypointCardWarehouse: {
    borderWidth: 2,
    borderColor: '#8B5CF6',
    ...Theme.shadows.md,
  },
  statusBar: {
    height: 4,
    width: '100%',
  },
  statusBarDakar: {
    height: 6,
    backgroundColor: '#0EA5E9',
  },
  statusBarBorder: {
    height: 6,
    backgroundColor: '#F59E0B',
  },
  waypointContent: {
    padding: Theme.spacing.lg,
  },
  waypointHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: Theme.spacing.md,
  },
  waypointNumber: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Theme.primary[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Theme.spacing.md,
  },
  waypointNumberDakar: {
    backgroundColor: '#0EA5E9',
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  waypointNumberText: {
    fontSize: 16,
    fontWeight: '700',
    color: Theme.primary[600],
  },
  waypointNumberTextDakar: {
    color: '#FFF',
    fontSize: 18,
  },
  waypointTitleContainer: {
    flex: 1,
  },
  waypointLocation: {
    fontSize: 16,
    fontWeight: '700',
    color: Theme.neutral[800],
  },
  waypointLocationDakar: {
    fontSize: 18,
    color: '#0284C7',
  },
  waypointCode: {
    fontSize: 12,
    color: Theme.neutral[500],
    marginTop: 2,
  },
  waypointBadges: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: Theme.spacing.xs,
    borderRadius: Theme.radius.full,
    gap: 4,
  },
  statusBadgeText: {
    fontSize: 10,
    fontWeight: '600',
  },
  routeDisplayBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.primary[600],
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: Theme.radius.full,
    marginTop: Theme.spacing.xs,
    alignSelf: 'flex-start',
    gap: 4,
  },
  routeDisplayText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FFF',
  },
  typeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.sm,
    marginBottom: Theme.spacing.md,
    flexWrap: 'wrap',
  },
  typeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.neutral[100],
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.xs,
    borderRadius: Theme.radius.full,
    gap: 4,
  },
  typeBadgeText: {
    fontSize: 11,
    color: Theme.neutral[600],
    fontWeight: '500',
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: 2,
    borderRadius: Theme.radius.full,
    gap: 4,
  },
  categoryBadgeText: {
    fontSize: 9,
    fontWeight: '700',
  },
  currentIndicator: {
    backgroundColor: Theme.status.info,
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: 2,
    borderRadius: Theme.radius.full,
  },
  currentIndicatorText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#FFF',
  },
  quickInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Theme.spacing.md,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  infoText: {
    fontSize: 12,
    color: Theme.neutral[600],
  },
  expandIndicator: {
    alignItems: 'center',
    marginTop: Theme.spacing.sm,
  },
});
