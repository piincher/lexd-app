import { StyleSheet } from 'react-native';
import { COLORS } from '@src/constants/Colors';

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 16,
    bottom: 20,
    alignItems: 'flex-end',
    gap: 12,
  },
  fab: {
    backgroundColor: COLORS.blue,
    borderRadius: 12,
  },
  fabManual: {
    backgroundColor: COLORS.success,
    borderRadius: 12,
  },
});

export default styles;
