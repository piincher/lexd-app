import { StyleSheet } from 'react-native';
import { Fonts } from '@src/constants/Fonts';
import { RADIUS, RAIL_WIDTH, HAIRLINE } from '@src/shared/ui/designLanguage';
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
      borderRadius: RADIUS.card,
      overflow: 'hidden',
    },
    cardPressed: {
      opacity: 0.92,
      transform: [{ scale: 0.99 }],
    },
    card: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 14,
      // Waybill geometry: 10px corners, hairline edge, no shadow.
      borderRadius: RADIUS.card,
      padding: 16,
      paddingLeft: 16 + RAIL_WIDTH,
      minHeight: 112,
      overflow: 'hidden',
      borderWidth: HAIRLINE,
      borderColor: colors.border,
      backgroundColor: colors.background.card,
    },
    cardRail: {
      position: 'absolute',
      left: 0,
      top: 0,
      bottom: 0,
      width: RAIL_WIDTH,
    },
    cardIconTile: {
      width: 48,
      height: 48,
      borderRadius: RADIUS.control,
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
      // Transit time reads as manifest metadata, not body copy.
      fontFamily: Fonts.bold,
      fontSize: 10.5,
      letterSpacing: 0.7,
      textTransform: 'uppercase',
      color: colors.primary.main,
      marginTop: 3,
    },
    cardDescription: {
      fontFamily: Fonts.regular,
      fontSize: 12,
      color: colors.text.secondary,
      marginTop: 4,
      lineHeight: 17,
    },
    cardArrow: {
      width: 34,
      height: 34,
      borderRadius: RADIUS.control,
      backgroundColor: colors.background.paper,
      borderWidth: HAIRLINE,
      borderColor: colors.border,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
