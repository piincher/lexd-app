import { StyleSheet, Dimensions } from 'react-native';
import { Theme } from '@src/constants/Theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    marginTop: Theme.spacing['2xl'],
    paddingHorizontal: Theme.spacing.lg,
  },
  title: {
    fontSize: 24,
    color: Theme.neutral[800],
    marginBottom: Theme.spacing.lg,
  },
  scrollContent: {
    gap: Theme.spacing.md,
    paddingRight: Theme.spacing.lg,
  },
  cardContainer: {
    width: SCREEN_WIDTH * 0.75,
  },
  cardPressable: {
    flex: 1,
  },
  card: {
    padding: Theme.spacing.lg,
    borderRadius: Theme.radius.xl,
    borderLeftWidth: 4,
    height: 200,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: Theme.radius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
  },
  cardTitle: {
    fontSize: 20,
    color: Theme.neutral[800],
    marginBottom: Theme.spacing.sm,
  },
  cardDescription: {
    fontSize: 14,
    color: Theme.neutral[500],
    marginBottom: Theme.spacing.md,
    lineHeight: 20,
  },
  features: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Theme.spacing.sm,
  },
  featureBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.neutral[100],
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: Theme.radius.sm,
    gap: 4,
  },
  featureText: {
    fontSize: 11,
  },
});
