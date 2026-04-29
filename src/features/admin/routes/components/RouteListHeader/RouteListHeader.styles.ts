/**
 * RouteListHeader Styles
 */

import { StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';

export const styles = StyleSheet.create({
  header: {
    paddingHorizontal: Theme.spacing.xl,
    paddingTop: Theme.spacing.lg,
    paddingBottom: Theme.spacing.xl,
    borderBottomLeftRadius: Theme.radius['3xl'],
    borderBottomRightRadius: Theme.radius['3xl'],
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Theme.spacing.lg,
  },
  headerGreeting: {
    fontSize: 14,
    fontWeight: '600',
    color: Theme.neutral[500],
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: Theme.neutral[800],
    letterSpacing: -0.5,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: Theme.radius.full,
    backgroundColor: Theme.colors.background.card,
    justifyContent: 'center',
    alignItems: 'center',
    ...Theme.shadows.sm,
  },
});
