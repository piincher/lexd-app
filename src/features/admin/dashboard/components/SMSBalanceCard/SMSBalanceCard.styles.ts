import { StyleSheet } from 'react-native';
import { Fonts } from '@src/constants/Fonts';
import { Theme } from '@src/constants/Theme';
import type { ThemeContextType } from '@src/constants/Theme';

type AppThemeColors = ThemeContextType['colors'];

export const createStyles = (colors: AppThemeColors, isDark?: boolean) =>
  StyleSheet.create({
    card: {
      marginBottom: 16,
      borderRadius: 16,
      padding: 16,
      backgroundColor: colors.background.card,
      borderWidth: 1,
      borderLeftWidth: 4,
      borderColor: colors.border,
      ...Theme.shadows.md,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 14,
    },
    headerLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    iconWrap: {
      width: 38,
      height: 38,
      borderRadius: 11,
      backgroundColor: isDark ? colors.action.hover : colors.background.paper,
      borderWidth: 1,
      borderColor: colors.border,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 14,
      fontFamily: Fonts.bold,
      color: colors.text.primary,
    },
    subtitle: {
      fontSize: 11,
      fontFamily: Fonts.regular,
      color: colors.text.secondary,
      marginTop: 1,
    },
    statusBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 10,
      backgroundColor: isDark ? colors.action.hover : colors.background.paper,
      borderWidth: 1,
      borderColor: colors.border,
    },
    statusText: {
      color: colors.text.primary,
      fontSize: 11,
      fontFamily: Fonts.bold,
    },
    valueRow: {
      flexDirection: 'row',
      alignItems: 'baseline',
      gap: 6,
      marginBottom: 12,
    },
    value: {
      fontSize: 32,
      fontFamily: Fonts.bold,
      color: colors.text.primary,
    },
    valueLabel: {
      fontSize: 13,
      fontFamily: Fonts.regular,
      color: colors.text.secondary,
    },
    progressTrack: {
      height: 8,
      borderRadius: 4,
      backgroundColor: isDark ? colors.action.selected : colors.neutral[100],
      overflow: 'hidden',
      marginBottom: 8,
    },
    progressFill: {
      height: '100%',
      borderRadius: 4,
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    footerText: {
      fontSize: 11,
      fontFamily: Fonts.regular,
      color: colors.text.secondary,
    },
    footerStrong: {
      fontFamily: Fonts.bold,
      color: colors.text.primary,
    },
  });
