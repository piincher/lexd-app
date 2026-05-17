import { StyleSheet } from 'react-native';
import { Fonts } from '@src/constants/Fonts';

export const createStyles = (colors: any, isDark: boolean) =>
  StyleSheet.create({
    container: {
      paddingTop: 36,
      paddingBottom: 40,
      borderBottomLeftRadius: 32,
      borderBottomRightRadius: 32,
      overflow: 'hidden',
    },
    gridOverlay: {
      ...StyleSheet.absoluteFillObject,
      opacity: 0.04,
      backgroundColor: 'transparent',
    },
    content: {
      paddingHorizontal: 20,
    },
    badge: {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'flex-start',
      gap: 8,
      backgroundColor: isDark ? `${colors.background.default}1A` : `${colors.neutral.white}1A`,
      paddingHorizontal: 14,
      paddingVertical: 7,
      borderRadius: 24,
      marginBottom: 18,
      borderWidth: 1,
      borderColor: isDark ? `${colors.background.default}14` : `${colors.neutral.white}14`,
    },
    pulseDot: {
      width: 7,
      height: 7,
      borderRadius: 4,
      backgroundColor: colors.primary.light,
    },
    badgeText: {
      fontFamily: Fonts.meduim,
      fontSize: 13,
      color: colors.text.inverse,
      opacity: 0.92,
    },
    title: {
      fontFamily: Fonts.bold,
      fontSize: 32,
      color: colors.text.inverse,
      lineHeight: 40,
      letterSpacing: -0.8,
    },
    titleAccent: {
      fontFamily: Fonts.bold,
      fontSize: 32,
      color: colors.primary.light,
      lineHeight: 40,
      letterSpacing: -0.8,
      marginBottom: 14,
    },
    subtitle: {
      fontFamily: Fonts.regular,
      fontSize: 15,
      color: colors.text.inverse,
      opacity: 0.72,
      lineHeight: 22,
      marginBottom: 28,
      maxWidth: 320,
    },
    ctaWrapper: {
      alignSelf: 'flex-start',
    },
    ctaGlow: {
      borderRadius: 16,
      shadowColor: colors.primary.main,
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.35,
      shadowRadius: 16,
      elevation: 10,
    },
    ctaGradient: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      paddingVertical: 15,
      paddingHorizontal: 24,
      borderRadius: 16,
    },
    ctaText: {
      fontFamily: Fonts.bold,
      fontSize: 15,
      color: colors.text.inverse,
      letterSpacing: 0.3,
    },
  });
