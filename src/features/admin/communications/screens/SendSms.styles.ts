import { StyleSheet } from 'react-native';

export const createStyles = (colors: any, _isDark?: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.default,
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
