import { StyleSheet } from 'react-native';
import { Fonts } from '@src/constants/Fonts';
import { Theme } from '@src/constants/Theme';

export const createStyles = (colors: any, isDark?: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral[50],
  },
  centerState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Theme.spacing.xl,
  },
  stateText: {
    textAlign: 'center',
    marginTop: 12,
    color: colors.neutral[500],
    lineHeight: 20,
  },
  errorTitle: {
    fontFamily: Fonts.bold,
    fontSize: 18,
    color: colors.neutral[900],
  },
  retryButton: {
    marginTop: 18,
    borderRadius: 10,
    minWidth: 140,
  },
});
