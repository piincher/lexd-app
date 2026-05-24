import { StyleSheet } from 'react-native';
import { Fonts } from '@src/constants/Fonts';
import type { AppTheme } from '@src/constants/Theme';

export const createStyles = (colors: AppTheme['colors'], isDark: boolean) =>
  StyleSheet.create({
    container: {
      marginHorizontal: 12,
      marginTop: 10,
      paddingTop: 24,
      paddingBottom: 22,
      borderRadius: 24,
      borderWidth: 1,
      borderColor: isDark ? `${colors.primary.light}1F` : colors.primary[100],
    },
    content: {
      paddingHorizontal: 18,
    },
    badge: {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'flex-start',
      gap: 8,
      backgroundColor: isDark ? `${colors.primary.light}14` : colors.background.card,
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 999,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: isDark ? `${colors.primary.light}24` : colors.primary[100],
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
      color: colors.primary.dark,
    },
    title: {
      fontFamily: Fonts.bold,
      fontSize: 31,
      color: colors.text.primary,
      lineHeight: 38,
      letterSpacing: -0.3,
    },
    titleAccent: {
      fontFamily: Fonts.bold,
      fontSize: 31,
      color: colors.primary.dark,
      lineHeight: 38,
      letterSpacing: -0.3,
      marginBottom: 12,
    },
    subtitle: {
      fontFamily: Fonts.regular,
      fontSize: 15,
      color: colors.text.secondary,
      lineHeight: 22,
      marginBottom: 18,
      maxWidth: 320,
    },
    routeCard: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.background.card,
      borderRadius: 18,
      borderWidth: 1,
      borderColor: colors.border,
      padding: 14,
      marginBottom: 18,
    },
    routeEndpoint: {
      flex: 1,
    },
    routeEndpointRight: {
      alignItems: 'flex-end',
    },
    routeLabel: {
      fontFamily: Fonts.meduim,
      fontSize: 11,
      color: colors.text.muted,
      marginBottom: 2,
    },
    routeCity: {
      fontFamily: Fonts.bold,
      fontSize: 15,
    },
    routeLine: {
      flex: 1.1,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 7,
      paddingHorizontal: 8,
    },
    routeRule: {
      flex: 1,
      height: 1,
    },
    ctaWrapper: {
      alignSelf: 'stretch',
      minHeight: 52,
    },
    ctaGlow: {
      borderRadius: 18,
      shadowColor: colors.primary.main,
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: isDark ? 0.22 : 0.18,
      shadowRadius: 14,
      elevation: 4,
    },
    ctaGradient: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
      paddingVertical: 15,
      paddingHorizontal: 24,
      borderRadius: 18,
      minHeight: 52,
    },
    ctaText: {
      fontFamily: Fonts.bold,
      fontSize: 15,
      color: isDark ? colors.neutral[900] : colors.neutral.white,
      letterSpacing: 0.3,
    },
  });
