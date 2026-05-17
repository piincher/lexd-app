import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  item: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  indicator: {
    width: 4,
    height: 40,
    borderRadius: 2,
  },
  content: {
    flex: 1,
    gap: 8,
  },
  line: {
    height: 14,
    borderRadius: 4,
    width: '80%',
  },
  lineShort: {
    height: 14,
    borderRadius: 4,
    width: '50%',
  },
});
