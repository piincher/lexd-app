import { StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';

export const styles = StyleSheet.create({
  filterRow: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 16,
    paddingBottom: 10,
    backgroundColor: Theme.colors.background.card,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: Theme.colors.background.paper,
  },
  filterChipActive: {
    backgroundColor: '#1F2937',
  },
  filterChipText: {
    fontSize: 13,
    fontWeight: '600',
    color: Theme.colors.text.secondary,
  },
  filterChipTextActive: {
    color: 'white',
  },
});
