import { StyleSheet } from 'react-native';
import { useAppTheme } from '@src/providers/ThemeProvider';

export const useLoadingPlanPlaceholderStyles = () => {
  const { colors } = useAppTheme();

  return StyleSheet.create({
    card: {
      marginVertical: 8,
      borderRadius: 12,
    },
    iconContainer: {
      alignItems: 'center',
      marginVertical: 24,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 16,
      color: colors.text.primary,
    },
    divider: {
      marginVertical: 16,
    },
    description: {
      fontSize: 14,
      lineHeight: 22,
      color: colors.text.secondary,
      textAlign: 'center',
    },
  });
};
