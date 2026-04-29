import { StyleSheet } from 'react-native';
import { useAppTheme } from '@src/providers/ThemeProvider';

export const useMyContainersFilterChipsStyles = () => {
  const { colors } = useAppTheme();

  return StyleSheet.create({
    filtersContainer: {
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: colors.background.card,
      borderBottomWidth: 1,
      borderBottomColor: colors.neutral[200],
    },
    filterRow: {
      flexDirection: 'row',
      gap: 10,
    },
    filterChip: {
      borderRadius: 20,
      height: 36,
      backgroundColor: colors.background.paper,
    },
  });
};
