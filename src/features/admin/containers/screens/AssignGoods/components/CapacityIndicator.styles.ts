import { StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';

export const styles = StyleSheet.create({
  capacityContainer: {
    backgroundColor: Theme.neutral[50],
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  capacityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  capacityLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Theme.neutral[700],
  },
  capacityValue: {
    fontSize: 16,
    fontWeight: '700',
  },
});
