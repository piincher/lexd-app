/**
 * RouteListLoading Styles
 */

import { StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';

export const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Theme.spacing['4xl'],
  },
  loadingText: {
    marginTop: Theme.spacing.lg,
    fontSize: 16,
    color: Theme.neutral[500],
    fontWeight: '500',
  },
});
