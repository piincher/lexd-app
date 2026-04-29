/**
 * RouteListScreen Styles
 */

import { StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background.default,
  },
  listContent: {
    paddingTop: Theme.spacing.sm,
    paddingBottom: 120,
    paddingHorizontal: Theme.spacing.xl,
  },
  snackbar: {
    backgroundColor: Theme.neutral[800],
    borderRadius: Theme.radius.lg,
    marginBottom: Theme.spacing.lg,
  },
});
