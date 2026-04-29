import { StyleSheet } from 'react-native';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';

export const useProgressSummaryCardStyles = () => {
  const { colors } = useAppTheme();

  return StyleSheet.create({
    sectionCard: {
      marginBottom: 16,
      elevation: 1,
    },
    progressRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    progressItem: {
      alignItems: 'center',
      flex: 1,
    },
    progressValue: {
      fontFamily: Fonts.bold,
      fontSize: 24,
      color: colors.text.secondary,
    },
    progressLabel: {
      fontFamily: Fonts.regular,
      fontSize: 11,
      color: colors.text.secondary,
      marginTop: 2,
    },
    progressDivider: {
      width: 1,
      height: 40,
      backgroundColor: colors.border,
    },
  });
};
