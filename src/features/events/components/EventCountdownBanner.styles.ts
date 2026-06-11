import { StyleSheet } from 'react-native';

export const getBannerStyles = () =>
  StyleSheet.create({
    wrapper: {
      marginHorizontal: 16,
      marginVertical: 12,
      borderRadius: 20,
      overflow: 'hidden',
    },
    gradient: {
      padding: 18,
    },
    headerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    icon: {
      fontSize: 26,
      marginRight: 8,
    },
    titleBlock: {
      flex: 1,
    },
    eventName: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '800',
    },
    headline: {
      color: 'rgba(255,255,255,0.92)',
      fontSize: 13,
      fontWeight: '600',
      marginTop: 1,
    },
    urgencyPill: {
      backgroundColor: 'rgba(255,255,255,0.22)',
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 999,
    },
    urgencyPillText: {
      color: '#FFFFFF',
      fontSize: 11,
      fontWeight: '800',
      letterSpacing: 0.5,
    },
    cutoffText: {
      color: 'rgba(255,255,255,0.85)',
      fontSize: 12,
      marginTop: 12,
      fontWeight: '500',
    },
    metaRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 12,
      flexWrap: 'wrap',
      gap: 8,
    },
    chip: {
      backgroundColor: 'rgba(255,255,255,0.18)',
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 999,
    },
    chipText: {
      color: '#FFFFFF',
      fontSize: 12,
      fontWeight: '700',
    },
  });

export const getCountdownStyles = (tint: string) =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
      gap: 8,
    },
    cell: {
      flex: 1,
      backgroundColor: 'rgba(255,255,255,0.95)',
      borderRadius: 12,
      paddingVertical: 8,
      alignItems: 'center',
    },
    value: {
      color: tint,
      fontSize: 22,
      fontWeight: '900',
      fontVariant: ['tabular-nums'],
    },
    label: {
      color: '#6B7280',
      fontSize: 10,
      fontWeight: '600',
      marginTop: 2,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
  });
