import { StyleSheet } from 'react-native';
import { Fonts } from '@src/constants/Fonts';
import { RADIUS, HAIRLINE } from '@src/shared/ui/designLanguage';

export const createGoodsDetailContainerStyles = (colors: any) =>
  StyleSheet.create({
    card: {
      marginHorizontal: 16,
      marginBottom: 12,
      borderRadius: RADIUS.card,
      borderWidth: HAIRLINE,
      borderColor: colors.border,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingTop: 16,
      paddingBottom: 8,
      gap: 8,
    },
    title: {
      fontFamily: Fonts.bold,
      fontSize: 15,
    },
    box: {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
    },
    boxInfo: {
      marginLeft: 12,
      flex: 1,
    },
    boxLabel: {
      fontFamily: Fonts.regular,
      fontSize: 12,
      marginBottom: 4,
    },
    boxNumber: {
      fontFamily: Fonts.bold,
      fontSize: 16,
    },
    trackButton: {
      borderRadius: 8,
    },
  });
