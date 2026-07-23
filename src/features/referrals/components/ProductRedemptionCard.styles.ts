import { StyleSheet } from 'react-native';
import { HAIRLINE, RADIUS } from '@src/shared/ui/designLanguage';

export const createStyles = (colors: any) =>
  StyleSheet.create({
    card: {
      borderRadius: RADIUS.card,
      padding: 14,
      gap: 10,
      backgroundColor: colors.background.card,
      borderWidth: HAIRLINE,
      borderColor: colors.border,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: 12,
    },
    headerLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      flex: 1,
    },
    image: {
      width: 48,
      height: 48,
      borderRadius: RADIUS.control,
      backgroundColor: colors.background.paper,
    },
    name: {
      fontSize: 14,
      fontWeight: '700',
      color: colors.text.primary,
      flex: 1,
    },
    meta: {
      fontSize: 12,
      color: colors.text.secondary,
      marginTop: 2,
    },
    points: {
      fontSize: 13,
      fontWeight: '800',
      color: colors.primary.main,
    },
    remarkBox: {
      backgroundColor: colors.background.paper,
      borderRadius: RADIUS.control,
      padding: 10,
      gap: 4,
    },
    remarkLabel: {
      fontSize: 11,
      fontWeight: '700',
      letterSpacing: 0.7,
      textTransform: 'uppercase',
      color: colors.text.secondary,
    },
    remarkText: {
      fontSize: 13,
      color: colors.text.primary,
      lineHeight: 18,
    },
    imagePlaceholder: {
      width: 48,
      height: 48,
      borderRadius: RADIUS.control,
      backgroundColor: colors.primary[50] ?? colors.background.paper,
      alignItems: 'center',
      justifyContent: 'center',
    },
    // Pickup-code presentation — shown when the item is approved/ready so the
    // client has the code ready to present at the counter.
    pickupBox: {
      borderRadius: RADIUS.card,
      padding: 12,
      gap: 6,
      alignItems: 'center',
      backgroundColor: (colors.accent?.gold ?? colors.primary.main) + '14',
      borderWidth: 1,
      borderColor: (colors.accent?.gold ?? colors.primary.main) + '40',
      borderStyle: 'dashed',
    },
    pickupLabel: {
      fontSize: 11,
      fontWeight: '700',
      letterSpacing: 0.7,
      textTransform: 'uppercase',
      color: colors.text.secondary,
    },
    pickupCode: {
      fontSize: 30,
      fontWeight: '900',
      letterSpacing: 8,
      color: colors.accent?.goldDark ?? colors.primary.dark ?? colors.primary.main,
    },
    pickupHint: {
      fontSize: 11,
      color: colors.text.secondary,
      textAlign: 'center',
    },
    rejectBox: {
      backgroundColor: colors.status.error + '10',
      borderRadius: RADIUS.control,
      padding: 10,
      gap: 4,
    },
    rejectLabel: {
      fontSize: 11,
      fontWeight: '700',
      letterSpacing: 0.7,
      textTransform: 'uppercase',
      color: colors.status.error,
    },
    rejectText: {
      fontSize: 13,
      color: colors.text.primary,
      lineHeight: 18,
    },
    cancelButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
      minHeight: 40,
      borderRadius: RADIUS.control,
      borderWidth: 1,
      borderColor: colors.status.error + '40',
      backgroundColor: colors.status.error + '08',
    },
    cancelDisabled: {
      opacity: 0.5,
    },
    cancelText: {
      fontSize: 13,
      fontWeight: '700',
      color: colors.status.error,
    },
  });
