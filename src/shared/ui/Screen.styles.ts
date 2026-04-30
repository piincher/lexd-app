import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
  },
  cardContent: {
    padding: 16,
  },
  simpleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  backButton: {
    padding: 10,
    minWidth: 44,
  },
  backButtonText: {
    fontSize: 24,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
  },
  rightAction: {
    minWidth: 44,
    alignItems: 'flex-end',
  },
  rightPlaceholder: {
    minWidth: 44,
  },
});
