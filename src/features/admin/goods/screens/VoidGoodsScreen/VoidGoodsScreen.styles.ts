/**
 * VoidGoodsScreen styles
 */

import { StyleSheet } from 'react-native';
import { lightTheme } from '@src/constants/Theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: lightTheme.spacing.lg,
  },
  warningCard: {
    backgroundColor: lightTheme.colors.feedback.errorBg || '#FEF2F2',
    borderLeftWidth: 4,
    borderLeftColor: lightTheme.colors.status.error || '#DC2626',
    marginBottom: lightTheme.spacing.lg,
  },
  warningTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: lightTheme.colors.status.error || '#DC2626',
    marginBottom: lightTheme.spacing.sm,
  },
  warningText: {
    fontSize: 14,
    color: lightTheme.colors.text.secondary || '#6B7280',
    lineHeight: 20,
  },
  infoCard: {
    marginBottom: lightTheme.spacing.lg,
  },
  infoLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: lightTheme.colors.text.muted || '#9CA3AF',
    textTransform: 'uppercase',
    marginTop: lightTheme.spacing.sm,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '700',
    color: lightTheme.colors.text.primary || '#1F2937',
    marginTop: lightTheme.spacing.xs,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: lightTheme.colors.text.primary || '#1F2937',
    marginBottom: lightTheme.spacing.md,
  },
  reasonButton: {
    marginBottom: lightTheme.spacing.md,
  },
  spacer: {
    flex: 1,
  },
});

export default styles;
