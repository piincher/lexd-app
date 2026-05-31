/* Hallmark · genre: modern-minimal · macrostructure: Workbench · design-system: app theme · designed-as-app */
import { StyleSheet } from 'react-native';
import type { lightTheme } from '@src/constants/Theme';

type AppColors = typeof lightTheme.colors;

export const createStyles = (colors: AppColors, isDark: boolean) =>
  StyleSheet.create({
    backdrop: {
      flex: 1,
      backgroundColor: colors.background.overlay,
      justifyContent: 'flex-end',
    },
    sheet: {
      maxHeight: '85%',
      backgroundColor: colors.background.default,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      paddingTop: 8,
      overflow: 'hidden',
    },
    grabber: {
      alignSelf: 'center',
      width: 36,
      height: 4,
      borderRadius: 999,
      backgroundColor: colors.border,
      marginBottom: 8,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingBottom: 12,
    },
    title: {
      fontSize: 18,
      fontWeight: '700',
      letterSpacing: -0.2,
      color: colors.text.primary,
    },
    subtitle: {
      marginTop: 2,
      fontSize: 13,
      color: colors.text.secondary,
    },
    closeButton: {
      margin: 0,
    },
    searchField: {
      marginHorizontal: 16,
      marginBottom: 8,
      backgroundColor: colors.background.card,
    },
    listContent: {
      paddingHorizontal: 12,
      paddingBottom: 28,
    },
    // "All containers" / clear-selection row
    clearRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      paddingVertical: 14,
      paddingHorizontal: 12,
      borderRadius: 12,
      marginBottom: 4,
    },
    clearRowActive: {
      backgroundColor: isDark ? colors.primary[100] : colors.primary[50],
    },
    clearLabel: {
      fontSize: 15,
      fontWeight: '600',
      color: colors.text.primary,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      paddingVertical: 12,
      paddingHorizontal: 12,
      borderRadius: 12,
    },
    rowSelected: {
      backgroundColor: isDark ? colors.primary[100] : colors.primary[50],
    },
    modeBadge: {
      width: 40,
      height: 40,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.background.paper,
    },
    rowBody: {
      flex: 1,
      minWidth: 0,
    },
    rowTitleLine: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    rowTitle: {
      flexShrink: 1,
      fontSize: 15,
      fontWeight: '700',
      letterSpacing: -0.1,
      color: colors.text.primary,
    },
    rowActual: {
      marginTop: 2,
      fontSize: 12.5,
      color: colors.text.secondary,
    },
    rowMetaLine: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      marginTop: 6,
    },
    statusPill: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      paddingVertical: 2,
      paddingHorizontal: 8,
      borderRadius: 999,
    },
    statusPillText: {
      fontSize: 11,
      fontWeight: '600',
    },
    goodsMeta: {
      fontSize: 12,
      color: colors.text.secondary,
    },
    separator: {
      height: StyleSheet.hairlineWidth,
      backgroundColor: colors.divider,
      marginHorizontal: 12,
    },
    stateWrap: {
      paddingVertical: 48,
      paddingHorizontal: 24,
      alignItems: 'center',
      gap: 12,
    },
    stateText: {
      fontSize: 14,
      color: colors.text.secondary,
      textAlign: 'center',
    },
  });

export default createStyles;
