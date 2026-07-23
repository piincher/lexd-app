import { StyleSheet } from 'react-native';
import { HAIRLINE, RADIUS } from '@src/shared/ui/designLanguage';

export const createStyles = (colors: any) =>
  StyleSheet.create({
    card: {
      flex: 1,
      borderRadius: RADIUS.card,
      backgroundColor: colors.background.card,
      borderWidth: HAIRLINE,
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
      borderRadius: RADIUS.badge,
    },
    badgeLabel: {
      fontSize: 10,
      fontWeight: '700',
      letterSpacing: 0.6,
      textTransform: 'uppercase',
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
      borderRadius: RADIUS.card,
    },
    lockedText: {
      fontSize: 11,
      fontWeight: '700',
      color: colors.text.inverse,
      textAlign: 'center',
      paddingHorizontal: 8,
    },
  });
