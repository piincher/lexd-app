import { StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';
import { COLORS } from '@src/constants/Colors';

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
  stepsContainer: {
    gap: Theme.spacing.lg,
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepNumberContainer: {
    width: 50,
    height: 50,
    borderRadius: Theme.radius.lg,
    backgroundColor: COLORS.blue,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Theme.spacing.md,
  },
  stepNumber: {
    fontSize: 16,
    color: Theme.neutral.white,
  },
  stepContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.neutral.white,
    padding: Theme.spacing.md,
    borderRadius: Theme.radius.lg,
  },
  stepIconContainer: {
    width: 44,
    height: 44,
    borderRadius: Theme.radius.md,
    backgroundColor: `${COLORS.blue}15`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Theme.spacing.md,
  },
  stepTextContainer: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    color: Theme.neutral[800],
    marginBottom: 2,
  },
  stepDescription: {
    fontSize: 13,
    color: Theme.neutral[500],
  },
});
