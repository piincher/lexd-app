import { StyleSheet } from 'react-native';
import { Fonts } from '@src/constants/Fonts';

export const createStyles = (colors: any, isDark?: boolean) => StyleSheet.create({
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  infoRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  infoIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 13,
    color: colors.text.secondary,
    fontFamily: Fonts.medium,
  },
  infoValue: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text.primary,
    fontFamily: Fonts.semiBold,
    maxWidth: '45%',
    textAlign: 'right',
  },
});
