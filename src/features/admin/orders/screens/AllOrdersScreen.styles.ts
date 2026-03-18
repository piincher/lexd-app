import { StyleSheet } from 'react-native';
import { COLORS } from '@src/constants/Colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  searchBar: {
    marginHorizontal: 12,
    marginTop: 12,
    marginBottom: 8,
    backgroundColor: '#FFF',
    borderRadius: 10,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    height: 46,
  },
  searchInput: {
    fontSize: 14,
    minHeight: 0,
  },
  tabsContainer: {
    maxHeight: 44,
  },
  tabsContent: {
    paddingHorizontal: 12,
    gap: 8,
  },
  tabButton: {
    borderRadius: 8,
    borderColor: '#E0E0E0',
  },
  listContainer: {
    flex: 1,
    marginTop: 4,
  },
  loadMoreIndicator: {
    padding: 16,
  },
});

export default styles;
