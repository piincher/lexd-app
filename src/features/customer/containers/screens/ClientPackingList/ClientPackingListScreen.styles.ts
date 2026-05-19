import {StyleSheet} from 'react-native';
import {Fonts} from '@src/constants/Fonts';

export const createStyles = (colors: any, isDark: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.paper,
  },
  headerTitle: {
    fontFamily: Fonts.bold,
  },
  progressBar: {
    height: 3,
  },
  header: {
    backgroundColor: colors.background.card,
    elevation: 4,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyStateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
  },
  emptyStateText: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: colors.text.secondary,
    marginTop: 12,
  },
  colNumber: {
    flex: 0.5,
  },
  colDescription: {
    flex: 2,
  },
  colCBM: {
    flex: 1,
  },
  colWeight: {
    flex: 1,
  },
  colQuantity: {
    flex: 0.8,
  },
  colStatus: {
    flex: 1.2,
  },
  rowNumber: {
    fontFamily: Fonts.meduim,
    fontSize: 13,
    color: colors.text.secondary,
  },
  descriptionText: {
    fontFamily: Fonts.regular,
    fontSize: 13,
    color: colors.text.secondary,
  },
  numericText: {
    fontFamily: Fonts.meduim,
    fontSize: 13,
    color: colors.text.secondary,
    textAlign: 'right',
  },
  statusChip: {
    borderRadius: 12,
    height: 28,
  },
  statusChipText: {
    fontFamily: Fonts.meduim,
    fontSize: 11,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  loadingText: {
    marginTop: 16,
    fontFamily: Fonts.meduim,
    color: colors.text.secondary,
  },
  errorTitle: {
    fontSize: 18,
    fontFamily: Fonts.bold,
    color: colors.text.secondary,
    marginTop: 16,
  },
  errorText: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: colors.text.secondary,
    textAlign: 'center',
    marginTop: 8,
  },
  retryButton: {
    marginTop: 24,
  },
  scrollContent: {
    padding: 16,
  },
  // Route Banner at Top
  routeBannerCard: {
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
  },
  routeBannerGradient: {
    padding: 4,
  },
  routeBannerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  routeBannerTitle: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: colors.primary.main,
    marginLeft: 8,
  },
  routeBannerFlow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  routeBannerItem: {
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  routeBannerHighlight: {
    backgroundColor: colors.feedback.successBg,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  routeBannerLabel: {
    fontFamily: Fonts.regular,
    fontSize: 11,
    color: colors.text.secondary,
    marginTop: 4,
  },
  routeBannerValue: {
    fontFamily: Fonts.bold,
    fontSize: 14,
    color: colors.status.success,
    marginTop: 2,
  },
  routeBannerSubtext: {
    fontFamily: Fonts.regular,
    fontSize: 10,
    color: colors.text.secondary,
  },
  routeBannerArrow: {
    paddingHorizontal: 4,
  },
  documentCard: {
    marginBottom: 16,
    elevation: 2,
  },
  headerCard: {
    backgroundColor: colors.background.card,
  },
  documentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  documentIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: colors.feedback.infoBg,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  documentTitleContainer: {
    flex: 1,
  },
  documentTitle: {
    fontFamily: Fonts.bold,
    fontSize: 18,
    color: colors.text.secondary,
    letterSpacing: 1,
  },
  documentSubtitle: {
    fontFamily: Fonts.meduim,
    fontSize: 16,
    color: colors.text.secondary,
    marginTop: 4,
  },
  headerDivider: {
    marginVertical: 16,
  },
  documentMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontFamily: Fonts.regular,
    fontSize: 13,
    color: colors.text.secondary,
    marginLeft: 6,
  },
  statusCard: {
    marginBottom: 16,
    elevation: 1,
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusTitle: {
    fontFamily: Fonts.meduim,
    fontSize: 14,
    marginLeft: 8,
  },
  statusValue: {
    fontFamily: Fonts.bold,
    fontSize: 18,
  },
  estimatedText: {
    fontFamily: Fonts.regular,
    fontSize: 13,
    marginTop: 4,
    opacity: 0.9,
  },
  routeInfoCard: {
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
  },
  routeInfoGradient: {
    padding: 4,
  },
  routeInfoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  routeInfoTitle: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: colors.primary.main,
    marginLeft: 8,
  },
  routeFlow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  routeFlowItem: {
    alignItems: 'center',
    flex: 1,
  },
  routeFlowHighlight: {
    backgroundColor: colors.feedback.successBg,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  routeFlowLabel: {
    fontFamily: Fonts.regular,
    fontSize: 10,
    color: colors.text.secondary,
    marginTop: 4,
  },
  routeFlowValue: {
    fontFamily: Fonts.bold,
    fontSize: 13,
    color: colors.text.secondary,
    marginTop: 2,
    textAlign: 'center',
  },
  routeFlowValueHighlight: {
    color: colors.status.success,
    fontSize: 14,
  },
  routeFlowSubtext: {
    fontFamily: Fonts.regular,
    fontSize: 9,
    color: colors.text.secondary,
  },
  routeFlowArrow: {
    paddingHorizontal: 4,
  },
  routeInfoFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${colors.background.card}70`,
    padding: 8,
    borderRadius: 8,
  },
  routeInfoText: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: colors.text.secondary,
    marginLeft: 8,
    flex: 1,
  },
  pickupSectionCard: {
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
  },
  pickupGradient: {
    padding: 4,
  },
  pickupSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  pickupSectionTitle: {
    fontFamily: Fonts.bold,
    fontSize: 14,
    color: colors.text.inverse,
    marginLeft: 8,
    letterSpacing: 0.5,
  },
  warehouseMainName: {
    fontFamily: Fonts.bold,
    fontSize: 18,
    color: colors.text.inverse,
  },
  warehouseMainAddress: {
    fontFamily: Fonts.meduim,
    fontSize: 14,
    color: colors.text.inverse,
    marginTop: 2,
  },
  pickupDivider: {
    backgroundColor: `${colors.text.inverse}30`,
    marginVertical: 12,
  },
  consigneeSectionLabel: {
    fontFamily: Fonts.meduim,
    fontSize: 13,
    color: colors.text.inverse,
    marginBottom: 8,
  },
  consigneeInfoCard: {
    backgroundColor: colors.background.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  consigneeInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  consigneeInfoName: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: colors.text.secondary,
    marginLeft: 12,
  },
  consigneeInfoPhone: {
    fontFamily: Fonts.meduim,
    fontSize: 15,
    color: colors.primary.main,
    marginLeft: 12,
  },
  consigneeInfoAddress: {
    fontFamily: Fonts.regular,
    fontSize: 13,
    color: colors.text.secondary,
    marginLeft: 12,
    flex: 1,
  },
  requiredDocs: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  requiredDocsText: {
    fontFamily: Fonts.meduim,
    fontSize: 12,
    color: colors.text.inverse,
    marginLeft: 8,
    flex: 1,
  },
  sectionCard: {
    marginBottom: 16,
    elevation: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: colors.text.secondary,
    marginLeft: 12,
  },
  sectionDivider: {
    marginBottom: 16,
  },
  consigneeInfo: {
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  infoContent: {
    marginLeft: 12,
    flex: 1,
  },
  infoLabel: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: colors.status.success,
    marginBottom: 2,
  },
  infoValue: {
    fontFamily: Fonts.meduim,
    fontSize: 15,
    color: colors.text.secondary,
    lineHeight: 20,
  },
  consigneeActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    borderColor: colors.border,
  },
  routeContainer: {
    paddingHorizontal: 8,
  },
  routePoint: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  routeDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
  },
  routeContent: {
    marginLeft: 16,
  },
  routeLabel: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: colors.status.success,
  },
  routeValue: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: colors.text.secondary,
  },
  routeLine: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 6,
    marginVertical: 8,
  },
  routeLineBar: {
    width: 2,
    height: 30,
    backgroundColor: colors.neutral[200],
  },
  routeTransitInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },
  transitDays: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: colors.text.secondary,
    marginLeft: 8,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: colors.background.paper,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  tableHeaderCell: {
    fontFamily: Fonts.bold,
    fontSize: 12,
    color: colors.text.secondary,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  tableRowEven: {
    backgroundColor: colors.background.card,
  },
  tableRowOdd: {
    backgroundColor: colors.background.paper,
  },
  tableRowLast: {
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderBottomWidth: 0,
  },
  tableCell: {
    fontFamily: Fonts.regular,
    fontSize: 13,
    color: colors.text.secondary,
  },
  goodsId: {
    fontFamily: Fonts.meduim,
    fontSize: 13,
    color: colors.text.secondary,
  },
  goodsDescription: {
    fontFamily: Fonts.regular,
    fontSize: 11,
    color: colors.text.secondary,
    marginTop: 2,
  },
  summaryContainer: {
    marginTop: 16,
  },
  summaryDivider: {
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontFamily: Fonts.meduim,
    fontSize: 14,
    color: colors.text.secondary,
  },
  summaryValue: {
    fontFamily: Fonts.bold,
    fontSize: 14,
    color: colors.text.secondary,
  },
  instructionsCard: {
    backgroundColor: colors.accent.goldLight,
    borderColor: colors.accent.goldLight,
    borderWidth: 1,
  },
  instructionsText: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: colors.text.secondary,
    lineHeight: 20,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  footerText: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: colors.text.secondary,
    marginTop: 8,
  },
  footerSubtext: {
    fontFamily: Fonts.bold,
    fontSize: 13,
    color: colors.text.secondary,
    marginTop: 4,
  },
  footerRoute: {
    fontFamily: Fonts.meduim,
    fontSize: 11,
    color: colors.status.success,
    marginTop: 4,
  },
  bottomPadding: {
    height: 80,
  },
  dialogText: {
    fontSize: 14,
    marginBottom: 8,
    fontFamily: Fonts.regular,
  },
  dialogLabel: {
    fontFamily: Fonts.bold,
    color: colors.text.secondary,
  },
  // Fixed Action Bar
  actionBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.background.card,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    gap: 12,
    elevation: 8,
    shadowColor: colors.neutral[900],
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  actionBarButton: {
    flex: 1,
    borderColor: colors.primary.main,
  },
  actionBarButtonPrimary: {
    backgroundColor: colors.primary.main,
  },
  actionBarButtonLabel: {
    fontFamily: Fonts.meduim,
    fontSize: 14,
  },
  actionBarButtonLabelPrimary: {
    fontFamily: Fonts.bold,
    fontSize: 14,
    color: colors.text.inverse,
  },
});
