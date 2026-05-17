import { StyleSheet } from 'react-native';
import { Fonts } from '@src/constants/Fonts';

export const createStyles = (colors: any) => StyleSheet.create({
  defaultInput: {
    borderWidth: 0.5,
    width: '70%',
    minHeight: 48,
    borderColor: colors.border,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    color: colors.text.primary,
    padding: 5,
    fontSize: 16,
    fontFamily: Fonts.meduim,
  },
  rightIcon: {
    width: 40,
    height: 40,
    position: 'absolute',
    top: 0,
    right: 0,
    justifyContent: 'center',
  },
  descriptionText: {
    color: colors.primary.main,
    fontSize: 12,
    fontFamily: Fonts.regular,
    marginVertical: 5,
  },
});
