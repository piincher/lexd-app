import { StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';

export const styles = StyleSheet.create({
  container: {
    marginBottom: Theme.spacing.md,
    borderRadius: Theme.radius.xl,
    overflow: 'hidden',
    backgroundColor: Theme.colors.background.card,
    ...Theme.shadows.sm,
  },
  header: {
    borderRadius: Theme.radius.xl,
    overflow: 'hidden',
  },
  headerGradient: {
    padding: Theme.spacing.md,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  clientInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    minWidth: 0,
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: Theme.radius.full,
    backgroundColor: Theme.primary[500],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Theme.spacing.md,
  },
  avatarText: {
    fontSize: 16,
    fontWeight: '700',
    color: Theme.colors.text.inverse,
  },
  clientDetails: {
    flex: 1,
    minWidth: 0,
  },
  clientName: {
    fontSize: 14,
    fontWeight: '700',
    color: Theme.neutral[800],
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
    color: Theme.neutral[500],
  },
  financialRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  totalCost: {
    fontSize: 13,
    fontWeight: '700',
    color: Theme.primary[600],
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
  summaryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.sm,
    flexShrink: 0,
  },
  summaryItem: {
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.sm,
    minWidth: 50,
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '700',
    color: Theme.primary[600],
  },
  summaryLabel: {
    fontSize: 10,
    fontWeight: '500',
    color: Theme.neutral[400],
    marginTop: 2,
  },
  summaryDivider: {
    width: 1,
    height: 24,
    backgroundColor: Theme.neutral[200],
  },
  expandIcon: {
    width: 32,
    height: 32,
    borderRadius: Theme.radius.full,
    backgroundColor: Theme.primary[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: Theme.spacing.sm,
  },
  content: {
    padding: Theme.spacing.md,
    paddingTop: 0,
  },
  subtotalContainer: {
    marginTop: Theme.spacing.md,
    padding: Theme.spacing.md,
    backgroundColor: Theme.primary[50],
    borderRadius: Theme.radius.lg,
    borderTopWidth: 2,
    borderTopColor: Theme.primary[200],
  },
  subtotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Theme.spacing.xs,
  },
  subtotalLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: Theme.neutral[600],
  },
  subtotalValue: {
    fontSize: 13,
    fontWeight: '700',
    color: Theme.primary[700],
  },
});
