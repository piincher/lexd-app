import { StyleSheet } from 'react-native';
import { Fonts } from '@src/constants/Fonts';

export const createProfileHeaderStyles = (colors: any) =>
  StyleSheet.create({
    headerGradient: {
      paddingHorizontal: 20,
      paddingTop: 24,
      paddingBottom: 20,
      borderBottomLeftRadius: 28,
      borderBottomRightRadius: 28,
      overflow: 'hidden',
    },
    decorCircle1: {
      position: 'absolute',
      top: -30,
      right: -30,
      width: 120,
      height: 120,
      borderRadius: 60,
      backgroundColor: colors.background.overlay,
    },
    decorCircle2: {
      position: 'absolute',
      bottom: -20,
      left: -20,
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: colors.background.overlay,
    },
    headerContent: {
      flexDirection: 'row',
      alignItems: 'center',
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
      backgroundColor: colors.background.overlay,
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
      width: 14,
      height: 14,
      borderRadius: 7,
      backgroundColor: colors.status.success,
      borderWidth: 2.5,
      borderColor: colors.primary.dark,
    },
    userInfo: {
      marginLeft: 16,
      flex: 1,
    },
    username: {
      fontSize: 20,
      fontFamily: Fonts.bold,
      color: colors.text.inverse,
      letterSpacing: -0.3,
    },
    phoneRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
      marginTop: 4,
    },
    phoneNumber: {
      fontSize: 13,
      fontFamily: Fonts.medium,
      color: colors.text.inverse,
    },
    balanceStrip: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: colors.background.overlay,
      borderRadius: 14,
      paddingHorizontal: 16,
      paddingVertical: 14,
      marginTop: 18,
    },
    balanceLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    balanceLabel: {
      fontSize: 13,
      fontFamily: Fonts.medium,
      color: colors.text.inverse,
    },
    balanceValue: {
      fontSize: 18,
      fontFamily: Fonts.bold,
      color: colors.text.inverse,
      letterSpacing: -0.3,
    },
  });
