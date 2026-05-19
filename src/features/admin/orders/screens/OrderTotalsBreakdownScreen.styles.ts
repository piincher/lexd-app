/**
 * OrderTotalsBreakdownScreen Styles
 */

import { StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';

export const createStyles = (colors: any, isDark?: boolean) => StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: colors.neutral[50],
  },
  card: {
    backgroundColor: colors.background.card,
    borderRadius: Theme.radius.xl,
    padding: Theme.spacing.lg,
    marginBottom: Theme.spacing.md,
    ...Theme.shadows.sm,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.neutral[800],
    marginBottom: Theme.spacing.md,
  },
  unitPriceValue: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.primary[600],
  },
  unitPriceLabel: {
    fontSize: 14,
    color: colors.neutral[500],
    marginTop: Theme.spacing.xs,
  },
  goodsItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[100],
  },
  goodsItemLast: {
    borderBottomWidth: 0,
  },
  goodsDescription: {
    flex: 1,
    fontSize: 14,
    color: colors.neutral[700],
  },
  goodsMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.md,
  },
  goodsCBM: {
    fontSize: 13,
    color: colors.neutral[500],
  },
  goodsCost: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.neutral[800],
    minWidth: 80,
    textAlign: 'right',
  },
  voidedCost: {
    textDecorationLine: 'line-through',
    color: colors.status.error,
  },
  emptyText: {
    fontSize: 14,
    color: colors.neutral[400],
    fontStyle: 'italic',
    textAlign: 'center',
    paddingVertical: Theme.spacing.md,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Theme.spacing.sm,
  },
  summaryLabel: {
    fontSize: 14,
    color: colors.neutral[600],
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.neutral[800],
  },
  summaryValueNegative: {
    color: colors.status.error,
  },
  summaryValuePositive: {
    color: colors.primary[600],
  },
  divider: {
    height: 1,
    backgroundColor: colors.neutral[200],
    marginVertical: Theme.spacing.sm,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Theme.spacing.md,
    marginTop: Theme.spacing.sm,
    borderTopWidth: 2,
    borderTopColor: colors.neutral[200],
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.neutral[800],
  },
  totalValue: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.primary[600],
  },
});
