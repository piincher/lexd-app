import { StyleSheet } from 'react-native';
import { Fonts } from '@src/constants/Fonts';
import { Theme } from '@src/constants/Theme';

export const styles = StyleSheet.create({
  appbar: {
    backgroundColor: Theme.colors.background.card,
    elevation: 0,
  },
  appbarTitle: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: Fonts.bold,
  },
});
