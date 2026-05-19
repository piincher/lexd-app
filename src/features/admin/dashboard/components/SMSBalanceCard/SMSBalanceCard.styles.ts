import { StyleSheet } from 'react-native';
import { Fonts } from '@src/constants/Fonts';
import { Theme } from '@src/constants/Theme';

export const createStyles = (colors: any, isDark?: boolean) =>
  StyleSheet.create({
    card: {
      marginBottom: 20,
      borderRadius: 20,
      overflow: 'hidden',
      ...Theme.shadows.md,
    },
    gradient: {
      padding: 18,
    },
    decor: {
      position: 'absolute',
      top: -30,
      right: -30,
      width: 120,
      height: 120,
      borderRadius: 60,
      backgroundColor: 'rgba(255,255,255,0.08)',
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
      borderRadius: 12,
      backgroundColor: 'rgba(255,255,255,0.22)',
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.25)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 14,
      fontFamily: Fonts.bold,
      color: colors.text.inverse,
      letterSpacing: -0.2,
    },
    subtitle: {
      fontSize: 11,
      fontFamily: Fonts.regular,
      color: colors.text.inverse,
      marginTop: 1,
    },
    statusBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 999,
      backgroundColor: 'rgba(255,255,255,0.2)',
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.25)',
    },
    statusText: {
      color: colors.text.inverse,
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
      color: colors.text.inverse,
      letterSpacing: -1,
    },
    valueLabel: {
      fontSize: 13,
      fontFamily: Fonts.regular,
      color: colors.text.inverse,
    },
    progressTrack: {
      height: 8,
      borderRadius: 4,
      backgroundColor: 'rgba(255,255,255,0.2)',
      overflow: 'hidden',
      marginBottom: 8,
    },
    progressFill: {
      height: '100%',
      backgroundColor: colors.background.card,
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
      color: colors.text.inverse,
    },
    footerStrong: {
      fontFamily: Fonts.bold,
      color: colors.text.inverse,
    },
  });
