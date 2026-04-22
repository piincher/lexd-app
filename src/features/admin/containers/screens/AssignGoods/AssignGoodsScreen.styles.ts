import { StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';

export const createStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F7FC',
  },

  // Header Styles
  header: {
    paddingHorizontal: Theme.spacing.lg,
    paddingTop: Theme.spacing.lg,
    paddingBottom: Theme.spacing.xl,
    borderBottomLeftRadius: Theme.radius['3xl'],
    borderBottomRightRadius: Theme.radius['3xl'],
  },
  loadingHeader: {
    paddingHorizontal: Theme.spacing.lg,
    paddingTop: Theme.spacing.lg,
    paddingBottom: Theme.spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Theme.spacing.lg,
  },
  headerInfo: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFF',
  },
  loadingTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFF',
    marginLeft: Theme.spacing.md,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
  },
  placeholder: {
    width: 40,
  },

  // Capacity Indicator Styles
  capacityContainer: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: Theme.radius.xl,
    padding: Theme.spacing.lg,
  },
  capacityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
  },
  capacityLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.9)',
  },
  capacityValue: {
    fontSize: 14,
    fontWeight: '700',
  },
  progressBarBackground: {
    height: 10,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: Theme.radius.full,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  progressBarCurrent: {
    height: '100%',
    backgroundColor: colors.neutral[400],
  },
  progressBarSelected: {
    height: '100%',
  },
  capacityLegend: {
    flexDirection: 'row',
    marginTop: Theme.spacing.md,
    gap: Theme.spacing.lg,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  legendText: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '500',
  },
  warningBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(239,68,68,0.15)',
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    borderRadius: Theme.radius.md,
    marginTop: Theme.spacing.md,
  },
  warningBannerOrange: {
    backgroundColor: 'rgba(245,158,11,0.15)',
  },
  warningText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.status.error,
    marginLeft: 8,
  },
  warningTextOrange: {
    color: colors.status.warning,
  },
  nonAssignableBanner: {
    flexDirection: 'row',
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    borderRadius: Theme.radius.lg,
    padding: Theme.spacing.md,
    marginTop: Theme.spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.3)',
  },
  nonAssignableContent: {
    flex: 1,
    marginLeft: Theme.spacing.md,
  },
  nonAssignableTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#EF4444',
    marginBottom: 2,
  },
  nonAssignableText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.9)',
    lineHeight: 18,
  },

  // Search Styles
  searchContainer: {
    paddingHorizontal: Theme.spacing.lg,
    paddingVertical: Theme.spacing.md,
    backgroundColor: '#F8F7FC',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.card,
    borderRadius: Theme.radius.full,
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    ...Theme.shadows.sm,
  },
  searchIcon: {
    marginRight: Theme.spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: colors.neutral[800],
    paddingVertical: 4,
  },

  // Select All Bar
  selectAllBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.lg,
    paddingVertical: Theme.spacing.sm,
    backgroundColor: '#F8F7FC',
  },
  selectAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary[600],
    marginLeft: Theme.spacing.sm,
  },
  resultsText: {
    fontSize: 12,
    color: colors.neutral[400],
    fontWeight: '500',
  },

  // List Styles
  listContent: {
    paddingTop: Theme.spacing.sm,
    paddingBottom: 120,
  },

  // Goods Card Styles
  goodsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.card,
    marginHorizontal: Theme.spacing.lg,
    marginVertical: Theme.spacing.xs,
    padding: Theme.spacing.md,
    borderRadius: Theme.radius.xl,
    ...Theme.shadows.sm,
  },
  goodsCardSelected: {
    backgroundColor: colors.primary[50],
    borderWidth: 1,
    borderColor: colors.primary[200],
  },
  checkboxContainer: {
    marginRight: Theme.spacing.md,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.neutral[300],
    backgroundColor: colors.background.card,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    backgroundColor: colors.primary[500],
    borderColor: colors.primary[500],
  },
  imageContainer: {
    width: 70,
    height: 70,
    borderRadius: Theme.radius.lg,
    overflow: 'hidden',
    marginRight: Theme.spacing.md,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  goodsInfo: {
    flex: 1,
  },
  goodsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  goodsId: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.neutral[800],
  },
  description: {
    fontSize: 13,
    color: colors.neutral[500],
    marginBottom: 8,
  },
  goodsMeta: {
    flexDirection: 'row',
    gap: Theme.spacing.md,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 12,
    color: colors.neutral[500],
    marginLeft: 4,
    maxWidth: 100,
  },

  // Empty State
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: Theme.spacing['4xl'],
    marginHorizontal: Theme.spacing.lg,
  },
  emptyIconContainer: {
    width: 120,
    height: 120,
    borderRadius: Theme.radius['3xl'],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Theme.spacing.xl,
  },
  emptyTitle: {
    fontSize: 18,
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

  // Bottom Action Bar
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: Theme.spacing.lg,
  },
  bottomBarGradient: {
    borderRadius: Theme.radius['2xl'],
    ...Theme.shadows.lg,
  },
  bottomBarContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Theme.spacing.lg,
  },
  selectionInfo: {
    flex: 1,
  },
  selectionCount: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.neutral[800],
  },
  selectionCBM: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary[600],
    marginTop: 2,
  },
  selectionCBMError: {
    color: colors.status.error,
  },
  assignButton: {
    borderRadius: Theme.radius.full,
    overflow: 'hidden',
    marginLeft: Theme.spacing.lg,
  },
  assignButtonDisabled: {
    opacity: 0.7,
  },
  assignButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Theme.spacing.md,
    paddingHorizontal: Theme.spacing.xl,
    gap: Theme.spacing.sm,
  },
  assignButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFF',
  },
  assignButtonTextDisabled: {
    color: colors.neutral[400],
  },

  // Loading & Error States
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing['2xl'],
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.neutral[800],
    marginTop: Theme.spacing.lg,
    marginBottom: Theme.spacing.sm,
  },
  errorSubtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.neutral[400],
    textAlign: 'center',
    marginBottom: Theme.spacing.xl,
  },
  retryButton: {
    backgroundColor: colors.primary[500],
    paddingVertical: Theme.spacing.md,
    paddingHorizontal: Theme.spacing.xl,
    borderRadius: Theme.radius.full,
  },
  retryButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFF',
  },
});
