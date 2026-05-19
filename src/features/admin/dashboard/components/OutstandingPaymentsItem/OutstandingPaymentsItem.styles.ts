import { StyleSheet } from 'react-native';

export const createStyles = (colors: any, isDark?: boolean) =>
  StyleSheet.create({
    card: {
      backgroundColor: colors.background.card,
      borderRadius: 16,
      padding: 16,
      marginBottom: 12,
      shadowColor: colors.neutral[900],
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 8,
      elevation: 2,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
    iconContainer: {
      width: 44,
      height: 44,
      borderRadius: 12,
      backgroundColor: colors.feedback.errorBg,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 12,
    },
    info: {
      flex: 1,
    },
    goodsId: {
      fontSize: 15,
      fontWeight: '700',
      color: colors.text.primary,
    },
    description: {
      fontSize: 13,
      color: colors.text.secondary,
      marginTop: 2,
    },
    client: {
      fontSize: 13,
      fontWeight: '600',
      color: colors.text.secondary,
      marginTop: 4,
    },
    phone: {
      fontSize: 12,
      color: colors.text.secondary,
      marginTop: 1,
    },
    right: {
      alignItems: 'center',
      marginLeft: 8,
    },
    statusBadge: {
      borderRadius: 8,
      paddingHorizontal: 8,
      paddingVertical: 3,
    },
    statusText: {
      fontSize: 11,
      fontWeight: '700',
    },
    chevron: {
      marginTop: 8,
    },
    footer: {
      flexDirection: 'row',
      marginTop: 12,
      paddingTop: 12,
      borderTopWidth: 1,
      borderTopColor: colors.border,
      gap: 8,
    },
    metric: {
      flex: 1,
      backgroundColor: colors.background.default,
      borderRadius: 10,
      padding: 10,
      alignItems: 'center',
    },
    metricHighlight: {
      backgroundColor: colors.feedback.errorBg,
    },
    metricLabel: {
      fontSize: 11,
      fontWeight: '600',
      color: colors.text.disabled,
      marginBottom: 2,
    },
    metricValue: {
      fontSize: 13,
      fontWeight: '700',
      color: colors.text.primary,
    },
    metricValuePaid: {
      fontSize: 13,
      fontWeight: '700',
      color: colors.status.success,
    },
    metricValueDue: {
      fontSize: 13,
      fontWeight: '700',
      color: colors.status.error,
    },
  });
