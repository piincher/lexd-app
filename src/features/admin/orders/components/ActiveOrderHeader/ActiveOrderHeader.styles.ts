import { StyleSheet } from 'react-native';
import { Fonts } from '@src/constants/Fonts';

export const createStyles = (colors: any, isDark?: boolean) => StyleSheet.create({
  appbar: {
    backgroundColor: colors.background.card,
    elevation: 0,
  },
  appbarTitle: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: Fonts.bold,
  },
});
