import { StyleSheet } from 'react-native';

export const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 16,
      paddingBottom: 16,
      gap: 10,
    },
    searchBox: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      borderWidth: 1,
      borderRadius: 10,
      paddingHorizontal: 12,
      minHeight: 44,
      borderColor: colors.border,
      backgroundColor: colors.background.card,
    },
    searchInput: {
      flex: 1,
      color: colors.text.primary,
      fontSize: 14,
      paddingVertical: 8,
    },
    filters: {
      flexDirection: 'row',
      gap: 8,
      marginTop: 4,
    },
    filter: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 6,
      backgroundColor: colors.background.paper,
      borderWidth: 1,
      borderColor: colors.border,
    },
    filterActive: {
      backgroundColor: colors.primary.main + '18',
      borderColor: colors.primary.main,
    },
    filterText: {
      fontSize: 12,
      fontWeight: '600',
      color: colors.text.secondary,
    },
    filterTextActive: {
      color: colors.primary.main,
    },
    state: {
      minHeight: 200,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
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
    card: {
      borderRadius: 12,
      padding: 14,
      gap: 10,
      backgroundColor: colors.background.card,
      borderWidth: 1,
      borderColor: colors.border,
    },
    cardHeader: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: 12,
    },
    clientBlock: {
      flex: 1,
    },
    clientName: {
      fontSize: 15,
      fontWeight: '700',
      color: colors.text.primary,
    },
    phone: {
      fontSize: 13,
      color: colors.text.secondary,
      marginTop: 2,
    },
    cardFooter: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    amount: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.text.primary,
    },
  });
