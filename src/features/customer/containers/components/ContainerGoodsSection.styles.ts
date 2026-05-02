import { StyleSheet } from 'react-native';
import { Fonts } from '@src/constants/Fonts';

export const styles = StyleSheet.create({
  sectionCard: {
    marginBottom: 16,
    borderRadius: 12,
    padding: 16,
    elevation: 1,
  },
  sectionTitle: {
    fontFamily: Fonts.bold,
    fontSize: 16,
  },
  goodsSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  goodsSubtitle: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    marginBottom: 12,
  },
  summaryBox: {
    flexDirection: 'row',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
  summaryItem: {
    flex: 1,
  },
  summaryValue: {
    fontFamily: Fonts.bold,
    fontSize: 16,
  },
  summaryLabel: {
    fontFamily: Fonts.regular,
    fontSize: 11,
    marginTop: 2,
  },
  previewText: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    marginBottom: 8,
  },
  goodsItem: {
    paddingVertical: 4,
    paddingHorizontal: 0,
  },
  goodsRightContent: {
    alignItems: 'flex-end',
  },
  goodsCbm: {
    fontFamily: Fonts.meduim,
    fontSize: 12,
    marginBottom: 4,
  },
});
