import { StyleSheet } from 'react-native';

export const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      borderRadius: 20,
      padding: 20,
      gap: 14,
      shadowColor: colors.primary.dark,
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.25,
      shadowRadius: 16,
      elevation: 6,
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
      fontSize: 13,
      fontWeight: '700',
      color: 'rgba(255,255,255,0.9)',
      letterSpacing: 0.3,
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
      color: '#FFFFFF',
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
      borderRadius: 999,
      backgroundColor: 'rgba(255,255,255,0.25)',
      overflow: 'hidden',
    },
    progressFill: {
      height: '100%',
      borderRadius: 999,
      backgroundColor: '#FFFFFF',
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
      color: '#FFFFFF',
    },
  });
