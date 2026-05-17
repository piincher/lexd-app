import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const BANNER_WIDTH = width - 32;
const BANNER_HEIGHT = BANNER_WIDTH * 0.55;

export const createStyles = (colors: any) => StyleSheet.create({
  container: {
    marginTop: 16,
    marginBottom: 8,
    alignItems: 'center',
  },
  loadingContainer: {
    height: BANNER_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerImage: {
    width: BANNER_WIDTH,
    height: BANNER_HEIGHT,
    borderRadius: 16,
    marginHorizontal: 16,
  },
  paginationActive: {
    backgroundColor: colors.primary.main,
  },
  paginationInactive: {
    backgroundColor: colors.text.secondary,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
    marginTop: 12,
  },
});

export { BANNER_WIDTH, BANNER_HEIGHT };
