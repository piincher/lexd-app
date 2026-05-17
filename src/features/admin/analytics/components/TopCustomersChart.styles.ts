import { StyleSheet } from 'react-native';
import { AppTheme } from '@src/constants/Theme';

export const createStyles = (colors: AppTheme['colors']) => StyleSheet.create({
  container: {
    borderRadius: 16,
    elevation: 2,
    maxHeight: 400,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text.primary,
  },
  summaryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.neutral[100],
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  summaryText: {
    fontSize: 12,
    color: colors.text.secondary,
  },
  list: {
    maxHeight: 320,
  },
  customerItem: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[100],
  },
  rankContainer: {
    alignItems: 'center',
    marginRight: 12,
    width: 50,
  },
  rankText: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.text.disabled,
    marginBottom: 4,
  },
  infoContainer: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  customerName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text.primary,
    flex: 1,
  },
  returningBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    backgroundColor: colors.status.success + '18',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  returningText: {
    fontSize: 9,
    fontWeight: '600',
    color: colors.status.success,
  },
  customerPhone: {
    fontSize: 11,
    color: colors.text.secondary,
  },
  spendText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.text.primary,
  },
  orderCount: {
    fontSize: 10,
    color: colors.text.muted,
  },
  spendContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 4,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 11,
    color: colors.text.secondary,
  },
  barContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
  },
  barBackground: {
    flex: 1,
    height: 6,
    backgroundColor: colors.border,
    borderRadius: 3,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 3,
  },
  revenueText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.text.primary,
    minWidth: 80,
    textAlign: 'right',
  },
});
