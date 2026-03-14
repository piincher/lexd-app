import { StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F7FC',
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: Theme.spacing.lg,
    paddingBottom: Theme.spacing['4xl'],
  },
  formCard: {
    borderRadius: Theme.radius['2xl'],
    backgroundColor: Theme.neutral.white,
    ...Theme.shadows.md,
  },
  formContent: {
    padding: Theme.spacing.lg,
  },
});
