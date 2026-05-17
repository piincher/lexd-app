/**
 * TransitTimeline.styles - All styles for TransitTimeline
 */
import { StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';

const cardBase = { marginHorizontal: Theme.spacing.lg, borderRadius: Theme.radius.xl, overflow: 'hidden' as const };
const gradientBase = { padding: Theme.spacing.lg };
const flexRow = { flexDirection: 'row' as const, alignItems: 'center' as const };

export const createStyles = (colors: any, isDark: boolean) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background.default },
  footerSpacer: { height: Theme.spacing['4xl'] },

  // Header
  headerCard: { ...cardBase, marginTop: Theme.spacing.lg, borderRadius: Theme.radius['2xl'], ...Theme.shadows.md },
  headerGradient: { padding: Theme.spacing.xl },
  headerTop: { ...flexRow, marginBottom: Theme.spacing.lg },
  headerIcon: { width: 48, height: 48, borderRadius: 24, backgroundColor: colors.background.card, justifyContent: 'center', alignItems: 'center', marginRight: Theme.spacing.md },
  headerText: { flex: 1 },
  headerLabel: { fontSize: 12, color: colors.text.inverse, fontWeight: '600', textTransform: 'uppercase' },
  headerTitle: { fontSize: 24, fontWeight: '800', color: colors.text.inverse },
  progressContainer: { marginBottom: Theme.spacing.lg },
  progressBackground: { height: 8, backgroundColor: `${colors.text.inverse}30`, borderRadius: Theme.radius.full, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: colors.background.card, borderRadius: Theme.radius.full },
  progressText: { fontSize: 12, color: colors.text.inverse, marginTop: Theme.spacing.sm, fontWeight: '600' },
  journeyStats: { ...flexRow, justifyContent: 'space-between', flexWrap: 'wrap', gap: Theme.spacing.sm },
  statItem: { ...flexRow, gap: Theme.spacing.xs },
  statText: { fontSize: 12, color: colors.text.inverse, fontWeight: '500' },

  // Route Flow
  routeFlowCard: { ...cardBase, marginTop: Theme.spacing.lg, ...Theme.shadows.sm },
  routeFlowGradient: { ...gradientBase },
  routeFlowHeader: { ...flexRow, marginBottom: Theme.spacing.md },
  routeFlowTitle: { fontSize: 15, fontWeight: '700', color: colors.primary.main, marginLeft: Theme.spacing.sm },
  routeFlowVisual: { ...flexRow, flexWrap: 'wrap', justifyContent: 'center', paddingVertical: Theme.spacing.sm },
  routeFlowItem: { alignItems: 'center', paddingHorizontal: 4, minWidth: 55 },
  routeFlowHighlight: { backgroundColor: colors.feedback.successBg, borderRadius: Theme.radius.md, paddingHorizontal: 8, paddingVertical: 6 },
  routeFlowFinal: { backgroundColor: colors.feedback.infoBg, borderRadius: Theme.radius.md, paddingHorizontal: 8, paddingVertical: 6 },
  routeFlowDot: { width: 10, height: 10, borderRadius: 5, marginBottom: 2 },
  routeFlowDotDakar: { width: 28, height: 28, borderRadius: 14, backgroundColor: colors.status.success, justifyContent: 'center', alignItems: 'center' },
  routeFlowText: { fontSize: 11, fontWeight: '600', color: colors.text.primary },
  routeFlowTextHighlight: { color: colors.status.success, fontSize: 13, fontWeight: '700' },
  routeFlowSubtext: { fontSize: 9, color: colors.text.secondary },
  routeFlowTransit: { alignItems: 'center' },
  routeFlowTransitText: { fontSize: 8, color: Theme.neutral[500], marginTop: 2 },
  routeFlowArrow: { paddingHorizontal: 2 },
  mainPortTag: { backgroundColor: colors.status.success, paddingHorizontal: 4, paddingVertical: 1, borderRadius: Theme.radius.full, marginTop: 2 },
  mainPortTagText: { fontSize: 7, fontWeight: '800', color: colors.text.inverse },

  // Sections
  section: { marginTop: Theme.spacing.lg, paddingHorizontal: Theme.spacing.lg },
  sectionHeader: { marginBottom: Theme.spacing.md },
  currentLocationBadge: { ...flexRow, backgroundColor: `${Theme.status.info}15`, paddingHorizontal: Theme.spacing.md, paddingVertical: Theme.spacing.sm, borderRadius: Theme.radius.full, alignSelf: 'flex-start', gap: Theme.spacing.xs },
  currentLocationText: { fontSize: 12, fontWeight: '700', color: Theme.status.info },
  sectionTitleRow: { ...flexRow, gap: Theme.spacing.sm, marginBottom: Theme.spacing.md },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: Theme.neutral[700], flex: 1 },
  badge: { backgroundColor: Theme.neutral[200], paddingHorizontal: Theme.spacing.md, paddingVertical: Theme.spacing.xs, borderRadius: Theme.radius.full },
  badgeSuccess: { backgroundColor: `${Theme.status.success}20` },
  badgeText: { fontSize: 12, fontWeight: '700', color: Theme.neutral[600] },
  badgeTextSuccess: { color: Theme.status.success },

  // Map
  mapSection: { marginTop: Theme.spacing.lg, paddingHorizontal: Theme.spacing.lg },
  mapPlaceholder: { height: 160, borderRadius: Theme.radius.xl, overflow: 'hidden' },
  mapGradient: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: Theme.spacing.sm },
  mapPlaceholderText: { fontSize: 16, fontWeight: '700', color: Theme.status.info },
  mapPlaceholderSubtext: { fontSize: 12, color: Theme.neutral[500] },

  // More waypoints
  moreWaypoints: { backgroundColor: Theme.neutral[100], paddingVertical: Theme.spacing.md, paddingHorizontal: Theme.spacing.lg, borderRadius: Theme.radius.lg, alignItems: 'center', marginTop: Theme.spacing.sm },
  moreWaypointsText: { fontSize: 13, color: Theme.neutral[500], fontWeight: '500' },

  // Summary
  summaryCard: { backgroundColor: colors.background.card, ...cardBase, marginTop: Theme.spacing.lg, padding: Theme.spacing.lg, ...Theme.shadows.sm },
  summaryTitle: { fontSize: 14, fontWeight: '700', color: colors.text.secondary, marginBottom: Theme.spacing.md, textTransform: 'uppercase' },
  summaryRow: { ...flexRow, justifyContent: 'space-between' },
  summaryItem: { alignItems: 'center', flex: 1 },
  summaryLabel: { fontSize: 11, color: colors.text.secondary, marginTop: Theme.spacing.xs },
  summaryValue: { fontSize: 14, fontWeight: '700', color: colors.text.primary, marginTop: 2 },

  // Arrival
  arrivalCard: { ...cardBase, marginTop: Theme.spacing.lg, ...Theme.shadows.sm },
  arrivalGradient: { ...flexRow, ...gradientBase, gap: Theme.spacing.md },
  arrivalIconContainer: { width: 56, height: 56, borderRadius: 28, backgroundColor: colors.background.card, justifyContent: 'center', alignItems: 'center' },
  arrivalContent: { flex: 1 },
  arrivalLabel: { fontSize: 12, color: colors.accent.goldDark, fontWeight: '600', textTransform: 'uppercase' },
  arrivalValue: { fontSize: 18, fontWeight: '800', color: colors.text.secondary },
  arrivalDestination: { fontSize: 13, color: colors.text.secondary, marginTop: 2 },

  // Dakar Info
  dakarInfoCard: { ...cardBase, marginTop: Theme.spacing.lg, ...Theme.shadows.sm },
  dakarInfoGradient: { ...gradientBase },
  dakarInfoHeader: { ...flexRow, marginBottom: Theme.spacing.sm },
  dakarInfoTitle: { fontSize: 16, fontWeight: '700', color: colors.status.success, marginLeft: Theme.spacing.sm },
  dakarInfoText: { fontSize: 13, color: colors.text.primary, lineHeight: 18 },
  dakarInfoHighlight: { fontWeight: '700', color: colors.status.success },
  dakarInfoETA: { fontSize: 12, color: colors.text.secondary, marginTop: Theme.spacing.sm, fontStyle: 'italic' },

  // Pickup
  pickupCard: { ...cardBase, marginTop: Theme.spacing.lg, marginBottom: Theme.spacing.lg, ...Theme.shadows.md },
  pickupGradient: { ...gradientBase },
  pickupHeader: { ...flexRow, marginBottom: Theme.spacing.sm },
  pickupTitle: { fontSize: 14, fontWeight: '800', color: colors.text.inverse, marginLeft: Theme.spacing.sm, letterSpacing: 0.5 },
  warehouseName: { fontSize: 20, fontWeight: '800', color: colors.text.inverse },
  warehouseAddress: { fontSize: 14, color: colors.text.inverse, marginTop: 2 },
  divider: { backgroundColor: `${colors.text.inverse}30`, marginVertical: Theme.spacing.md },
  consigneeSection: { marginTop: Theme.spacing.sm },
  consigneeLabel: { fontSize: 13, color: colors.text.inverse, marginBottom: 4 },
  consigneeName: { fontSize: 18, fontWeight: '700', color: colors.text.inverse, marginBottom: Theme.spacing.md },
  phoneButton: { ...flexRow, backgroundColor: colors.background.card, paddingHorizontal: Theme.spacing.md, paddingVertical: Theme.spacing.sm, borderRadius: Theme.radius.lg, alignSelf: 'flex-start', gap: Theme.spacing.sm },
  phoneText: { fontSize: 15, fontWeight: '700', color: colors.primary.main },
  hoursRow: { ...flexRow, gap: Theme.spacing.sm, marginBottom: Theme.spacing.xs },
  hours: { fontSize: 13, color: colors.text.inverse },
  addressRow: { ...flexRow, alignItems: 'flex-start', gap: Theme.spacing.sm },
  addressText: { fontSize: 12, color: colors.text.inverse, flex: 1 },
});
