/**
 * RouteListScreen Styles
 */

import { StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';

export const createStyles = (colors: any, isDark?: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.default,
  },
  listContent: {
    paddingTop: Theme.spacing.sm,
    paddingBottom: 120,
    paddingHorizontal: Theme.spacing.xl,
  },
  snackbar: {
    backgroundColor: colors.neutral[800],
    borderRadius: Theme.radius.lg,
    marginBottom: Theme.spacing.lg,
  },
});
