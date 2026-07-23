import { StyleSheet } from 'react-native';
import { Fonts } from '@src/constants/Fonts';
import { HAIRLINE, RADIUS } from '@src/shared/ui/designLanguage';
import type { ThemeContextType } from '@src/providers/ThemeProvider';

export const createNotificationItemStyles = (colors: ThemeContextType['colors']) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.background.card,
      marginHorizontal: 16,
      marginVertical: 4,
      borderRadius: RADIUS.card,
      overflow: 'hidden',
      // Waybill: border-first separation.
      borderWidth: HAIRLINE,
      borderColor: colors.border,
    },
    unreadContainer: {
      backgroundColor: colors.background.paper,
    },
    pressed: {
      opacity: 0.7,
    },
    surface: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 12,
      borderRadius: RADIUS.card,
    },
    iconContainer: {
      width: 48,
      height: 48,
      borderRadius: RADIUS.control,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
    },
    content: {
      flex: 1,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 4,
    },
    title: {
      fontFamily: Fonts.medium,
      fontSize: 15,
      color: colors.text.primary,
      flex: 1,
    },
    unreadTitle: {
      fontFamily: Fonts.bold,
    },
    unreadDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      marginLeft: 8,
    },
    message: {
      fontFamily: Fonts.regular,
      fontSize: 13,
      color: colors.text.secondary,
      lineHeight: 18,
      marginBottom: 8,
    },
    footer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    typeBadge: {
      backgroundColor: colors.neutral[200],
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
    time: {
      fontFamily: Fonts.regular,
      fontSize: 12,
      color: colors.text.secondary,
    },
    chevron: {
      marginLeft: 4,
    },
    swipeAction: {
      width: 80,
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 4,
    },
    leftAction: {
      backgroundColor: colors.status.success,
      borderTopLeftRadius: RADIUS.card,
      borderBottomLeftRadius: RADIUS.card,
      marginLeft: 16,
    },
    rightAction: {
      backgroundColor: colors.status.error,
      borderTopRightRadius: RADIUS.card,
      borderBottomRightRadius: RADIUS.card,
      marginRight: 16,
    },
    swipeActionText: {
      fontFamily: Fonts.medium,
      fontSize: 12,
      color: colors.text.inverse,
      marginTop: 4,
    },
  });

export type NotificationItemStyles = ReturnType<typeof createNotificationItemStyles>;
