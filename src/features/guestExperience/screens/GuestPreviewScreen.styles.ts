import { StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';

export const useGuestPreviewScreenStyles = () => {
  return StyleSheet.create({
    screen: { flex: 1 },
    scrollView: { flex: 1 },
    content: { flexGrow: 1 },
    band: {
      paddingVertical: Theme.spacing['2xl'],
      marginTop: Theme.spacing.lg,
    },
    bottomSpacer: {
      height: Theme.spacing['4xl'],
    },
  });
};
