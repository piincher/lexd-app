import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  header: {
    elevation: 0,
    shadowOpacity: 0,
  },
  backPlaceholder: {
    width: 48,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: '700',
    fontSize: 18,
  },
  subtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  rightContainer: {
    minWidth: 48,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  rightPlaceholder: {
    width: 48,
  },
});
