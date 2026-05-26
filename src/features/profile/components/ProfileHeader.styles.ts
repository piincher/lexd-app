import { StyleSheet, Platform } from 'react-native';
import { Fonts } from '@src/constants/Fonts';
import type { ThemeContextType } from '@src/constants/Theme';

type AppColors = ThemeContextType['colors'];

export const createProfileHeaderStyles = (colors: AppColors) =>
  StyleSheet.create({
    headerPanel: {
      marginHorizontal: 16,
      marginTop: 12,
      padding: 18,
      borderRadius: 18,
      backgroundColor: colors.background.card,
      borderWidth: 1,
      borderColor: colors.border,
      ...Platform.select({
        ios: {
          shadowColor: colors.neutral[900],
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.08,
          shadowRadius: 20,
        },
        android: { elevation: 2 },
      }),
    },
    headerTop: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    identityRow: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
      minWidth: 0,
    },
    avatarContainer: {
      position: 'relative',
    },
    avatar: {
      width: 68,
      height: 68,
      borderRadius: 22,
      borderWidth: 3,
      borderColor: colors.border,
    },
    avatarFallback: {
      backgroundColor: colors.primary.main,
      justifyContent: 'center',
      alignItems: 'center',
    },
    avatarInitials: {
      color: colors.text.inverse,
      fontFamily: Fonts.bold,
      fontSize: 22,
    },
    onlineDot: {
      position: 'absolute',
      bottom: 2,
      right: 2,
      width: 16,
      height: 16,
      borderRadius: 8,
      backgroundColor: colors.status.success,
      borderWidth: 2.5,
      borderColor: colors.background.card,
    },
    userInfo: {
      marginLeft: 16,
      flex: 1,
      minWidth: 0,
    },
    eyebrow: {
      fontSize: 11,
      fontFamily: Fonts.bold,
      color: colors.primary.main,
      textTransform: 'uppercase',
      letterSpacing: 0,
    },
    username: {
      marginTop: 3,
      fontSize: 20,
      fontFamily: Fonts.bold,
      color: colors.text.primary,
      letterSpacing: 0,
    },
    phoneRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
      marginTop: 4,
    },
    phoneNumber: {
      flex: 1,
      fontSize: 13,
      fontFamily: Fonts.medium,
      color: colors.text.secondary,
    },
    metaRow: {
      flexDirection: 'row',
      marginTop: 14,
    },
    statusPill: {
      minHeight: 34,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
      paddingHorizontal: 10,
      borderRadius: 999,
      backgroundColor: colors.feedback.successBg,
    },
    statusText: {
      fontSize: 11,
      fontFamily: Fonts.bold,
      color: colors.status.success,
    },
    balanceStrip: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: colors.primary[50],
      borderRadius: 14,
      paddingHorizontal: 16,
      paddingVertical: 14,
      marginTop: 18,
      borderWidth: 1,
      borderColor: colors.primary[100],
    },
    balanceLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      flexShrink: 0,
      marginRight: 10,
    },
    balanceLabel: {
      fontSize: 13,
      fontFamily: Fonts.medium,
      color: colors.primary[700],
    },
    balanceValue: {
      flexShrink: 1,
      textAlign: 'right',
      fontSize: 18,
      fontFamily: Fonts.bold,
      color: colors.primary[800],
      letterSpacing: 0,
    },
  });
