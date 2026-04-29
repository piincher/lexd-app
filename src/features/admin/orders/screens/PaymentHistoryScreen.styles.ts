import { StyleSheet } from 'react-native';

export const createPaymentHistoryScreenStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.default,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 32,
  },
});
