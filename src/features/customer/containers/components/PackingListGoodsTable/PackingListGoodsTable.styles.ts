import { StyleSheet } from 'react-native';
import { Fonts } from '@src/constants/Fonts';
import { COLORS } from '@src/constants/Colors';

export const styles = StyleSheet.create({
  sectionCard: {
    marginBottom: 16,
    elevation: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: COLORS.DarkGrey,
    marginLeft: 12,
  },
  sectionDivider: {
    marginBottom: 16,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  tableHeaderCell: {
    fontFamily: Fonts.bold,
    fontSize: 12,
    color: COLORS.DarkGrey,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  tableRowEven: {
    backgroundColor: '#FFFFFF',
  },
  tableRowOdd: {
    backgroundColor: '#F8FAFC',
  },
  tableRowLast: {
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderBottomWidth: 0,
  },
  tableCell: {
    fontFamily: Fonts.regular,
    fontSize: 13,
    color: COLORS.DarkGrey,
  },
  goodsId: {
    fontFamily: Fonts.meduim,
    fontSize: 13,
    color: COLORS.DarkGrey,
  },
  goodsDescription: {
    fontFamily: Fonts.regular,
    fontSize: 11,
    color: COLORS.DimGray,
    marginTop: 2,
  },
});
