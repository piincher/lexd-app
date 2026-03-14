import { StyleSheet } from 'react-native';
import { Fonts } from '@src/constants/Fonts';
import { COLORS } from '@src/constants/Colors';

export const styles = StyleSheet.create({
  footer: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  footerText: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: COLORS.DimGray,
    marginTop: 8,
  },
  footerSubtext: {
    fontFamily: Fonts.bold,
    fontSize: 13,
    color: COLORS.DarkGrey,
    marginTop: 4,
  },
  footerRoute: {
    fontFamily: Fonts.meduim,
    fontSize: 11,
    color: COLORS.SlateGray,
    marginTop: 4,
  },
});
