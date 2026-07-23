import { StyleSheet } from 'react-native';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';
import { HAIRLINE } from '@src/shared/ui/designLanguage';

export const useWaypointJourneySectionStyles = () => {
  const { colors } = useAppTheme();

  return {
    ...StyleSheet.create({
      sectionCard: {
        borderWidth: HAIRLINE,
        borderColor: colors.border,
        marginBottom: 16,
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
      waypointsList: {
        marginTop: 12,
      },
    }),
    chevronColor: colors.text.secondary,
  };
};
