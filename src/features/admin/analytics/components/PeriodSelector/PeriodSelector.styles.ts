import { StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
  },
  button: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: Theme.neutral[100],
  },
  buttonActive: {
    backgroundColor: '#3B82F6',
  },
  buttonText: {
    fontSize: 12,
    fontWeight: '500',
    color: Theme.neutral[600],
  },
  buttonTextActive: {
    color: '#FFFFFF',
  },
});
