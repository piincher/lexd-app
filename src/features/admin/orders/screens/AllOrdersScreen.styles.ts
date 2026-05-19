import { StyleSheet } from 'react-native';

export const createStyles = (colors: any, isDark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background.default,
    },
    searchBar: {
      marginHorizontal: 12,
      marginTop: 12,
      marginBottom: 8,
      backgroundColor: colors.background.card,
      borderRadius: 10,
      elevation: 1,
      shadowColor: colors.neutral[900],
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      height: 46,
    },
    searchInput: {
      fontSize: 14,
      minHeight: 0,
    },
    tabsContainer: {
      maxHeight: 44,
    },
    tabsContent: {
      paddingHorizontal: 12,
      gap: 8,
    },
    tabButton: {
      borderRadius: 8,
      borderColor: colors.border,
    },
    listContainer: {
      flex: 1,
      marginTop: 4,
    },
    loadMoreIndicator: {
      padding: 16,
    },
    filterButton: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      paddingHorizontal: 12,
      paddingVertical: 6,
      backgroundColor: colors.background.card,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.border,
    },
    filterText: {
      fontSize: 14,
      fontWeight: '500',
      color: colors.primary.main,
    },
    headerActionsRow: {
      flexDirection: 'row',
    },
    errorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    errorText: {
      color: colors.status.error,
      textAlign: 'center',
    },
    listContentContainer: {
      paddingBottom: 80,
    },
  });

export default createStyles;
