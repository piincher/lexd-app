import { StyleSheet } from 'react-native';
import { Fonts } from '@src/constants/Fonts';
import { Theme } from '@src/constants/Theme';

export const createServiceShowcaseStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      marginTop: 28,
      paddingHorizontal: 16,
    },
    cardsRow: {
      flexDirection: 'row',
      gap: 12,
    },
    cardWrapper: {
      flex: 1,
    },
    pressable: {
      borderRadius: 20,
      overflow: 'hidden',
    },
    cardPressed: {
      opacity: 0.92,
      transform: [{ scale: 0.97 }],
    },
    card: {
      borderRadius: 20,
      padding: 18,
      minHeight: 190,
      justifyContent: 'space-between',
      overflow: 'hidden',
      ...Theme.shadows.md,
    },
    bgIconWrap: {
      position: 'absolute',
      bottom: -10,
      right: -10,
    },
    bgIcon: {
      transform: [{ rotate: '-15deg' }],
    },
    cardIconCircle: {
      width: 48,
      height: 48,
      borderRadius: 14,
      backgroundColor: colors.background.card,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 14,
    },
    cardContent: {
      gap: 2,
    },
    cardTitle: {
      fontFamily: Fonts.bold,
      fontSize: 17,
      color: colors.neutral.white,
    },
    cardDelivery: {
      fontFamily: Fonts.meduim,
      fontSize: 13,
      color: `${colors.neutral.white}D9`,
      marginTop: 2,
    },
    cardDescription: {
      fontFamily: Fonts.regular,
      fontSize: 12,
      color: `${colors.neutral.white}A6`,
      marginTop: 4,
      lineHeight: 17,
    },
    cardArrow: {
      position: 'absolute',
      bottom: 16,
      right: 16,
      width: 30,
      height: 30,
      borderRadius: 15,
      backgroundColor: `${colors.neutral.white}33`,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
