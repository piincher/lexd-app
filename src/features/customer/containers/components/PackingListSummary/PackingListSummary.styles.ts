import { StyleSheet } from 'react-native';
import { Fonts } from '@src/constants/Fonts';
import { COLORS } from '@src/constants/Colors';

export const styles = StyleSheet.create({
  summaryCard: {
    marginBottom: 16,
    elevation: 1,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryTitle: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: COLORS.DarkGrey,
    marginLeft: 12,
  },
  summaryDivider: {
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontFamily: Fonts.meduim,
    fontSize: 14,
    color: COLORS.DimGray,
  },
  summaryValue: {
    fontFamily: Fonts.bold,
    fontSize: 14,
    color: COLORS.DarkGrey,
  },
});
