import { StyleSheet } from 'react-native';
import { Fonts } from '@src/constants/Fonts';

export const createStyles = (colors: any, isDark: boolean) => StyleSheet.create({
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
    color: colors.text.secondary,
    marginLeft: 12,
  },
  sectionDivider: {
    marginBottom: 16,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: colors.background.paper,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  tableHeaderCell: {
    fontFamily: Fonts.bold,
    fontSize: 12,
    color: colors.text.secondary,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  tableRowEven: {
    backgroundColor: colors.background.card,
  },
  tableRowOdd: {
    backgroundColor: colors.background.paper,
  },
  tableRowLast: {
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderBottomWidth: 0,
  },
  tableCell: {
    fontFamily: Fonts.regular,
    fontSize: 13,
    color: colors.text.secondary,
  },
  goodsId: {
    fontFamily: Fonts.meduim,
    fontSize: 13,
    color: colors.text.secondary,
  },
  goodsDescription: {
    fontFamily: Fonts.regular,
    fontSize: 11,
    color: colors.text.secondary,
    marginTop: 2,
  },
});
