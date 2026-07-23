import { StyleSheet } from 'react-native';
import { Fonts } from '@src/constants/Fonts';
import { HAIRLINE, RADIUS } from '@src/shared/ui/designLanguage';
import type { ThemeContextType } from '@src/constants/Theme';

type AppColors = ThemeContextType['colors'];

export const createStyles = (colors: AppColors) => StyleSheet.create({
  menuGroup: {
    marginTop: 14,
  },
  menuGroupTitle: {
    fontSize: 11,
    fontFamily: Fonts.bold,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    paddingHorizontal: 20,
    marginBottom: 9,
  },
  menuCard: {
    marginHorizontal: 16,
    borderRadius: RADIUS.card,
    borderWidth: HAIRLINE,
    overflow: 'hidden',
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
    borderRadius: RADIUS.control,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuTextCol: {
    flex: 1,
    minWidth: 0,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  menuItemTitle: {
    fontSize: 15,
    fontFamily: Fonts.medium,
  },
  highlightDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
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
