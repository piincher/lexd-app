import { StyleSheet, Dimensions } from 'react-native';
import { Theme } from '@src/constants/Theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    marginTop: Theme.spacing['2xl'],
    backgroundColor: Theme.neutral[100],
    marginHorizontal: 0,
    paddingHorizontal: Theme.spacing.lg,
    paddingVertical: Theme.spacing['2xl'],
  },
  title: {
    fontSize: 24,
    color: Theme.neutral[800],
    marginBottom: Theme.spacing.lg,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Theme.spacing.md,
  },
  item: {
    width: (SCREEN_WIDTH - Theme.spacing.lg * 2 - Theme.spacing.md * 3) / 4,
  },
  surface: {
    padding: Theme.spacing.md,
    borderRadius: Theme.radius.lg,
    alignItems: 'center',
    aspectRatio: 1,
    justifyContent: 'center',
  },
  label: {
    fontSize: 12,
    color: Theme.neutral[600],
    marginTop: Theme.spacing.xs,
  },
});
