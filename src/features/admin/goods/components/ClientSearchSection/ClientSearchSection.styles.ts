import { StyleSheet } from 'react-native';
import { useMemo } from 'react';
import { useAppTheme } from '@src/providers/ThemeProvider';

export const useClientSearchStyles = () => {
  const { colors, isDark } = useAppTheme();

  return useMemo(
    () =>
      StyleSheet.create({
        card: {
          marginVertical: 8,
          borderRadius: 12,
          backgroundColor: colors.background.card,
        },
        cardError: {
          borderWidth: 1,
          borderColor: colors.status.error,
        },
        cardContent: {
          padding: 16,
        },
        sectionLabel: {
          fontSize: 14,
          fontWeight: '700',
          marginBottom: 12,
          color: colors.text.primary,
          textTransform: 'uppercase',
          letterSpacing: 0.5,
        },
        searchContainer: {
          position: 'relative',
        },
        searchInput: {
          backgroundColor: colors.background.card,
        },
        selectedClient: {
          flexDirection: 'row',
          alignItems: 'center',
          padding: 16,
          backgroundColor: colors.background.paper,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: colors.border,
        },
        selectedAvatar: {
          backgroundColor: colors.status.success,
        },
        selectedInfo: {
          flex: 1,
          marginLeft: 12,
        },
        selectedName: {
          fontSize: 16,
          fontWeight: '600',
          color: colors.text.primary,
        },
        selectedPhone: {
          fontSize: 14,
          color: colors.text.secondary,
          marginTop: 2,
        },
        changeChip: {
          marginLeft: 8,
          borderColor: colors.status.success,
        },
        changeChipText: {
          color: colors.status.success,
          fontSize: 12,
          fontWeight: '600',
        },
        resultsWrapper: {
          marginTop: 8,
        },
        resultsContainer: {
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: 12,
          backgroundColor: colors.background.card,
          overflow: 'hidden',
          shadowColor: colors.neutral[900],
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 4,
        },
        resultsHeader: {
          paddingHorizontal: 16,
          paddingVertical: 8,
          backgroundColor: colors.background.paper,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        },
        resultsHeaderText: {
          fontSize: 12,
          color: colors.text.secondary,
          fontWeight: '600',
        },
        resultsList: {
          paddingVertical: 4,
        },
        resultItem: {
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 16,
          paddingVertical: 12,
          minHeight: 56,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
          backgroundColor: colors.background.card,
        },
        resultItemLast: {
          borderBottomWidth: 0,
        },
        avatar: {
          backgroundColor: colors.background.paper,
        },
        resultInfo: {
          marginLeft: 12,
          flex: 1,
        },
        resultName: {
          fontSize: 15,
          fontWeight: '600',
          color: colors.text.primary,
        },
        resultPhone: {
          fontSize: 13,
          color: colors.text.secondary,
          marginTop: 2,
        },
        loadingContainer: {
          padding: 20,
          alignItems: 'center',
          backgroundColor: colors.background.paper,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: colors.border,
        },
        loadingText: {
          marginTop: 8,
          fontSize: 14,
          color: colors.text.secondary,
        },
        noResultsContainer: {
          padding: 24,
          alignItems: 'center',
          backgroundColor: colors.background.paper,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: colors.border,
        },
        noResultsIcon: {
          backgroundColor: colors.background.paper,
          marginBottom: 12,
        },
        noResults: {
          fontSize: 15,
          fontWeight: '600',
          color: colors.text.secondary,
          textAlign: 'center',
        },
        noResultsHint: {
          fontSize: 13,
          color: colors.text.disabled,
          textAlign: 'center',
          marginTop: 4,
        },
        errorText: {
          color: colors.status.error,
          fontSize: 12,
          marginTop: 8,
          marginLeft: 4,
        },
        debugText: {
          fontSize: 11,
          color: colors.text.disabled,
          marginTop: 4,
          fontStyle: 'italic',
        },
      }),
    [colors, isDark],
  );
};
