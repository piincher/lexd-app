import { StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';

export const createStyles = (colors: any, isDark?: boolean) => StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.background.card,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    padding: 12,
    paddingBottom: 28,
    ...Theme.shadows.lg,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  selectAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  checkboxSelected: {
    backgroundColor: colors.primary.main,
    borderColor: colors.primary[600],
  },
  selectAllText: {
    fontSize: 14,
    color: colors.text.secondary,
    fontWeight: '500',
  },
  cancelText: {
    fontSize: 14,
    color: colors.status.error,
    fontWeight: '600',
  },
  countText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 10,
  },
  // 4-metric strip shown above the action buttons — gives the operator the shape of
  // the batch (count · kg · m³ · FCFA) before committing to assign / status-change / void.
  totalsStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: colors.background.paper,
    borderWidth: 1,
    borderColor: colors.border,
  },
  totalsCell: {
    flex: 1,
    alignItems: 'center',
    gap: 2,
  },
  totalsDivider: {
    width: 1,
    height: 28,
    backgroundColor: colors.border,
  },
  totalsLabel: {
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5,
    color: colors.text.secondary,
  },
  totalsValue: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.text.primary,
    fontVariant: ['tabular-nums'],
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary.main,
    paddingVertical: 10,
    borderRadius: 8,
    gap: 6,
  },
  actionButtonDanger: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.status.error,
    paddingVertical: 10,
    borderRadius: 8,
    gap: 6,
  },
  actionButtonDisabled: {
    backgroundColor: colors.border,
  },
  actionButtonText: {
    color: colors.text.inverse,
    fontWeight: '600',
    fontSize: 13,
  },
  // Permanent-delete affordance: outlined (not filled) so it's visually distinct from
  // the solid red "Annuler" void above, on its own row to prevent mis-taps.
  hardDeleteButton: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: colors.status.error,
    gap: 8,
  },
  hardDeleteButtonDisabled: {
    borderColor: colors.border,
  },
  hardDeleteText: {
    color: colors.status.error,
    fontWeight: '700',
    fontSize: 13,
    letterSpacing: 0.2,
  },
});
