import { StyleSheet } from 'react-native';
import { Theme, type ThemeContextType } from '@src/constants/Theme';

type AppColors = ThemeContextType['colors'];

export const createStyles = (colors: AppColors, isDark?: boolean) => StyleSheet.create({
  container: {
    marginBottom: Theme.spacing.md,
    borderRadius: Theme.radius.xl,
    overflow: 'hidden',
    backgroundColor: colors.background.card,
    ...Theme.shadows.sm,
  },
  header: {
    borderRadius: Theme.radius.xl,
    overflow: 'hidden',
  },
  headerGradient: {
    padding: Theme.spacing.md,
  },
  clientTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: Theme.spacing.sm,
  },
  clientInfoCompact: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
    minWidth: 0,
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: Theme.radius.full,
    backgroundColor: colors.primary[500],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Theme.spacing.md,
  },
  avatarText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text.inverse,
  },
  clientDetails: {
    flex: 1,
    minWidth: 0,
  },
  clientName: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.neutral[800],
    marginBottom: 2,
    lineHeight: 18,
  },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  clientPhone: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.neutral[500],
  },
  financialRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 4,
  },
  totalCost: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primary[600],
  },
  balanceBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  balanceText: {
    fontSize: 11,
    fontWeight: '700',
  },
  summaryGrid: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.sm,
    marginTop: Theme.spacing.md,
  },
  summaryItem: {
    flex: 1,
    minWidth: 0,
    alignItems: 'center',
    borderRadius: Theme.radius.sm,
    paddingVertical: Theme.spacing.sm,
    backgroundColor: isDark ? colors.neutral[800] : colors.background.card,
  },
  summaryValue: {
    fontSize: 13,
    fontWeight: '900',
    color: colors.primary[600],
  },
  summaryLabel: {
    fontSize: 10,
    fontWeight: '500',
    color: colors.neutral[400],
    marginTop: 2,
  },
  expandIcon: {
    width: 44,
    height: 44,
    borderRadius: Theme.radius.full,
    backgroundColor: colors.primary[100],
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: Theme.spacing.md,
    paddingTop: 0,
  },
  subtotalContainer: {
    marginTop: Theme.spacing.md,
    padding: Theme.spacing.md,
    backgroundColor: colors.primary[50],
    borderRadius: Theme.radius.lg,
    borderTopWidth: 2,
    borderTopColor: colors.primary[200],
  },
  subtotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Theme.spacing.xs,
  },
  subtotalLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.neutral[600],
  },
  subtotalValue: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primary[700],
  },
});
