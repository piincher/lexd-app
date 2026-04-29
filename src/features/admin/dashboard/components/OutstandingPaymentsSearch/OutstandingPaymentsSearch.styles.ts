import { StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';

export const styles = StyleSheet.create({
  searchRow: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: Theme.colors.background.card,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.colors.background.paper,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: Theme.colors.text.primary,
  },
});
