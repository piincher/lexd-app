import { StyleSheet } from 'react-native';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';

export const useETACardStyles = () => {
  const { colors } = useAppTheme();

  return StyleSheet.create({
    sectionCard: {
      marginBottom: 16,
      elevation: 1,
    },
    estimatedArrivalContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    etaTextContainer: {
      marginLeft: 12,
      flex: 1,
    },
    etaLabel: {
      fontFamily: Fonts.regular,
      fontSize: 13,
      color: colors.text.secondary,
    },
    etaValue: {
      fontFamily: Fonts.bold,
      fontSize: 18,
      color: colors.text.primary,
      marginTop: 2,
    },
    progressPercent: {
      fontFamily: Fonts.bold,
      fontSize: 24,
      color: '#16A34A',
    },
  });
};
