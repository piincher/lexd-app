import { StyleSheet } from 'react-native';
import { Fonts } from '@src/constants/Fonts';
import type { ThemeContextType } from '@src/constants/Theme';
import { OVERLINE, RADIUS } from '@src/shared/ui/designLanguage';

type AppColors = ThemeContextType['colors'];

export const createClientIdBadgeStyles = (colors: AppColors) =>
  StyleSheet.create({
    container: {
      minHeight: 50,
      marginTop: 12,
      paddingHorizontal: 14,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      borderRadius: RADIUS.card,
      backgroundColor: colors.primary[50],
      overflow: 'hidden',
    },
    perimeter: {
      position: 'absolute',
      top: 0,
      left: 0,
    },
    copy: {
      flex: 1,
      minWidth: 0,
    },
    label: {
      ...OVERLINE,
      fontFamily: Fonts.medium,
      color: colors.primary[700],
    },
    value: {
      marginTop: 1,
      fontSize: 15,
      fontFamily: Fonts.bold,
      letterSpacing: 0.4,
      color: colors.primary[800],
    },
  });
