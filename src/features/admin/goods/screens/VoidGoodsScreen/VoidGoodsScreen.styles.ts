/**
 * VoidGoodsScreen styles
 */

import { StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';

export const createStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    padding: Theme.spacing.lg,
  },
  spacer: {
    flex: 1,
  },
});
