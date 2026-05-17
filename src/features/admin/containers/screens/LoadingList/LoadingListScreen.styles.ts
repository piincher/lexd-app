import { StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';

export const getStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background.default,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: Theme.spacing.lg,
  },
  singleClientBanner: {
    backgroundColor: colors.feedback.successBg, // green-100
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: colors.status.success, // green-600
  },
  singleClientText: {
    color: colors.feedback.successDark, // green-800
    fontSize: 14,
    fontWeight: '600',
  },
  spacer: {
    height: 100,
  },
});
