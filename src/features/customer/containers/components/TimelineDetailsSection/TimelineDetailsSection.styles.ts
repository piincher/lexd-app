import { StyleSheet } from 'react-native';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';

export const useTimelineDetailsSectionStyles = () => {
  const { colors } = useAppTheme();

  return {
    ...StyleSheet.create({
      sectionCard: {
        marginBottom: 16,
        elevation: 1,
      },
      sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      sectionTitle: {
        fontFamily: Fonts.bold,
        fontSize: 16,
        color: colors.text.secondary,
      },
      detailsList: {
        marginTop: 12,
      },
      timelineDetailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
      },
      timelineDetailLabel: {
        fontFamily: Fonts.regular,
        fontSize: 14,
        color: colors.text.secondary,
      },
      timelineDetailValue: {
        fontFamily: Fonts.meduim,
        fontSize: 14,
        color: colors.text.secondary,
      },
    }),
    chevronColor: colors.text.secondary,
  };
};
