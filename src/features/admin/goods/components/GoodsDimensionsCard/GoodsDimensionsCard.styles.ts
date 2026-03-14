import { StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';

export const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
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
    marginLeft: 8,
  },
  grid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    backgroundColor: Theme.neutral[50],
    borderRadius: 12,
    marginHorizontal: 4,
  },
  value: {
    fontSize: 16,
    fontWeight: '700',
    color: Theme.neutral[800],
    marginTop: 4,
  },
  label: {
    fontSize: 12,
    color: Theme.neutral[500],
    marginTop: 2,
    fontWeight: '500',
  },
  dimensionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Theme.neutral[100],
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  dimensionsText: {
    fontSize: 14,
    fontWeight: '600',
    color: Theme.neutral[700],
    marginLeft: 8,
  },
});
