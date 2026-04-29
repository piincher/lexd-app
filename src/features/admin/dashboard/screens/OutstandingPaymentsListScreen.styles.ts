import { StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background.default,
  },
  list: {
    padding: 16,
    paddingBottom: 32,
  },
});
