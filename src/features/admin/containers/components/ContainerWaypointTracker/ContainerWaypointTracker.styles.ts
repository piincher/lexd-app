import { StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.neutral[50],
  },
  header: {
    marginHorizontal: Theme.spacing.lg,
    marginTop: Theme.spacing.lg,
    borderRadius: Theme.radius['2xl'],
    overflow: 'hidden',
    ...Theme.shadows.md,
  },
  headerGradient: {
    padding: Theme.spacing.xl,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFF',
    marginTop: Theme.spacing.sm,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginTop: Theme.spacing.xs,
  },
  progressSummary: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: Theme.neutral.white,
    marginHorizontal: Theme.spacing.lg,
    marginTop: Theme.spacing.lg,
    padding: Theme.spacing.lg,
    borderRadius: Theme.radius.xl,
    ...Theme.shadows.sm,
  },
  progressItem: {
    alignItems: 'center',
  },
  progressNumber: {
    fontSize: 24,
    fontWeight: '800',
    color: Theme.primary[600],
  },
  progressLabel: {
    fontSize: 12,
    color: Theme.neutral[500],
    marginTop: Theme.spacing.xs,
  },
  progressDivider: {
    width: 1,
    height: 40,
    backgroundColor: Theme.neutral[200],
  },
  timelineContainer: {
    paddingHorizontal: Theme.spacing.lg,
    paddingTop: Theme.spacing.lg,
  },
  waypointWrapper: {
    position: 'relative',
  },
  connector: {
    position: 'absolute',
    left: 35,
    top: -20,
    width: 2,
    height: 30,
    backgroundColor: Theme.neutral[300],
    zIndex: 0,
  },
  connectorCompleted: {
    backgroundColor: Theme.status.success,
  },
  connectorCurrent: {
    backgroundColor: Theme.status.info,
  },
  waypointCard: {
    backgroundColor: Theme.neutral.white,
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
  expandedContent: {
    marginTop: Theme.spacing.md,
  },
  divider: {
    height: 1,
    backgroundColor: Theme.neutral[200],
    marginVertical: Theme.spacing.md,
  },
  section: {
    marginBottom: Theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Theme.neutral[700],
    marginBottom: Theme.spacing.sm,
  },
  timesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Theme.spacing.md,
  },
  timeItem: {
    flex: 1,
    minWidth: '45%',
  },
  timeLabel: {
    fontSize: 11,
    color: Theme.neutral[500],
    marginBottom: 2,
  },
  timeValue: {
    fontSize: 13,
    fontWeight: '600',
    color: Theme.neutral[800],
  },
  timePending: {
    color: Theme.neutral[400],
    fontStyle: 'italic',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.xs,
    gap: Theme.spacing.sm,
  },
  detailLabel: {
    fontSize: 12,
    color: Theme.neutral[500],
    width: 80,
  },
  detailValue: {
    flex: 1,
    fontSize: 13,
    color: Theme.neutral[800],
    fontWeight: '500',
  },
  notesContainer: {
    flexDirection: 'row',
    backgroundColor: Theme.neutral[50],
    padding: Theme.spacing.md,
    borderRadius: Theme.radius.lg,
    gap: Theme.spacing.sm,
  },
  notesText: {
    flex: 1,
    fontSize: 13,
    color: Theme.neutral[700],
  },
  portActionsContainer: {
    backgroundColor: Theme.primary[50],
    padding: Theme.spacing.md,
    borderRadius: Theme.radius.lg,
    marginBottom: Theme.spacing.md,
  },
  portActionsTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: Theme.primary[700],
    marginBottom: Theme.spacing.sm,
  },
  portActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Theme.spacing.sm,
  },
  portActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    borderRadius: Theme.radius.lg,
    gap: Theme.spacing.xs,
  },
  portActionText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },
  actionButtons: {
    gap: Theme.spacing.sm,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Theme.spacing.md,
    borderRadius: Theme.radius.lg,
    gap: Theme.spacing.sm,
  },
  actionButtonPrimary: {
    backgroundColor: Theme.primary[600],
  },
  actionButtonSecondary: {
    backgroundColor: Theme.primary[50],
    borderWidth: 1,
    borderColor: Theme.primary[200],
  },
  actionButtonTextPrimary: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
  },
  actionButtonTextSecondary: {
    color: Theme.primary[600],
    fontSize: 14,
    fontWeight: '600',
  },
  consigneeCard: {
    marginHorizontal: Theme.spacing.lg,
    marginTop: Theme.spacing.lg,
    borderRadius: Theme.radius.xl,
    overflow: 'hidden',
  },
  consigneeGradient: {
    padding: Theme.spacing.md,
  },
  consigneeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
  },
  consigneeTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFF',
    marginLeft: Theme.spacing.sm,
  },
  consigneeDetails: {
    marginBottom: Theme.spacing.md,
  },
  consigneeName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFF',
    marginBottom: Theme.spacing.sm,
  },
  consigneeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.xs,
  },
  consigneePhone: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    marginLeft: Theme.spacing.sm,
  },
  consigneeAddress: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
    marginLeft: Theme.spacing.sm,
    flex: 1,
  },
  callButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderColor: 'rgba(255,255,255,0.3)',
  },
  callButtonLabel: {
    color: '#FFF',
    fontWeight: '600',
  },
  footerSpacer: {
    height: Theme.spacing['2xl'],
  },
});
