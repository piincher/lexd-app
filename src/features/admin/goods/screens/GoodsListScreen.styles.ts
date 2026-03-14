/**
 * GoodsListScreen styles
 * Premium aesthetics with gradient headers and modern design
 */

import { StyleSheet, Dimensions } from 'react-native';
import { Theme } from '@src/constants/Theme';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F7FC',
  },
  headerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 200,
    zIndex: 0,
  },
  header: {
    paddingHorizontal: Theme.spacing.xl,
    paddingTop: Theme.spacing.lg,
    paddingBottom: Theme.spacing.xl,
    borderBottomLeftRadius: Theme.radius['3xl'],
    borderBottomRightRadius: Theme.radius['3xl'],
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerGreeting: {
    fontSize: 14,
    fontWeight: '600',
    color: Theme.neutral[500],
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: Theme.neutral[800],
    letterSpacing: -0.5,
  },
  notificationButton: {
    width: 48,
    height: 48,
    borderRadius: Theme.radius.full,
    backgroundColor: Theme.neutral.white,
    justifyContent: 'center',
    alignItems: 'center',
    ...Theme.shadows.sm,
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: Theme.accent.coral,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  notificationBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFF',
  },
  statsRow: {
    flexDirection: 'row',
    marginTop: Theme.spacing.xl,
    gap: Theme.spacing.md,
  },
  statCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.neutral.white,
    borderRadius: Theme.radius.xl,
    padding: Theme.spacing.md,
    ...Theme.shadows.sm,
  },
  statIconContainer: {
    width: 44,
    height: 44,
    borderRadius: Theme.radius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Theme.spacing.md,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '800',
    color: Theme.neutral[800],
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: Theme.neutral[400],
    marginTop: 2,
  },
  searchWrapper: {
    marginHorizontal: Theme.spacing.xl,
    marginTop: -Theme.spacing.lg,
    zIndex: 10,
  },
  searchGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: Theme.radius.xl,
    paddingHorizontal: Theme.spacing.lg,
    height: 56,
    ...Theme.shadows.md,
  },
  searchIcon: {
    marginRight: Theme.spacing.md,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: Theme.neutral[800],
    height: '100%',
  },
  clearButton: {
    padding: 4,
  },
  filterButton: {
    width: 36,
    height: 36,
    borderRadius: Theme.radius.md,
    backgroundColor: `${Theme.primary[100]}`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterWrapper: {
    marginTop: Theme.spacing.lg,
    marginBottom: Theme.spacing.sm,
  },
  filterList: {
    paddingHorizontal: Theme.spacing.xl,
    gap: Theme.spacing.md,
  },
  filterPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.lg,
    paddingVertical: Theme.spacing.md,
    borderRadius: Theme.radius.full,
    backgroundColor: Theme.neutral.white,
    ...Theme.shadows.sm,
    overflow: 'hidden',
  },
  filterPillActive: {
    ...Theme.shadows.md,
  },
  filterIcon: {
    marginRight: 6,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: Theme.neutral[600],
  },
  filterTextActive: {
    color: '#FFF',
  },
  listContent: {
    paddingTop: Theme.spacing.sm,
    paddingBottom: 120,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: Theme.spacing['4xl'],
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
    fontSize: 20,
    fontWeight: '700',
    color: Theme.neutral[700],
    marginBottom: Theme.spacing.sm,
  },
  emptySubtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: Theme.neutral[400],
    textAlign: 'center',
    paddingHorizontal: Theme.spacing['2xl'],
  },
  emptyButton: {
    marginTop: Theme.spacing.xl,
    borderRadius: Theme.radius.full,
    overflow: 'hidden',
  },
  emptyButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Theme.spacing.md,
    paddingHorizontal: Theme.spacing.xl,
  },
  emptyButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFF',
    marginLeft: Theme.spacing.sm,
  },
  fabContainer: {
    position: 'absolute',
    right: Theme.spacing.xl,
    bottom: Theme.spacing.xl,
    borderRadius: Theme.radius.full,
    ...Theme.shadows.xl,
  },
  fab: {
    width: 64,
    height: 64,
    borderRadius: Theme.radius.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
  snackbar: {
    backgroundColor: Theme.neutral[800],
    borderRadius: Theme.radius.lg,
    marginBottom: Theme.spacing.lg,
  },
});
