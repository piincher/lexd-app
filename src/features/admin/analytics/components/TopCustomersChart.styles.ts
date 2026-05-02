import { StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';

export const styles = StyleSheet.create({
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
    color: Theme.colors.text.primary,
  },
  summaryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Theme.colors.neutral[100],
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  summaryText: {
    fontSize: 12,
    color: Theme.colors.text.secondary,
  },
  list: {
    maxHeight: 320,
  },
  customerItem: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.neutral[100],
  },
  rankContainer: {
    alignItems: 'center',
    marginRight: 12,
    width: 50,
  },
  rankText: {
    fontSize: 10,
    fontWeight: '600',
    color: Theme.colors.text.disabled,
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
    color: Theme.colors.text.primary,
    flex: 1,
  },
  returningBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  returningText: {
    fontSize: 9,
    fontWeight: '600',
    color: '#059669',
  },
  customerPhone: {
    fontSize: 11,
    color: Theme.colors.text.secondary,
    marginTop: 2,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 6,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 11,
    color: Theme.colors.text.secondary,
  },
  barContainer: {
    marginTop: 8,
  },
  barBackground: {
    height: 6,
    backgroundColor: Theme.colors.neutral[200],
    borderRadius: 3,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 3,
  },
  revenueText: {
    fontSize: 12,
    fontWeight: '600',
    color: Theme.colors.text.primary,
    marginTop: 4,
    textAlign: 'right',
  },
});
