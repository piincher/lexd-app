import { StyleSheet } from 'react-native';
import { Fonts } from '@src/constants/Fonts';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Theme } from '@src/constants/Theme';
import { useMemo } from 'react';

export const useAirwayBillTrackingSummaryStyles = () => {
  const { colors } = useAppTheme();
  return useMemo(() => StyleSheet.create({
    card: {
      borderRadius: Theme.radius.xl,
      marginBottom: Theme.spacing.md,
      backgroundColor: colors.background.card,
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
    backgroundColor: colors.status.success,
  },
  statusCopy: {
    flex: 1,
  },
  eyebrow: {
    fontFamily: Fonts.medium,
    fontSize: 11,
    color: colors.neutral[500],
    textTransform: 'uppercase',
  },
  statusLabel: {
    fontFamily: Fonts.bold,
    fontSize: 18,
    color: colors.text.primary,
    marginTop: 2,
  },
  progressText: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: colors.status.success,
  },
  progressTrack: {
    height: 8,
    borderRadius: 999,
    backgroundColor: colors.neutral[100],
    overflow: 'hidden',
    marginTop: 16,
  },
  progressFill: {
    height: '100%',
    borderRadius: 999,
    backgroundColor: colors.status.success,
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
    backgroundColor: colors.neutral[50],
  },
  metricValue: {
    fontFamily: Fonts.bold,
    fontSize: 13,
    color: colors.text.primary,
  },
  metricLabel: {
    fontFamily: Fonts.medium,
    fontSize: 11,
    color: colors.text.secondary,
    marginTop: 4,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.neutral[100],
  },
  footerText: {
    flex: 1,
    fontFamily: Fonts.medium,
    fontSize: 12,
    color: colors.text.secondary,
  },
  }), [colors]);
};
