import { StyleSheet } from 'react-native';
import { Fonts } from '@src/constants/Fonts';

export const createStyles = (colors: any, isDark: boolean) => StyleSheet.create({
  actionBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.background.card,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    gap: 12,
    elevation: 8,
    shadowColor: colors.neutral[900],
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  actionBarButton: {
    flex: 1,
    borderColor: colors.primary.main,
  },
  actionBarButtonPrimary: {
    backgroundColor: colors.primary.main,
  },
  actionBarButtonLabel: {
    fontFamily: Fonts.meduim,
    fontSize: 14,
  },
  actionBarButtonLabelPrimary: {
    fontFamily: Fonts.bold,
    fontSize: 14,
    color: colors.text.inverse,
  },
});
