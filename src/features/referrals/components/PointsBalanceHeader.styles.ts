import { StyleSheet } from 'react-native';
import { HAIRLINE, RADIUS } from '@src/shared/ui/designLanguage';

export const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      borderRadius: RADIUS.card,
      padding: 20,
      gap: 14,
      // Waybill: border-first separation instead of the old drop shadow.
      borderWidth: HAIRLINE,
      borderColor: colors.primary.dark,
    },
    topRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    labelRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    label: {
      // Waybill tracked uppercase micro-label (balance eyebrow).
      fontSize: 11,
      fontWeight: '700',
      color: 'rgba(255,255,255,0.9)',
      letterSpacing: 0.8,
      textTransform: 'uppercase',
    },
    headerActions: {
      flexDirection: 'row',
      gap: 8,
    },
    iconButton: {
      width: 34,
      height: 34,
      borderRadius: 17,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(255,255,255,0.18)',
    },
    valueRow: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      gap: 6,
    },
    value: {
      fontSize: 44,
      fontWeight: '900',
      color: colors.text.inverse,
      letterSpacing: -1,
      lineHeight: 48,
    },
    valueUnit: {
      fontSize: 18,
      fontWeight: '800',
      color: 'rgba(255,255,255,0.85)',
      marginBottom: 6,
    },
    nudge: {
      gap: 8,
    },
    progressTrack: {
      height: 6,
      borderRadius: RADIUS.pill,
      backgroundColor: 'rgba(255,255,255,0.25)',
      overflow: 'hidden',
    },
    progressFill: {
      height: '100%',
      borderRadius: RADIUS.pill,
      backgroundColor: colors.text.inverse,
    },
    readyRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    nudgeText: {
      flex: 1,
      fontSize: 12.5,
      fontWeight: '600',
      color: 'rgba(255,255,255,0.92)',
    },
    nudgeStrong: {
      fontWeight: '900',
      color: colors.text.inverse,
    },
  });
