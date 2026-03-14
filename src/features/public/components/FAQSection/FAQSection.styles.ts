import { StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';

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
  list: {
    gap: Theme.spacing.md,
  },
  itemContainer: {
    borderRadius: Theme.radius.lg,
    overflow: 'hidden',
  },
  questionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Theme.spacing.lg,
  },
  question: {
    fontSize: 15,
    color: Theme.neutral[800],
    flex: 1,
    paddingRight: Theme.spacing.sm,
  },
  answerContainer: {
    paddingHorizontal: Theme.spacing.lg,
    paddingBottom: Theme.spacing.lg,
  },
  answer: {
    fontSize: 14,
    color: Theme.neutral[600],
    lineHeight: 22,
  },
});
