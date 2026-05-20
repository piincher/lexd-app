import { StyleSheet } from 'react-native';

export const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      borderRadius: 16,
      padding: 20,
      gap: 16,
      backgroundColor: colors.background.card,
      borderWidth: 1,
      borderColor: colors.border,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    iconCircle: {
      width: 48,
      height: 48,
      borderRadius: 24,
      alignItems: 'center',
      justifyContent: 'center',
    },
    headerText: {
      flex: 1,
      gap: 2,
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: '800',
      color: colors.text.primary,
    },
    headerSubtitle: {
      fontSize: 13,
      color: colors.text.secondary,
    },
    balanceRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
    },
    balanceBlock: {
      flex: 1,
      alignItems: 'center',
      gap: 4,
    },
    divider: {
      width: 1,
      height: 40,
      backgroundColor: colors.border,
    },
    balanceValue: {
      fontSize: 28,
      fontWeight: '900',
      color: colors.text.primary,
    },
    balanceLabel: {
      fontSize: 12,
      color: colors.text.secondary,
      fontWeight: '600',
    },
    pendingBox: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      borderRadius: 8,
      padding: 10,
    },
    pendingText: {
      flex: 1,
      fontSize: 13,
      fontWeight: '600',
    },
    actionsRow: {
      flexDirection: 'row',
      gap: 10,
    },
    actionButton: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
      minHeight: 46,
      borderRadius: 10,
    },
    redeemButton: {
      gap: 6,
    },
    redeemText: {
      fontSize: 14,
      fontWeight: '700',
      color: colors.text.inverse,
    },
    historyButton: {
      borderWidth: 1,
      backgroundColor: colors.background.paper,
    },
    historyText: {
      fontSize: 14,
      fontWeight: '700',
    },
    actionDisabled: {
      opacity: 0.4,
    },
  });
