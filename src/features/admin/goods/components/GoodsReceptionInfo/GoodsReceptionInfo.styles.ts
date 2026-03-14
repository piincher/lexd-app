import { StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';

export const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
    borderRadius: 16,
    elevation: 2,
    backgroundColor: '#FFFFFF',
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
  grid: {
    flexDirection: 'row',
    gap: 16,
  },
  item: {
    flex: 1,
    backgroundColor: Theme.neutral[50],
    padding: 14,
    borderRadius: 12,
  },
  label: {
    fontSize: 12,
    color: Theme.neutral[500],
    marginBottom: 4,
  },
  value: {
    fontSize: 14,
    fontWeight: '600',
    color: Theme.neutral[800],
  },
});
