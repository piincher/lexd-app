/**
 * CustomerDashboardScreen Styles
 */

import { StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.neutral[50],
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: Theme.spacing.sm,
  },
  bottomSpacing: {
    height: Theme.spacing['4xl'],
  },
});
