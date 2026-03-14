import { StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';

export const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
    borderRadius: 16,
    elevation: 2,
    backgroundColor: '#FFFFFF',
    borderLeftWidth: 4,
    borderLeftColor: Theme.status.success,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: Theme.neutral[800],
    marginLeft: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  label: {
    fontSize: 14,
    color: Theme.neutral[600],
  },
  value: {
    fontSize: 15,
    fontWeight: '600',
    color: Theme.neutral[800],
  },
  divider: {
    marginVertical: 8,
    backgroundColor: Theme.neutral[200],
  },
  highlightRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Theme.primary[50],
    padding: 14,
    borderRadius: 10,
    marginVertical: 8,
  },
  highlightLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Theme.neutral[700],
  },
  totalValue: {
    fontSize: 20,
    fontWeight: '800',
    color: Theme.primary[600],
  },
  chipContainer: {
    marginTop: 16,
    alignItems: 'flex-start',
  },
  chip: {
    height: 36,
    paddingHorizontal: 8,
  },
});
