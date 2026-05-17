import { StyleSheet } from 'react-native';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { useMemo } from 'react';

export const useSearchFilterPanelStyles = () => {
  const { colors } = useAppTheme();
  return useMemo(() => StyleSheet.create({
    container: {
      backgroundColor: colors.background.card,
      padding: 20,
      borderRadius: 16,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
    },
    title: {
      fontSize: 20,
      fontWeight: '700',
      color: colors.text.primary,
    },
    section: {
      marginBottom: 20,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text.primary,
      marginBottom: 12,
    },
    categories: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
    },
    categoryButton: {
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 20,
      backgroundColor: colors.background.paper,
    },
    activeCategory: {
      backgroundColor: colors.primary.main,
    },
    categoryText: {
      fontSize: 14,
      color: colors.text.secondary,
    },
    activeCategoryText: {
      color: colors.text.inverse,
      fontWeight: '600',
    },
    priceInputs: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    priceInput: {
      flex: 1,
    },
    priceSeparator: {
      fontSize: 16,
      color: colors.text.secondary,
    },
    actions: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 12,
    },
  }), [colors]);
};
