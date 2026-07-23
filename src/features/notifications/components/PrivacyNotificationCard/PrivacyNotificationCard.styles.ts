import { StyleSheet } from 'react-native';
import { Fonts } from '@src/constants/Fonts';
import { HAIRLINE, RADIUS } from '@src/shared/ui/designLanguage';

export const createStyles = (colors: any) =>
  StyleSheet.create({
    wrapper: {
      marginHorizontal: 16,
      marginVertical: 6,
    },
    surface: {
      flexDirection: 'row',
      padding: 12,
      borderRadius: RADIUS.card,
      backgroundColor: colors.background.card,
      // Waybill: border-first, no drop shadow.
      borderWidth: HAIRLINE,
      borderColor: colors.border,
    },
    iconContainer: {
      width: 48,
      height: 48,
      borderRadius: 24,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
    },
    content: {
      flex: 1,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 6,
    },
    typeBadge: {
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: RADIUS.badge,
    },
    typeText: {
      fontFamily: Fonts.medium,
      fontSize: 11,
      letterSpacing: 0.6,
      textTransform: 'uppercase',
    },
    timeAgo: {
      fontFamily: Fonts.regular,
      fontSize: 12,
      color: colors.text.secondary,
    },
    messageContainer: {
      marginBottom: 8,
    },
    message: {
      fontFamily: Fonts.regular,
      fontSize: 14,
      lineHeight: 20,
      color: colors.text.primary,
    },
    messageText: {
      fontFamily: Fonts.regular,
      fontSize: 14,
      color: colors.text.primary,
    },
    highlight: {
      fontFamily: Fonts.semiBold,
      fontSize: 14,
      color: colors.text.primary,
    },
    location: {
      fontFamily: Fonts.semiBold,
      fontSize: 14,
      color: colors.status.success,
    },
    containerLabel: {
      fontFamily: Fonts.semiBold,
      fontSize: 14,
      color: colors.primary.main,
    },
    destination: {
      fontFamily: Fonts.medium,
      fontSize: 13,
      color: colors.text.secondary,
    },
    privacyContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    privacyText: {
      fontFamily: Fonts.regular,
      fontSize: 12,
      color: colors.text.secondary,
    },
  });
