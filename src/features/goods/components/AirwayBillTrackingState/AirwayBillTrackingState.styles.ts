import { StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';
import { Fonts } from '@src/constants/Fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.neutral[50],
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
    color: Theme.neutral[500],
    lineHeight: 20,
  },
  errorTitle: {
    fontFamily: Fonts.bold,
    fontSize: 18,
    color: Theme.neutral[900],
  },
  retryButton: {
    marginTop: 18,
    borderRadius: 10,
    minWidth: 140,
  },
});
