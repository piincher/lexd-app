import { StyleSheet } from 'react-native';

export const createStyles = (colors: any, isDark?: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral[50],
  },
});
