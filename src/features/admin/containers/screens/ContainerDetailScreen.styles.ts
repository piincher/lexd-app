import { StyleSheet, Dimensions } from 'react-native';
import { Theme } from '@src/constants/Theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const MAX_CBM = 67; // Standard 40ft container capacity

const createStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.default,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: Theme.spacing.md,
    fontSize: 16,
    color: colors.neutral[500],
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Theme.spacing['2xl'],
  },
  errorText: {
    marginTop: Theme.spacing.lg,
    fontSize: 18,
    fontWeight: '600',
    color: colors.neutral[700],
  },
  backButton: {
    marginTop: Theme.spacing.xl,
    paddingVertical: Theme.spacing.md,
    paddingHorizontal: Theme.spacing.xl,
    backgroundColor: colors.primary[500],
    borderRadius: Theme.radius.lg,
  },
  backButtonText: {
    color: colors.text.inverse,
    fontSize: 16,
    fontWeight: '600',
  },
  header: {
    paddingTop: Theme.spacing.lg,
    paddingBottom: Theme.spacing['2xl'],
    paddingHorizontal: Theme.spacing.lg,
    borderBottomLeftRadius: Theme.radius['3xl'],
    borderBottomRightRadius: Theme.radius['3xl'],
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing.xl,
  },
  backIconButton: {
    width: 44,
    height: 44,
    borderRadius: Theme.radius.full,
    backgroundColor: colors.text.inverse + '33',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.lg,
    paddingVertical: Theme.spacing.sm,
    borderRadius: Theme.radius.full,
    gap: Theme.spacing.sm,
  },
  statusText: {
    color: colors.text.inverse,
    fontSize: 14,
    fontWeight: '700',
  },
  headerContent: {
    alignItems: 'center',
  },
  containerNumberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.md,
  },
  containerNumber: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text.inverse,
    letterSpacing: -0.5,
  },
  shippingLineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Theme.spacing.md,
    gap: Theme.spacing.sm,
  },
  shippingLineText: {
    fontSize: 14,
    color: colors.text.inverse + 'CC',
    fontWeight: '500',
  },
  consigneeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Theme.spacing.sm,
    gap: Theme.spacing.sm,
    backgroundColor: colors.text.inverse + '26',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  consigneeText: {
    fontSize: 12,
    color: colors.text.inverse,
    fontWeight: '500',
  },
  actualNumber: {
    marginTop: Theme.spacing.sm,
    fontSize: 13,
    color: colors.text.inverse + '99',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: Theme.spacing.lg,
    paddingBottom: Theme.spacing['4xl'],
  },
  card: {
    backgroundColor: colors.background.card,
    borderRadius: Theme.radius['2xl'],
    padding: Theme.spacing.lg,
    marginBottom: Theme.spacing.lg,
    ...Theme.shadows.md,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.lg,
    gap: Theme.spacing.sm,
  },
  cardHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: Theme.spacing.sm,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.neutral[800],
  },
  goodsCountBadge: {
    backgroundColor: colors.primary[100],
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.xs,
    borderRadius: Theme.radius.full,
  },
  goodsCountText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary[600],
  },
  capacityInfo: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: Theme.spacing.md,
  },
  capacityValue: {
    fontSize: 36,
    fontWeight: '800',
    color: colors.neutral[800],
  },
  capacityUnit: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.neutral[500],
  },
  capacityMax: {
    marginLeft: Theme.spacing.sm,
    fontSize: 15,
    color: colors.neutral[400],
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.md,
  },
  progressBackground: {
    flex: 1,
    height: 10,
    backgroundColor: colors.neutral[100],
    borderRadius: Theme.radius.full,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: Theme.radius.full,
  },
  progressPercentage: {
    fontSize: 14,
    fontWeight: '700',
    minWidth: 50,
    textAlign: 'right',
  },
  capacityStats: {
    flexDirection: 'row',
    marginTop: Theme.spacing.lg,
    paddingTop: Theme.spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.neutral[100],
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.neutral[800],
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.neutral[400],
    marginTop: Theme.spacing.xs,
  },
  statDivider: {
    width: 1,
    backgroundColor: colors.neutral[200],
  },
  timeline: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: Theme.spacing.md,
  },
  timelineStep: {
    alignItems: 'center',
    flex: 1,
    position: 'relative',
  },
  timelineDot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.neutral[200],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Theme.spacing.sm,
  },
  timelineDotCurrent: {
    transform: [{ scale: 1.2 }],
    ...Theme.shadows.md,
  },
  timelineConnector: {
    position: 'absolute',
    top: 14,
    right: '50%',
    left: '50%',
    height: 2,
    backgroundColor: colors.neutral[200],
    marginLeft: 14,
    marginRight: -14,
    zIndex: -1,
  },
  timelineLabel: {
    fontSize: 11,
    fontWeight: '500',
    color: colors.neutral[400],
    textAlign: 'center',
  },
  timelineLabelActive: {
    color: colors.neutral[600],
    fontWeight: '600',
  },
  timelineLabelCurrent: {
    color: colors.primary[600],
    fontWeight: '700',
  },
  datesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Theme.spacing.md,
    marginTop: Theme.spacing.lg,
    paddingTop: Theme.spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.neutral[100],
  },
  dateItem: {
    flex: 1,
    minWidth: 100,
  },
  dateLabel: {
    fontSize: 11,
    fontWeight: '500',
    color: colors.neutral[400],
    marginBottom: Theme.spacing.xs,
  },
  dateValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.neutral[700],
  },
  emptyGoods: {
    alignItems: 'center',
    paddingVertical: Theme.spacing['2xl'],
  },
  emptyIconBg: {
    width: 80,
    height: 80,
    borderRadius: Theme.radius['2xl'],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Theme.spacing.lg,
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.neutral[700],
    marginBottom: Theme.spacing.sm,
  },
  emptySubtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.neutral[400],
    textAlign: 'center',
    paddingHorizontal: Theme.spacing.xl,
  },
  goodsList: {
    gap: Theme.spacing.md,
  },
  goodsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Theme.spacing.md,
    backgroundColor: colors.neutral[50],
    borderRadius: Theme.radius.lg,
  },
  goodsIcon: {
    width: 44,
    height: 44,
    borderRadius: Theme.radius.md,
    backgroundColor: colors.primary[50],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Theme.spacing.md,
  },
  goodsInfo: {
    flex: 1,
  },
  goodsId: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.neutral[800],
  },
  goodsDescription: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.neutral[500],
    marginTop: Theme.spacing.xs,
  },
  goodsMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Theme.spacing.xs,
  },
  goodsMetaText: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.primary[600],
  },
  goodsMetaDot: {
    fontSize: 12,
    color: colors.neutral[300],
    marginHorizontal: Theme.spacing.sm,
  },
  removeButton: {
    padding: Theme.spacing.sm,
  },
  // Phase 3: Goods status and action styles
  goodsIdRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.sm,
  },
  statusBadgeText: {
    fontSize: 10,
    fontWeight: '700',
  },
  pickedUpByText: {
    fontSize: 11,
    fontWeight: '500',
    color: colors.neutral[500],
    marginTop: 2,
  },
  goodsActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.xs,
  },
  deliverButton: {
    padding: Theme.spacing.sm,
    backgroundColor: colors.status.success + '10',
    borderRadius: Theme.radius.md,
  },
  actionsCard: {
    gap: Theme.spacing.md,
  },
  actionButton: {
    borderRadius: Theme.radius.xl,
    overflow: 'hidden',
    ...Theme.shadows.md,
  },
  actionGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Theme.spacing.lg,
    gap: Theme.spacing.sm,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text.inverse,
  },
  actionButtonSecondary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Theme.spacing.lg,
    backgroundColor: colors.background.card,
    borderWidth: 1,
    borderColor: colors.primary[200],
    gap: Theme.spacing.sm,
  },
  actionButtonTextSecondary: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary[600],
  },
  actionButtonDanger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Theme.spacing.lg,
    backgroundColor: colors.background.card,
    borderWidth: 1,
    borderColor: colors.neutral[200],
    gap: Theme.spacing.sm,
  },
  actionButtonTextDanger: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.status.error,
  },
  actionButtonTextDisabled: {
    color: colors.neutral[400],
  },
  deleteHint: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.neutral[400],
    textAlign: 'center',
    fontStyle: 'italic',
  },
  menuItemActive: {
    backgroundColor: colors.primary[50],
  },
  dialogTitle: {
    textAlign: 'center',
    fontWeight: '700',
  },
  dialogText: {
    textAlign: 'center',
    color: colors.neutral[600],
    lineHeight: 20,
  },
  // Phase 4: List Buttons (Packing List & Loading List)
  listButtonsRow: {
    flexDirection: 'row',
    gap: Theme.spacing.md,
  },
  listButton: {
    flex: 1,
    borderRadius: Theme.radius.xl,
    overflow: 'hidden',
    ...Theme.shadows.sm,
  },
  packingListButton: {
    borderWidth: 1,
    borderColor: colors.primary[200],
  },
  loadingListButton: {
    borderWidth: 1,
    borderColor: colors.status.warning + '40',
  },
  listButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Theme.spacing.md,
    gap: Theme.spacing.sm,
  },
  listButtonIcon: {
    width: 40,
    height: 40,
    borderRadius: Theme.radius.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listButtonTextContainer: {
    flex: 1,
  },
  listButtonTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 2,
  },
  listButtonSubtitle: {
    fontSize: 11,
    fontWeight: '500',
    color: colors.neutral[500],
  },
  // Phase 3: Route Card Styles
  routeCard: {
    borderRadius: Theme.radius['2xl'],
    marginHorizontal: Theme.spacing.lg,
    marginTop: Theme.spacing.lg,
    overflow: 'hidden',
    ...Theme.shadows.md,
  },
  routeGradient: {
    padding: Theme.spacing.lg,
  },
  routeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.md,
    marginBottom: Theme.spacing.md,
  },
  routeModeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.xs,
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.xs,
    borderRadius: Theme.radius.full,
  },
  routeModeText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text.inverse,
  },
  routeName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.neutral[800],
    flex: 1,
  },
  routePath: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Theme.spacing.md,
    paddingHorizontal: Theme.spacing.sm,
  },
  routeLocation: {
    flex: 1,
    alignItems: 'center',
  },
  routeLocationLabel: {
    fontSize: 11,
    fontWeight: '500',
    color: colors.neutral[400],
    marginBottom: Theme.spacing.xs,
  },
  routeLocationValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.neutral[700],
    textAlign: 'center',
  },
  routeArrow: {
    paddingHorizontal: Theme.spacing.md,
  },
  routeDetails: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Theme.spacing.lg,
    paddingTop: Theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.neutral[200],
  },
  routeDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.xs,
  },
  routeDetailText: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.neutral[600],
  },
  // Waypoint tracker section
  loadingCard: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: Theme.spacing.xl,
  },
});

export { createStyles, SCREEN_WIDTH, MAX_CBM };
export default createStyles;
