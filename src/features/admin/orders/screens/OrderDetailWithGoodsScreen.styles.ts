import { StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';

export const createStyles = (colors: any, isDark?: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    padding: Theme.spacing.md,
    gap: Theme.spacing.md,
  },
  backButtonContainer: {
    marginTop: 20,
    marginBottom: 40,
  },
});

export default createStyles;
