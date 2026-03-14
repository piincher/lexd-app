import { StyleSheet, Dimensions } from 'react-native';
import { Theme } from '@src/constants/Theme';
import { COLORS } from '@src/constants/Colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    marginTop: Theme.spacing['2xl'],
    paddingHorizontal: Theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: 24,
    color: Theme.neutral[800],
    marginBottom: Theme.spacing.lg,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Theme.spacing.md,
  },
  card: {
    width: (SCREEN_WIDTH - Theme.spacing.lg * 2 - Theme.spacing.md) / 2,
  },
  surface: {
    padding: Theme.spacing.lg,
    borderRadius: Theme.radius.lg,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: COLORS.blue,
    marginTop: Theme.spacing.sm,
  },
  subtitle: {
    fontSize: 14,
    color: Theme.neutral[600],
    marginBottom: Theme.spacing.xs,
  },
  description: {
    fontSize: 12,
    color: Theme.neutral[500],
    textAlign: 'center',
  },
});
