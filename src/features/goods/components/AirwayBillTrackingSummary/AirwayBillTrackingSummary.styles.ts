import { StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';
import { Fonts } from '@src/constants/Fonts';

export const styles = StyleSheet.create({
  card: {
    borderRadius: Theme.radius.xl,
    marginBottom: Theme.spacing.md,
    backgroundColor: '#FFFFFF',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  statusIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#16A34A',
  },
  statusCopy: {
    flex: 1,
  },
  eyebrow: {
    fontFamily: Fonts.medium,
    fontSize: 11,
    color: Theme.neutral[500],
    textTransform: 'uppercase',
  },
  statusLabel: {
    fontFamily: Fonts.bold,
    fontSize: 18,
    color: Theme.neutral[900],
    marginTop: 2,
  },
  progressText: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: '#16A34A',
  },
  progressTrack: {
    height: 8,
    borderRadius: 999,
    backgroundColor: Theme.neutral[100],
    overflow: 'hidden',
    marginTop: 16,
  },
  progressFill: {
    height: '100%',
    borderRadius: 999,
    backgroundColor: '#16A34A',
  },
  metricsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 14,
  },
  metric: {
    flex: 1,
    borderRadius: 12,
    padding: 12,
    backgroundColor: Theme.neutral[50],
  },
  metricValue: {
    fontFamily: Fonts.bold,
    fontSize: 13,
    color: Theme.neutral[900],
  },
  metricLabel: {
    fontFamily: Fonts.medium,
    fontSize: 11,
    color: Theme.neutral[500],
    marginTop: 4,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Theme.neutral[100],
  },
  footerText: {
    flex: 1,
    fontFamily: Fonts.medium,
    fontSize: 12,
    color: Theme.neutral[600],
  },
});
