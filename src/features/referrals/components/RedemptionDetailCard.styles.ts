import { StyleSheet } from 'react-native';

export const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      gap: 16,
      padding: 16,
      borderRadius: 12,
      backgroundColor: colors.background.card,
      borderWidth: 1,
      borderColor: colors.border,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: 12,
    },
    idLabel: {
      fontSize: 14,
      fontWeight: '700',
      color: colors.text.primary,
    },
    date: {
      fontSize: 12,
      color: colors.text.secondary,
      marginTop: 2,
    },
    amountGrid: {
      flexDirection: 'row',
      gap: 10,
    },
    amountBlock: {
      flex: 1,
      borderRadius: 10,
      padding: 14,
      gap: 6,
      alignItems: 'center',
      backgroundColor: colors.background.paper,
    },
    amountValue: {
      fontSize: 16,
      fontWeight: '800',
      color: colors.text.primary,
    },
    amountLabel: {
      fontSize: 12,
      color: colors.text.secondary,
      fontWeight: '500',
    },
    section: {
      borderRadius: 10,
      padding: 14,
      gap: 10,
    },
    sectionTitle: {
      fontSize: 13,
      fontWeight: '700',
      color: colors.text.primary,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    rowLabel: {
      fontSize: 13,
      color: colors.text.secondary,
    },
    rowValue: {
      fontSize: 13,
      fontWeight: '700',
      color: colors.text.primary,
    },
    noteBox: {
      borderRadius: 8,
      padding: 12,
      backgroundColor: colors.background.paper,
      gap: 4,
    },
    noteLabel: {
      fontSize: 11,
      fontWeight: '700',
      color: colors.text.secondary,
      textTransform: 'uppercase',
    },
    noteText: {
      fontSize: 13,
      color: colors.text.primary,
      lineHeight: 18,
    },
  });
