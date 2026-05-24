import { StyleSheet, Dimensions } from 'react-native';
import type { AppTheme } from '@src/constants/Theme';

const { width } = Dimensions.get('window');
const BANNER_WIDTH = width - 32;
const BANNER_HEIGHT = Math.min(190, BANNER_WIDTH * 0.48);

export const createStyles = (colors: AppTheme['colors']) => StyleSheet.create({
  container: {
    marginTop: 24,
    marginBottom: 4,
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
    borderRadius: 18,
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
