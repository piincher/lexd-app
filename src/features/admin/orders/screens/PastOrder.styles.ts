import { StyleSheet } from 'react-native';
import { LOGISTICS_COLORS } from './components/pastOrderConstants';

export const createStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: LOGISTICS_COLORS.light,
    },
    listContainer: {
      paddingHorizontal: 20,
      paddingBottom: 20,
    },
  });
