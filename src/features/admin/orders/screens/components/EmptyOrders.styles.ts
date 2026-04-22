import { StyleSheet } from 'react-native';
import { Fonts } from '@src/constants/Fonts';

export const createStyles = (colors: any, isDark: boolean) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: 32,
      marginTop: 40,
    },
    iconContainer: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: colors.background.paper,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
    },
    title: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text.primary,
      fontFamily: Fonts.semiBold,
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 14,
      color: colors.text.secondary,
      fontFamily: Fonts.regular,
      textAlign: 'center',
      marginBottom: 24,
      paddingHorizontal: 20,
      lineHeight: 20,
    },
    button: {
      borderRadius: 8,
      paddingHorizontal: 16,
    },
  });

export default createStyles;
