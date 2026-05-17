import { StyleSheet } from 'react-native';
import { Fonts } from '@src/constants/Fonts';
import { Theme } from '@src/constants/Theme';

export const createStyles = (colors: any, isDark: boolean) =>
  StyleSheet.create({
    container: {
      marginTop: 32,
      paddingHorizontal: 16,
    },
    scoreCard: {
      borderRadius: 16,
      padding: 16,
      marginBottom: 12,
      ...Theme.shadows.sm,
    },
    card: {
      borderRadius: 20,
      overflow: 'hidden',
      ...Theme.shadows.md,
    },
    headerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 14,
      paddingHorizontal: 14,
    },
    featureCol: {
      flex: 1,
    },
    brandCol: {
      width: 76,
      alignItems: 'center',
    },
    headerLabel: {
      fontFamily: Fonts.meduim,
      fontSize: 12,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    brandBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 20,
    },
    brandBadgeText: {
      fontFamily: Fonts.bold,
      fontSize: 10,
      color: colors.neutral.white,
      letterSpacing: 0.3,
    },
    othersBadge: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 20,
    },
    othersBadgeText: {
      fontFamily: Fonts.meduim,
      fontSize: 10,
      letterSpacing: 0.3,
    },
    divider: {
      height: 1,
      marginHorizontal: 14,
    },
    featureRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 11,
      paddingHorizontal: 14,
    },
    featureLabelRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    featureIconCircle: {
      width: 26,
      height: 26,
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
    },
    featureLabel: {
      fontFamily: Fonts.meduim,
      fontSize: 12,
      flexShrink: 1,
    },
    ctaStrip: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      paddingVertical: 14,
      marginTop: 4,
    },
    ctaText: {
      fontFamily: Fonts.bold,
      fontSize: 13,
      color: colors.neutral.white,
      letterSpacing: 0.3,
    },
    ctaScore: {
      backgroundColor: `${colors.neutral.white}40`,
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderRadius: 10,
    },
    ctaScoreText: {
      fontFamily: Fonts.bold,
      fontSize: 11,
      color: colors.neutral.white,
    },
  });
