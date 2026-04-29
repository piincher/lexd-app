import { StyleSheet } from 'react-native';
import { Fonts } from '@src/constants/Fonts';

export const styles = StyleSheet.create({
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
  },
  infoIcon: {
    marginRight: 8,
    width: 20,
  },
  infoLabel: {
    fontSize: 13,
    fontFamily: Fonts.medium,
    width: 110,
  },
  infoValue: {
    fontSize: 13,
    fontFamily: Fonts.semiBold,
    flex: 1,
    textAlign: 'right',
  },
});
