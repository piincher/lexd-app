import { StyleSheet } from 'react-native';
import { Fonts } from '@src/constants/Fonts';
import type { AppTheme } from '@src/constants/Theme';

export const createServiceShowcaseStyles = (colors: AppTheme['colors']) =>
  StyleSheet.create({
    container: {
      marginTop: 28,
      paddingHorizontal: 12,
    },
    cardsColumn: {
      gap: 10,
    },
    cardWrapper: {
      width: '100%',
    },
    pressable: {
      borderRadius: 18,
      overflow: 'hidden',
    },
    cardPressed: {
      opacity: 0.92,
      transform: [{ scale: 0.97 }],
    },
    card: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 14,
      borderRadius: 18,
      padding: 16,
      minHeight: 112,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.background.card,
    },
    cardIconCircle: {
      width: 48,
      height: 48,
      borderRadius: 15,
      justifyContent: 'center',
      alignItems: 'center',
    },
    cardContent: {
      flex: 1,
      gap: 2,
    },
    cardTitle: {
      fontFamily: Fonts.bold,
      fontSize: 16,
      color: colors.text.primary,
    },
    cardDelivery: {
      fontFamily: Fonts.meduim,
      fontSize: 13,
      color: colors.primary.dark,
      marginTop: 2,
    },
    cardDescription: {
      fontFamily: Fonts.regular,
      fontSize: 12,
      color: colors.text.secondary,
      marginTop: 4,
      lineHeight: 17,
    },
    cardArrow: {
      width: 36,
      height: 36,
      borderRadius: 12,
      backgroundColor: colors.background.paper,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
