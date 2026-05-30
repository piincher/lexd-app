import { StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';

export const createStyles = (colors: any, isDark?: boolean) =>
  StyleSheet.create({
    root: {
      flex: 1,
    },
    overlay: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    backdrop: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0, 0, 0, 0.32)',
    },
    backdropPressable: {
      flex: 1,
    },
    card: {
      backgroundColor: colors.background.card,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      paddingHorizontal: 20,
      paddingTop: 8,
      paddingBottom: 24,
      // Animated.View replaces Paper's Card, so add the elevation/shadow here.
      shadowColor: '#000',
      shadowOffset: { width: 0, height: -2 },
      shadowOpacity: 0.18,
      shadowRadius: 12,
      elevation: 16,
    },
    // Handle + header form the drag zone; a little vertical padding enlarges the
    // touch target so the sheet is easy to grab and pull.
    dragArea: {
      paddingBottom: 4,
    },
    handle: {
      alignSelf: 'center',
      width: 36,
      height: 4,
      borderRadius: 2,
      backgroundColor: isDark ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.12)',
      marginBottom: 12,
      marginTop: 4,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 18,
    },
    headerText: {
      flex: 1,
      paddingRight: 12,
    },
    title: {
      fontSize: 18,
      fontWeight: '700',
      color: colors.text.primary,
    },
    subtitle: {
      marginTop: 2,
      fontSize: 12.5,
      fontWeight: '600',
      color: colors.text.secondary,
    },
    closeButton: {
      width: 32,
      height: 32,
      borderRadius: 16,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
    },
    // Loading / error / empty wrapper — same vertical rhythm for all three.
    stateBlock: {
      alignItems: 'center',
      paddingVertical: 32,
      gap: 12,
    },
    stateText: {
      fontSize: 14,
      color: colors.text.secondary,
      textAlign: 'center',
      paddingHorizontal: 24,
    },
    retryButton: {
      marginTop: 8,
    },
    metricsGrid: {
      flexDirection: 'row',
      gap: 10,
    },
    metricCard: {
      flex: 1,
      backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
      borderRadius: Theme.radius.lg,
      borderWidth: 1,
      borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)',
      paddingHorizontal: 12,
      paddingVertical: 14,
      alignItems: 'flex-start',
    },
    metricIconWrap: {
      width: 36,
      height: 36,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 10,
    },
    metricValue: {
      fontSize: 18,
      fontWeight: '800',
      color: colors.text.primary,
      marginBottom: 2,
    },
    metricLabel: {
      fontSize: 11.5,
      fontWeight: '600',
      color: colors.text.secondary,
      textTransform: 'uppercase',
      letterSpacing: 0.4,
    },
    breakdown: {
      marginTop: 16,
    },
    breakdownTitle: {
      fontSize: 13,
      fontWeight: '800',
      color: colors.text.primary,
      marginBottom: 8,
      textTransform: 'uppercase',
      letterSpacing: 0.4,
    },
    breakdownScroll: {
      maxHeight: 200,
    },
    breakdownRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 8,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.06)',
      gap: 10,
    },
    breakdownLabelWrap: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      flexShrink: 0,
    },
    breakdownDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
    },
    breakdownLabel: {
      fontSize: 13,
      fontWeight: '700',
      color: colors.text.primary,
    },
    breakdownMeta: {
      flex: 1,
      textAlign: 'right',
      fontSize: 11.5,
      fontWeight: '600',
      color: colors.text.secondary,
    },
    footnote: {
      marginTop: 14,
      fontSize: 11.5,
      lineHeight: 16,
      color: colors.text.secondary,
      paddingHorizontal: 4,
    },
  });
