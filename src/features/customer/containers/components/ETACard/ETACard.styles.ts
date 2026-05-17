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
      color: colors.status.success,
    },
    metaGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
      marginTop: 14,
    },
    metaPill: {
      minHeight: 54,
      minWidth: 104,
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 8,
      backgroundColor: colors.background.default,
      justifyContent: 'center',
    },
    metaPillWide: {
      minHeight: 54,
      flexGrow: 1,
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 8,
      backgroundColor: colors.background.default,
      justifyContent: 'center',
    },
    metaLabel: {
      fontFamily: Fonts.regular,
      fontSize: 11,
      color: colors.text.secondary,
      marginBottom: 2,
      textTransform: 'uppercase',
    },
    metaValue: {
      fontFamily: Fonts.bold,
      fontSize: 13,
      color: colors.text.primary,
      textTransform: 'capitalize',
    },
    delayBanner: {
      minHeight: 44,
      marginTop: 12,
      paddingHorizontal: 12,
      borderRadius: 8,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      backgroundColor: colors.status.warning + '15',
    },
    delayText: {
      flex: 1,
      fontFamily: Fonts.bold,
      fontSize: 13,
      color: colors.status.warning,
    },
  });
};
