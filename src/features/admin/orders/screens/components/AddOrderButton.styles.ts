import { StyleSheet } from 'react-native';
import { COLORS } from '@src/constants/Colors';

export const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 20,
    backgroundColor: COLORS.blue,
    borderRadius: 12,
  },
});

export default styles;
