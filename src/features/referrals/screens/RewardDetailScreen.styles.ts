import { StyleSheet } from 'react-native';
import { HAIRLINE, RADIUS } from '@src/shared/ui/designLanguage';

export const createStyles = (colors: any) =>
  StyleSheet.create({
    content: {
      flex: 1,
    },
    flex: {
      flex: 1,
    },
    scroll: {
      padding: 16,
      gap: 18,
      paddingBottom: 24,
    },
    notFound: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
    },
    notFoundText: {
      fontSize: 15,
      color: colors.text.secondary,
    },
    image: {
      width: '100%',
      height: 230,
      borderRadius: RADIUS.card,
      backgroundColor: colors.background.paper,
    },
    pointsBadge: {
      position: 'absolute',
      top: 12,
      right: 12,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: RADIUS.badge,
      backgroundColor: colors.primary.main,
    },
    pointsBadgeText: {
      fontSize: 13,
      fontWeight: '900',
      color: colors.text.inverse,
    },
    stockOverlay: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      top: 0,
      borderRadius: RADIUS.card,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.background.scrim + '80',
    },
    stockOverlayText: {
      fontSize: 14,
      fontWeight: '800',
      color: colors.text.inverse,
    },
    info: {
      gap: 10,
    },
    name: {
      fontSize: 22,
      fontWeight: '900',
      color: colors.text.primary,
      letterSpacing: -0.3,
    },
    chipsRow: {
      flexDirection: 'row',
      gap: 8,
      flexWrap: 'wrap',
    },
    badge: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: RADIUS.badge,
    },
    badgeLabel: {
      fontSize: 12,
      fontWeight: '700',
    },
    description: {
      fontSize: 14,
      color: colors.text.secondary,
      lineHeight: 21,
    },
    balanceCard: {
      gap: 10,
      padding: 16,
      borderRadius: RADIUS.card,
      backgroundColor: colors.background.card,
      borderWidth: HAIRLINE,
      borderColor: colors.border,
    },
    balanceTop: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    balanceLabelRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    balanceLabel: {
      // Waybill tracked uppercase micro-label (balance metadata).
      fontSize: 10,
      fontWeight: '700',
      letterSpacing: 0.7,
      textTransform: 'uppercase',
      color: colors.text.secondary,
    },
    balanceValue: {
      fontSize: 16,
      fontWeight: '900',
      color: colors.text.primary,
    },
    balanceTrack: {
      height: 6,
      borderRadius: RADIUS.pill,
      backgroundColor: colors.background.paper,
      overflow: 'hidden',
    },
    balanceFill: {
      height: '100%',
      borderRadius: RADIUS.pill,
    },
    balanceHint: {
      fontSize: 12.5,
      fontWeight: '700',
    },
    section: {
      gap: 10,
    },
    sectionTitle: {
      fontSize: 14,
      fontWeight: '800',
      color: colors.text.primary,
    },
    quantityRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 18,
    },
    qtyButton: {
      width: 42,
      height: 42,
      borderRadius: 21,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.background.paper,
      borderWidth: HAIRLINE,
      borderColor: colors.border,
    },
    qtyButtonDisabled: {
      opacity: 0.4,
    },
    qtyValue: {
      fontSize: 18,
      fontWeight: '800',
      color: colors.text.primary,
      minWidth: 32,
      textAlign: 'center',
    },
    input: {
      borderWidth: HAIRLINE,
      borderColor: colors.border,
      borderRadius: RADIUS.control,
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
    },
    multilineInput: {
      minHeight: 80,
      textAlignVertical: 'top',
    },
    footer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 14,
      paddingHorizontal: 16,
      paddingTop: 12,
      paddingBottom: 16,
      borderTopWidth: 1,
      borderTopColor: colors.border,
      backgroundColor: colors.background.default,
    },
    footerTotals: {
      gap: 2,
    },
    footerTotalLabel: {
      fontSize: 12,
      fontWeight: '600',
      color: colors.text.secondary,
    },
    footerTotalValue: {
      fontSize: 20,
      fontWeight: '900',
      color: colors.primary.main,
    },
    cta: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      minHeight: 52,
      borderRadius: RADIUS.control,
      backgroundColor: colors.primary.main,
    },
    ctaDisabled: {
      opacity: 0.4,
    },
    ctaText: {
      fontSize: 15,
      fontWeight: '800',
      color: colors.text.inverse,
    },
  });
