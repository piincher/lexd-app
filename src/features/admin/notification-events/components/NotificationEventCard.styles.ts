import { StyleSheet } from 'react-native';
import { lightTheme } from '@src/constants/Theme';

type AppColors = typeof lightTheme.colors;

export const createNotificationEventCardStyles = (colors: AppColors) =>
  StyleSheet.create({
    card: {
      minHeight: 126,
      padding: 14,
      marginBottom: 10,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.background.card,
    },
    topRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 10,
    },
    title: {
      flex: 1,
      color: colors.text.primary,
      fontSize: 15,
      fontWeight: '800',
    },
    badge: {
      minHeight: 28,
      paddingHorizontal: 10,
      borderRadius: 14,
      alignItems: 'center',
      justifyContent: 'center',
    },
    badgeText: {
      color: '#fff',
      fontSize: 11,
      fontWeight: '800',
    },
    body: {
      color: colors.text.secondary,
      fontSize: 13,
      marginTop: 8,
      lineHeight: 18,
    },
    channelRow: {
      flexDirection: 'row',
      gap: 8,
      marginTop: 12,
      flexWrap: 'wrap',
    },
    channel: {
      minHeight: 28,
      paddingHorizontal: 9,
      borderRadius: 14,
      backgroundColor: colors.background.default,
      justifyContent: 'center',
    },
    channelText: {
      color: colors.text.secondary,
      fontSize: 11,
      fontWeight: '700',
    },
    meta: {
      color: colors.text.muted,
      fontSize: 12,
      marginTop: 10,
    },
  });
