import { StyleSheet } from 'react-native';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';

export const useContainerHeaderCardStyles = () => {
  const { colors } = useAppTheme();

  return StyleSheet.create({
    headerCard: {
      marginBottom: 16,
      elevation: 2,
    },
    headerRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    containerIconContainer: {
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: colors.feedback.infoBg,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 16,
    },
    headerInfo: {
      flex: 1,
    },
    containerNumber: {
      fontFamily: Fonts.bold,
      fontSize: 20,
      color: colors.text.secondary,
    },
    shippingLine: {
      fontFamily: Fonts.regular,
      fontSize: 14,
      color: colors.text.secondary,
      marginTop: 2,
    },
    statusChip: {
      height: 32,
    },
  });
};
