import { StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';
import { Fonts } from '@src/constants/Fonts';

export const createShippingModeCardStyles = (colors: {
  background: { card: string };
  text: { primary: string; disabled: string };
  border: string;
}) =>
  StyleSheet.create({
    container: {
      marginHorizontal: 20,
      backgroundColor: colors.background.card,
      borderRadius: 16,
      padding: 18,
      ...Theme.shadows.sm,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 14,
    },
    title: {
      fontSize: 15,
      fontFamily: Fonts.bold,
      fontWeight: '700',
      color: colors.text.primary,
    },
    totalText: {
      fontSize: 12,
      fontFamily: Fonts.medium,
      color: colors.text.disabled,
    },
    modesRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    divider: {
      width: 1,
      height: 60,
      backgroundColor: colors.border,
      marginHorizontal: 8,
    },
  });
