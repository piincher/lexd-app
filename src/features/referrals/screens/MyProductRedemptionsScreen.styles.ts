import { StyleSheet } from 'react-native';
import { HAIRLINE, RADIUS } from '@src/shared/ui/designLanguage';

export const createStyles = (colors: any) =>
  StyleSheet.create({
    content: {
      flex: 1,
    },
    list: {
      paddingHorizontal: 16,
      paddingBottom: 32,
      gap: 12,
    },
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
    cancelButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
      minHeight: 40,
      borderRadius: RADIUS.control,
      borderWidth: HAIRLINE,
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
