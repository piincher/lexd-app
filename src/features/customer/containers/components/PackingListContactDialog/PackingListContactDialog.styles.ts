import { StyleSheet } from 'react-native';
import { Fonts } from '@src/constants/Fonts';
import { COLORS } from '@src/constants/Colors';

export const styles = StyleSheet.create({
  dialogText: {
    fontSize: 14,
    marginBottom: 8,
    fontFamily: Fonts.regular,
  },
  dialogLabel: {
    fontFamily: Fonts.bold,
    color: COLORS.DarkGrey,
  },
});
