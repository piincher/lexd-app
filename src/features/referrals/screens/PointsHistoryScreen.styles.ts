import { StyleSheet } from 'react-native';

export const createStyles = (colors: any) =>
  StyleSheet.create({
    content: {
      flex: 1,
    },
    tabs: {
      flexDirection: 'row',
      paddingHorizontal: 16,
      paddingTop: 12,
      paddingBottom: 8,
      gap: 8,
    },
    tab: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.background.paper,
    },
    tabActive: {
      backgroundColor: colors.primary.main + '18',
      borderColor: colors.primary.main + '40',
    },
    tabText: {
      fontSize: 12,
      fontWeight: '700',
      color: colors.text.secondary,
    },
    tabTextActive: {
      color: colors.primary.main,
    },
    list: {
      paddingHorizontal: 16,
      paddingBottom: 32,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    iconCircle: {
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    rowContent: {
      flex: 1,
      gap: 2,
    },
    rowTitle: {
      fontSize: 14,
      fontWeight: '700',
      color: colors.text.primary,
    },
    rowMeta: {
      fontSize: 12,
      color: colors.text.secondary,
    },
    rowRight: {
      alignItems: 'flex-end',
      gap: 2,
    },
    deltaPositive: {
      fontSize: 14,
      fontWeight: '800',
      color: colors.status.success,
    },
    deltaNegative: {
      fontSize: 14,
      fontWeight: '800',
      color: colors.status.error,
    },
    balance: {
      fontSize: 11,
      color: colors.text.disabled,
      fontWeight: '600',
    },
    loadMore: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 16,
    },
    loadMoreText: {
      fontSize: 13,
      fontWeight: '700',
      color: colors.primary.main,
    },
    state: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 12,
      padding: 24,
    },
    stateText: {
      fontSize: 15,
      color: colors.text.secondary,
      textAlign: 'center',
    },
    retryText: {
      fontSize: 14,
      fontWeight: '700',
      color: colors.primary.main,
    },
  });
