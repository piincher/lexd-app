/**
 * RouteListFab Styles
 */

import { StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';

export const styles = StyleSheet.create({
  fabContainer: {
    position: 'absolute',
    right: Theme.spacing.xl,
    bottom: Theme.spacing.xl,
    borderRadius: Theme.radius.full,
    ...Theme.shadows.xl,
  },
  fab: {
    width: 64,
    height: 64,
    borderRadius: Theme.radius.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
