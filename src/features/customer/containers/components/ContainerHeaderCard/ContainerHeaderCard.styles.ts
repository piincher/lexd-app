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
    situationBox: {
      marginTop: 16,
      padding: 14,
      borderRadius: 14,
      backgroundColor: colors.background.paper,
      borderWidth: 1,
      borderColor: colors.border,
    },
    situationEyebrow: {
      fontFamily: Fonts.bold,
      fontSize: 12,
      color: colors.primary.main,
      marginBottom: 4,
    },
    situationText: {
      fontFamily: Fonts.medium,
      fontSize: 14,
      lineHeight: 20,
      color: colors.text.primary,
    },
    routeSummary: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      marginTop: 10,
    },
    routeText: {
      flex: 1,
      fontFamily: Fonts.regular,
      fontSize: 12,
      color: colors.text.secondary,
    },
    goodsText: {
      marginTop: 8,
      fontFamily: Fonts.medium,
      fontSize: 12,
      color: colors.text.secondary,
    },
  });
};
