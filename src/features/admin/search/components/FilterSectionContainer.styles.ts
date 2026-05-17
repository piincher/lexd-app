import { StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';

export const createStyles = (colors: any) => StyleSheet.create({
  scrollContent: {
    padding: Theme.spacing.lg,
  },
  footer: {
    padding: Theme.spacing.lg,
    paddingTop: Theme.spacing.xl,
  },
  applyButton: {
    borderRadius: Theme.radius.lg,
  },
});
