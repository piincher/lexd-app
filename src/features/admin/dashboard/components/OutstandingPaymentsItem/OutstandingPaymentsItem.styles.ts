import { StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: Theme.colors.background.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#FEF2F2',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  goodsId: {
    fontSize: 15,
    fontWeight: '700',
    color: Theme.colors.text.primary,
  },
  description: {
    fontSize: 13,
    color: Theme.colors.text.secondary,
    marginTop: 2,
  },
  client: {
    fontSize: 13,
    fontWeight: '600',
    color: Theme.colors.text.secondary,
    marginTop: 4,
  },
  phone: {
    fontSize: 12,
    color: Theme.colors.text.secondary,
    marginTop: 1,
  },
  right: {
    alignItems: 'center',
    marginLeft: 8,
  },
  statusBadge: {
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
  },
  chevron: {
    marginTop: 8,
  },
  footer: {
    flexDirection: 'row',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    gap: 8,
  },
  metric: {
    flex: 1,
    backgroundColor: Theme.colors.background.default,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  metricHighlight: {
    backgroundColor: '#FEF2F2',
  },
  metricLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: Theme.colors.text.disabled,
    marginBottom: 2,
  },
  metricValue: {
    fontSize: 13,
    fontWeight: '700',
    color: Theme.colors.text.primary,
  },
  metricValuePaid: {
    fontSize: 13,
    fontWeight: '700',
    color: '#10B981',
  },
  metricValueDue: {
    fontSize: 13,
    fontWeight: '700',
    color: '#EF4444',
  },
});
