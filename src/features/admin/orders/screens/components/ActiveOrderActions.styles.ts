import { StyleSheet } from 'react-native';
import { Fonts } from '@src/constants/Fonts';
import { Theme } from '@src/constants/Theme';

export const styles = StyleSheet.create({
  actionsSection: {
    paddingHorizontal: 12,
    paddingTop: 4,
    gap: 10,
  },
  updateBtn: {
    borderRadius: 12,
    paddingVertical: 4,
  },
  deliverBtn: {
    borderRadius: 12,
    paddingVertical: 4,
  },
  goodsBtn: {
    borderRadius: 12,
    paddingVertical: 4,
  },
  btnLabel: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: Fonts.semiBold,
  },
  deliveredBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#E8F5E9',
    borderRadius: 12,
    paddingVertical: 14,
  },
  deliveredText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2E7D32',
    fontFamily: Fonts.semiBold,
  },
});
