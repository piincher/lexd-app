import { StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.colors.background.card,
    borderRadius: 16,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: Theme.colors.text.primary,
  },
  growthBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  growthText: {
    fontSize: 12,
    fontWeight: '600',
  },
  periodSelector: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  periodButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Theme.neutral[100],
  },
  periodButtonText: {
    fontSize: 13,
    fontWeight: '500',
    color: Theme.colors.text.secondary,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendText: {
    fontSize: 12,
    color: Theme.colors.text.secondary,
  },
  noData: {
    textAlign: 'center',
    color: Theme.colors.text.secondary,
    marginTop: 100,
  },
});
