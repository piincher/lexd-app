import { StyleSheet } from 'react-native';

export const createStyles = (colors: any) =>
  StyleSheet.create({
    card: {
      flex: 1,
      borderRadius: 12,
      backgroundColor: colors.background.card,
      borderWidth: 1,
      borderColor: colors.border,
      overflow: 'hidden',
    },
    image: {
      width: '100%',
      height: 120,
      backgroundColor: colors.background.paper,
    },
    content: {
      padding: 10,
      gap: 6,
    },
    name: {
      fontSize: 13,
      fontWeight: '700',
      color: colors.text.primary,
      lineHeight: 18,
    },
    metaRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    badge: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 3,
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: 4,
    },
    badgeLabel: {
      fontSize: 10,
      fontWeight: '700',
    },
    points: {
      fontSize: 14,
      fontWeight: '800',
      color: colors.primary.main,
    },
    stock: {
      fontSize: 11,
      color: colors.text.secondary,
      fontWeight: '600',
    },
    lockedOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: colors.background.scrim + '80',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 12,
    },
    lockedText: {
      fontSize: 11,
      fontWeight: '700',
      color: colors.text.inverse,
      textAlign: 'center',
      paddingHorizontal: 8,
    },
  });
