import { StyleSheet } from 'react-native';

export const createStyles = (colors: any) =>
  StyleSheet.create({
    content: {
      flex: 1,
    },
    scroll: {
      padding: 16,
      gap: 16,
      paddingBottom: 32,
    },
    image: {
      width: '100%',
      height: 220,
      borderRadius: 16,
      backgroundColor: colors.background.paper,
    },
    info: {
      gap: 8,
    },
    name: {
      fontSize: 20,
      fontWeight: '800',
      color: colors.text.primary,
    },
    metaRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    points: {
      fontSize: 18,
      fontWeight: '900',
      color: colors.primary.main,
    },
    stock: {
      fontSize: 13,
      color: colors.text.secondary,
      fontWeight: '600',
    },
    badge: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderRadius: 6,
    },
    badgeLabel: {
      fontSize: 12,
      fontWeight: '700',
    },
    description: {
      fontSize: 14,
      color: colors.text.secondary,
      lineHeight: 20,
    },
    section: {
      gap: 8,
    },
    sectionTitle: {
      fontSize: 14,
      fontWeight: '800',
      color: colors.text.primary,
    },
    quantityRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
    },
    qtyButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.background.paper,
      borderWidth: 1,
      borderColor: colors.border,
    },
    qtyValue: {
      fontSize: 18,
      fontWeight: '800',
      color: colors.text.primary,
      minWidth: 32,
      textAlign: 'center',
    },
    totalRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 8,
    },
    totalLabel: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.text.secondary,
    },
    totalValue: {
      fontSize: 18,
      fontWeight: '900',
      color: colors.primary.main,
    },
    input: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 10,
      paddingHorizontal: 12,
      paddingVertical: 10,
      fontSize: 14,
      color: colors.text.primary,
      backgroundColor: colors.background.paper,
      minHeight: 44,
    },
    inputError: {
      borderColor: colors.status.error,
    },
    errorText: {
      fontSize: 12,
      fontWeight: '600',
      marginTop: 2,
    },
    multilineInput: {
      minHeight: 80,
      textAlignVertical: 'top',
    },
    redeemButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      minHeight: 50,
      borderRadius: 12,
      backgroundColor: colors.primary.main,
      marginTop: 8,
    },
    redeemDisabled: {
      opacity: 0.4,
    },
    redeemText: {
      fontSize: 15,
      fontWeight: '800',
      color: colors.text.inverse,
    },
  });
