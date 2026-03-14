import { StyleSheet } from 'react-native';
import { Fonts } from '@src/constants/Fonts';
import { COLORS } from '@src/constants/Colors';

export const styles = StyleSheet.create({
  documentCard: {
    marginBottom: 16,
    elevation: 2,
  },
  headerCard: {
    backgroundColor: '#FFFFFF',
  },
  documentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  documentIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: '#E0F2FE',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  documentTitleContainer: {
    flex: 1,
  },
  documentTitle: {
    fontFamily: Fonts.bold,
    fontSize: 18,
    color: COLORS.DarkGrey,
    letterSpacing: 1,
  },
  documentSubtitle: {
    fontFamily: Fonts.meduim,
    fontSize: 16,
    color: COLORS.DimGray,
    marginTop: 4,
  },
  headerDivider: {
    marginVertical: 16,
  },
  documentMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontFamily: Fonts.regular,
    fontSize: 13,
    color: COLORS.DimGray,
    marginLeft: 6,
  },
});
