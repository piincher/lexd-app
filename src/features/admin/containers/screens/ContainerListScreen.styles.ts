import { StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';

export const createStyles = (colors: any) => StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: colors.background.default,
   },
   snackbar: {
      backgroundColor: colors.neutral?.[800] || Theme.neutral[800],
      borderRadius: Theme.radius.lg,
      marginBottom: Theme.spacing.lg,
   },
});
