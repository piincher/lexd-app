import { StyleSheet } from 'react-native';
import { Fonts } from '@src/constants/Fonts';
import { RADIUS } from '@src/shared/ui/designLanguage';

export const createTopCustomersHeaderStyles = (colors: any) =>
  StyleSheet.create({
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
    },
    title: {
      fontSize: 16,
      fontFamily: Fonts.bold,
      fontWeight: '700',
      color: colors.text.primary,
      letterSpacing: -0.2,
    },
    subtitle: {
      fontSize: 12,
      fontFamily: Fonts.regular,
      color: colors.text.disabled,
      marginTop: 2,
    },
    iconContainer: {
      width: 36,
      height: 36,
      borderRadius: RADIUS.control,
      backgroundColor: colors.feedback.warningBg,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
