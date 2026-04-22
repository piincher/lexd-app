/**
 * VoidGoodsScreen styles
 */

import { StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';

export const createStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    padding: Theme.spacing.lg,
  },
  warningCard: {
    backgroundColor: colors.feedback.errorBg || '#FEF2F2',
    borderLeftWidth: 4,
    borderLeftColor: colors.status.error || '#DC2626',
    marginBottom: Theme.spacing.lg,
  },
  warningTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.status.error || '#DC2626',
    marginBottom: Theme.spacing.sm,
  },
  warningText: {
    fontSize: 14,
    color: colors.text.secondary || '#6B7280',
    lineHeight: 20,
  },
  infoCard: {
    marginBottom: Theme.spacing.lg,
  },
  infoLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text.muted || '#9CA3AF',
    textTransform: 'uppercase',
    marginTop: Theme.spacing.sm,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text.primary || '#1F2937',
    marginTop: Theme.spacing.xs,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text.primary || '#1F2937',
    marginBottom: Theme.spacing.md,
  },
  reasonButton: {
    marginBottom: Theme.spacing.md,
  },
  spacer: {
    flex: 1,
  },
});
