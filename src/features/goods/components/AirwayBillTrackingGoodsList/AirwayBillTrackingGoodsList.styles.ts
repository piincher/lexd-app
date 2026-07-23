import { StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';
import type { AppTheme } from '@src/constants/Theme';

type ThemeColors = AppTheme['colors'];

export const createStyles = (colors: ThemeColors, isDark?: boolean) =>
  StyleSheet.create({
    sectionTitle: {
      fontSize: 16,
      fontWeight: '700',
      color: colors.neutral[800],
    },
    titleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: Theme.spacing.md,
      marginTop: Theme.spacing.sm,
    },
    card: { borderRadius: Theme.radius.xl, marginBottom: Theme.spacing.md },
    goodsItem: {
      flexDirection: 'row',
      paddingVertical: Theme.spacing.sm,
      gap: 12,
      borderBottomWidth: 1,
      borderBottomColor: colors.neutral[100],
    },
    goodsBody: {
      flex: 1,
      gap: 4,
    },
    goodsHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 8,
    },
    goodsText: {
      fontSize: 14,
      fontWeight: '700',
      color: colors.neutral[800],
      flex: 1,
    },
    badges: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    description: {
      fontSize: 13,
      color: colors.neutral[600],
    },
    clientText: {
      fontSize: 12,
      fontWeight: '600',
      color: colors.neutral[700],
    },
    metaRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 10,
    },
    metaText: {
      fontSize: 12,
      color: colors.neutral[500],
    },
    financialRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      flexWrap: 'wrap',
    },
    financialLabel: {
      fontSize: 12,
      color: colors.neutral[500],
    },
    financialValue: {
      fontSize: 12,
      fontWeight: '700',
      color: colors.neutral[800],
    },
    dangerText: {
      color: colors.status?.error || '#ef4444',
    },
    paidText: {
      fontSize: 12,
      color: colors.status?.success || '#007757',
      fontWeight: '600',
    },
    receivedText: {
      fontSize: 11,
      color: colors.neutral[400],
    },
    emptyText: { textAlign: 'center', color: colors.neutral[400], paddingVertical: 20 },
  });
