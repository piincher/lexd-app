import { StyleSheet, Platform } from 'react-native';
import { Fonts } from '@src/constants/Fonts';
import type { ThemeContextType } from '@src/constants/Theme';

type AppColors = ThemeContextType['colors'];

export const createStyles = (colors: AppColors) => StyleSheet.create({
  menuGroup: {
    marginTop: 14,
  },
  menuGroupTitle: {
    fontSize: 13,
    fontFamily: Fonts.bold,
    letterSpacing: 0,
    paddingHorizontal: 20,
    marginBottom: 9,
  },
  menuCard: {
    marginHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: colors.neutral[900],
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.03,
        shadowRadius: 6,
      },
      android: { elevation: 1 },
    }),
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 66,
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 14,
  },
  menuItemPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.99 }],
  },
  menuIconCircle: {
    width: 42,
    height: 42,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuTextCol: {
    flex: 1,
    minWidth: 0,
  },
  menuItemTitle: {
    fontSize: 15,
    fontFamily: Fonts.medium,
  },
  menuItemSubtitle: {
    fontSize: 12,
    fontFamily: Fonts.regular,
    marginTop: 1,
    lineHeight: 16,
  },
  menuDivider: {
    height: StyleSheet.hairlineWidth,
    marginLeft: 72,
  },
});
