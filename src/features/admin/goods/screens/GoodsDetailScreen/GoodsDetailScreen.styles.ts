/* Hallmark · macrostructure: Narrative Workflow · genre: modern-minimal · tone: utilitarian
 * theme: brand-aligned app theme · cohesive with the goods list/card voice
 * The shipment lifecycle is the page spine (vertical journey rail), money is de-duplicated
 * (payment-status panel + cost-composition panel), section chrome is flat & theme-aware.
 * no side-stripe cards · hairline borders · shadows.sm · tabular currency · left-aligned header
 * pre-emit critique: P5 H5 E4 S5 R5 V5
 */
import { StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';

export const createStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.default,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  // ── Header (gradient recolors per shipping mode in the component) ──
  // Left-biased composition — avoids the centered-everything tell.
  header: {
    paddingTop: Theme.spacing.lg,
    paddingHorizontal: Theme.spacing.xl,
    paddingBottom: Theme.spacing['2xl'],
    borderBottomLeftRadius: Theme.radius['2xl'],
    borderBottomRightRadius: Theme.radius['2xl'],
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing.xl,
  },
  iconButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Theme.radius.md,
    backgroundColor: 'rgba(255,255,255,0.18)',
  },
  headerContent: {
    alignItems: 'flex-start',
  },
  goodsIdBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.18)',
    paddingHorizontal: Theme.spacing.lg,
    paddingVertical: Theme.spacing.sm,
    borderRadius: Theme.radius.full,
    marginBottom: Theme.spacing.md,
  },
  badgeIcon: {
    marginRight: Theme.spacing.sm,
  },
  goodsIdText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  statusWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.sm,
  },
  // Frosted header pills (mode + status) — readable on any gradient
  headerPillRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.sm,
  },
  headerPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.20)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: Theme.radius.full,
  },
  headerPillDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FFFFFF',
  },
  headerPillText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },

  // ── ScrollView ──
  scrollView: {
    flex: 1,
    paddingHorizontal: Theme.spacing.lg,
    paddingTop: Theme.spacing.lg,
  },

  // ── QR Card ──
  qrCard: {
    marginBottom: Theme.spacing.md,
    borderRadius: Theme.radius.xl,
    overflow: 'hidden',
    backgroundColor: colors.background.card,
    borderWidth: 1,
    borderColor: colors.border,
    ...Theme.shadows.sm,
  },
  qrGradient: {
    padding: Theme.spacing.xl,
  },
  qrHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.sm,
    marginBottom: Theme.spacing.lg,
  },
  qrTitle: {
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.2,
    color: colors.text.primary,
  },
  qrContent: {
    alignItems: 'center',
  },
  qrImageContainer: {
    backgroundColor: '#FFFFFF',
    padding: Theme.spacing.lg,
    borderRadius: Theme.radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  qrImage: {
    width: 200,
    height: 200,
  },
  qrHint: {
    marginTop: Theme.spacing.md,
    fontSize: 13,
    color: colors.text.secondary,
  },
  shareButton: {
    marginTop: Theme.spacing.lg,
    borderColor: colors.primary.main,
    borderRadius: Theme.radius.md,
  },
  qrEmpty: {
    alignItems: 'center',
    paddingVertical: Theme.spacing['3xl'],
  },
  qrEmptyText: {
    marginTop: Theme.spacing.md,
    fontSize: 14,
    color: colors.text.secondary,
  },

  // ── Photo Card (consumed by PhotoCard.tsx) ──
  photoCard: {
    marginBottom: Theme.spacing.md,
    borderRadius: Theme.radius.xl,
    overflow: 'hidden',
    backgroundColor: colors.background.card,
    borderWidth: 1,
    borderColor: colors.border,
    ...Theme.shadows.sm,
  },
  photoWrapper: {
    position: 'relative',
  },
  photo: {
    width: '100%',
    height: 200,
  },
  photoOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.45)',
    padding: Theme.spacing.md,
  },
  photoLabel: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  photoBadge: {
    position: 'absolute',
    top: Theme.spacing.md,
    right: Theme.spacing.md,
    backgroundColor: 'rgba(0,0,0,0.45)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: Theme.radius.md,
  },
  photoBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },

  // ── Section Card (flat, theme-aware, hairline) ──
  sectionCard: {
    marginBottom: Theme.spacing.md,
    borderRadius: Theme.radius.xl,
    backgroundColor: colors.background.card,
    borderWidth: 1,
    borderColor: colors.border,
    ...Theme.shadows.sm,
  },
  // Kept for API compatibility — side-stripe removed (anti-pattern). No accent edge.
  financialCard: {},
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
    gap: Theme.spacing.sm,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.2,
    color: colors.text.primary,
  },
  description: {
    fontSize: 15,
    color: colors.text.secondary,
    lineHeight: 22,
  },
  trackingNumber: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text.primary,
    letterSpacing: 0.5,
  },

  // ── Client Section ──
  clientRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clientInfo: {
    marginLeft: Theme.spacing.lg,
    flex: 1,
    minWidth: 0,
  },
  clientName: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text.primary,
  },
  clientPhoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  clientPhone: {
    fontSize: 14,
    color: colors.text.secondary,
    marginLeft: 6,
  },

  // ── Property Grid (shared fallback) ──
  propertyGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Theme.spacing.lg,
  },
  propertyItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Theme.spacing.lg,
    backgroundColor: colors.background.paper,
    borderRadius: Theme.radius.lg,
    marginHorizontal: 4,
  },
  propertyItemHighlight: {
    backgroundColor: colors.primary[100],
  },
  propertyLabel: {
    fontSize: 12,
    color: colors.text.secondary,
    marginTop: 6,
    fontWeight: '600',
  },
  propertyValue: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text.primary,
    marginTop: 4,
  },
  propertyValueHighlight: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.primary[700],
    marginTop: 4,
  },

  // ── Dimensions ──
  dimensionsBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.paper,
    padding: Theme.spacing.md,
    borderRadius: Theme.radius.md,
  },
  dimensionsText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text.primary,
    marginLeft: Theme.spacing.sm,
  },

  // ── Location ──
  locationGrid: {
    gap: Theme.spacing.md,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    width: 44,
    height: 44,
    borderRadius: Theme.radius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Theme.spacing.md,
  },
  locationTextContainer: {
    flex: 1,
    minWidth: 0,
  },
  locationLabel: {
    fontSize: 12,
    color: colors.text.secondary,
    marginBottom: 2,
  },
  locationValue: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text.primary,
  },
  locationSubtext: {
    fontSize: 13,
    color: colors.text.secondary,
    marginTop: 2,
  },
  locationChevron: {
    marginLeft: Theme.spacing.sm,
  },

  // ── Cost-composition rows (Financial breakdown) ──
  financialRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  financialRowHighlight: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.background.paper,
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.md,
    borderRadius: Theme.radius.md,
    marginTop: Theme.spacing.sm,
  },
  financialLabel: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  financialLabelHighlight: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text.primary,
  },
  financialValue: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text.primary,
    fontVariant: ['tabular-nums'],
  },
  financialValueTotal: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text.primary,
    fontVariant: ['tabular-nums'],
  },
  divider: {
    marginVertical: Theme.spacing.sm,
    backgroundColor: colors.border,
  },
  paymentStatusContainer: {
    marginTop: Theme.spacing.lg,
    alignItems: 'flex-start',
  },
  paymentChip: {
    height: 36,
    paddingHorizontal: 8,
  },

  // ── Reception ──
  receptionGrid: {
    flexDirection: 'row',
    gap: Theme.spacing.md,
  },
  receptionItem: {
    flex: 1,
    minWidth: 0,
    backgroundColor: colors.background.paper,
    padding: Theme.spacing.md,
    borderRadius: Theme.radius.lg,
  },
  receptionLabel: {
    fontSize: 12,
    color: colors.text.secondary,
    marginBottom: 4,
  },
  receptionValue: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text.primary,
  },

  // ── Action Buttons ──
  actionButtons: {
    flexDirection: 'row',
    gap: Theme.spacing.md,
    marginTop: Theme.spacing.lg,
    marginBottom: Theme.spacing.sm,
  },
  editButton: {
    flex: 1,
    backgroundColor: colors.primary.main,
    borderRadius: Theme.radius.md,
  },
  deleteButton: {
    flex: 1,
    borderColor: colors.status.error,
    borderRadius: Theme.radius.md,
    borderWidth: 1.5,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  bottomSpacer: {
    height: 40,
  },
  emptyText: {
    marginTop: Theme.spacing.lg,
    fontSize: 16,
    color: colors.text.secondary,
  },
});
