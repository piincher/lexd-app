import { StyleSheet } from 'react-native';

export const createStyles = (colors: any, isDark?: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral[50],
  },
  flex: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  subscriptionSection: {
    maxHeight: 280,
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 8,
  },
  recipientSection: {
    flex: 1,
  },
  recipientSectionWithSubs: {
    marginTop: 4,
  },
});
