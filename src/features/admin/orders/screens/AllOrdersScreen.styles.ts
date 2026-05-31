/* Hallmark · pre-emit critique: P5 H4 E4 S5 R4 V4 · genre: modern-minimal · macrostructure: Workbench · design-system: app theme · designed-as-app */
import { StyleSheet } from 'react-native';
import type { lightTheme } from '@src/constants/Theme';

type AppColors = typeof lightTheme.colors;

export const createStyles = (colors: AppColors, isDark: boolean) =>
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
      borderRadius: 8,
      elevation: 0,
      shadowColor: colors.neutral[900],
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.03,
      shadowRadius: 3,
      height: 46,
      borderWidth: 1,
      borderColor: colors.border,
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
    advancedShell: {
      marginHorizontal: 12,
      marginTop: 8,
      marginBottom: 4,
      backgroundColor: colors.background.card,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.border,
      overflow: 'hidden',
    },
    advancedHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 10,
      paddingVertical: 8,
    },
    advancedBody: {
      gap: 10,
      paddingHorizontal: 10,
      paddingBottom: 10,
    },
    advancedInput: {
      backgroundColor: colors.background.card,
    },
    chipRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
    },
    rangeRow: {
      flexDirection: 'row',
      gap: 8,
    },
    rangeInput: {
      flex: 1,
    },
    sortRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      flexWrap: 'wrap',
    },
    advancedHint: {
      color: colors.text.secondary,
      fontSize: 12,
    },
    containerTrigger: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      marginHorizontal: 10,
      marginBottom: 10,
      paddingVertical: 10,
      paddingHorizontal: 12,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.background.default,
    },
    containerTriggerActive: {
      borderColor: colors.primary.main,
      backgroundColor: isDark ? colors.primary[100] : colors.primary[50],
    },
    containerTriggerIcon: {
      width: 36,
      height: 36,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.background.paper,
    },
    containerTriggerIconActive: {
      backgroundColor: isDark ? colors.primary[200] : colors.primary[100],
    },
    containerTriggerBody: {
      flex: 1,
      minWidth: 0,
    },
    containerTriggerLabel: {
      fontSize: 11,
      fontWeight: '600',
      letterSpacing: 0.4,
      textTransform: 'uppercase',
      color: colors.text.secondary,
    },
    containerTriggerValue: {
      marginTop: 2,
      fontSize: 14.5,
      fontWeight: '600',
      color: colors.text.primary,
    },
    containerTriggerValueActive: {
      color: colors.primary.main,
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
