import { StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';

export const createStyles = (colors: any, isDark?: boolean) => StyleSheet.create({
  container: {
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing.sm,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.xs,
  },
  icon: {
    fontSize: 14,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.neutral[600],
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  usedValue: {
    fontSize: 15,
    fontWeight: '700',
  },
  separator: {
    fontSize: 13,
    color: colors.neutral[400],
  },
  maxValue: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.neutral[500],
  },
  barContainer: {
    width: '100%',
    borderRadius: Theme.radius.full,
    overflow: 'hidden',
    position: 'relative',
  },
  backgroundBar: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: Theme.radius.full,
  },
  fillBar: {
    height: '100%',
    borderRadius: Theme.radius.full,
    position: 'absolute',
    left: 0,
    top: 0,
  },
  percentageOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  percentageText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.neutral[800],
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Theme.spacing.sm,
  },
  remainingText: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.neutral[500],
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: Theme.radius.full,
    gap: 4,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
});
