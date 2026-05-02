import { StyleSheet, Dimensions } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  skeletonCard: {
    width: (SCREEN_WIDTH - 56) / 2,
    height: 120,
    borderRadius: 16,
  },
});
