import { StyleSheet } from 'react-native';
import { useMemo } from 'react';
import { Fonts } from '@src/constants/Fonts';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Theme } from '@src/constants/Theme';

export const useTimelineWaypointCardStyles = () => {
  const { colors, isDark } = useAppTheme();

  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          flexDirection: 'row',
          backgroundColor: colors.background.card,
          borderRadius: Theme.radius.xl,
          padding: Theme.spacing.md,
          marginBottom: Theme.spacing.md,
          ...Theme.shadows.sm,
        },
        containerCurrent: {
          borderWidth: 2,
          borderColor: colors.status.info,
          ...Theme.shadows.md,
        },
        containerCompleted: {
          opacity: 0.8,
        },
        leftSection: {
          alignItems: 'center',
          marginRight: Theme.spacing.md,
        },
        iconContainer: {
          width: 44,
          height: 44,
          borderRadius: 22,
          justifyContent: 'center',
          alignItems: 'center',
        },
        connector: {
          width: 2,
          flex: 1,
          backgroundColor: colors.border,
          marginTop: Theme.spacing.xs,
        },
        content: {
          flex: 1,
        },
        headerRow: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: Theme.spacing.sm,
        },
        locationContainer: {
          flex: 1,
          marginRight: Theme.spacing.sm,
        },
        locationName: {
          fontSize: 15,
          fontWeight: '700',
          color: colors.text.primary,
        },
        locationCode: {
          fontSize: 12,
          color: colors.text.secondary,
          marginTop: 2,
        },
        dateContainer: {
          alignItems: 'flex-end',
        },
        dateLabel: {
          fontSize: 10,
          color: colors.text.secondary,
          fontWeight: '600',
          textTransform: 'uppercase',
        },
        dateValue: {
          fontSize: 14,
          fontWeight: '700',
          color: colors.text.primary,
        },
        timeValue: {
          fontSize: 12,
          color: colors.text.secondary,
        },
        statusBadge: {
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'flex-start',
          paddingHorizontal: Theme.spacing.md,
          paddingVertical: Theme.spacing.xs,
          borderRadius: Theme.radius.full,
          marginBottom: Theme.spacing.sm,
          gap: 6,
        },
        statusDot: {
          width: 8,
          height: 8,
          borderRadius: 4,
        },
        statusText: {
          fontSize: 11,
          fontWeight: '700',
        },
        infoRow: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: Theme.spacing.sm,
          flexWrap: 'wrap',
        },
        infoBadge: {
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: colors.background.paper,
          paddingHorizontal: Theme.spacing.sm,
          paddingVertical: 4,
          borderRadius: Theme.radius.full,
          gap: 4,
        },
        infoBadgeText: {
          fontSize: 11,
          color: colors.text.secondary,
          fontWeight: '500',
        },
        transportBadge: {
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: `${colors.status.info}15`,
          paddingHorizontal: Theme.spacing.sm,
          paddingVertical: 4,
          borderRadius: Theme.radius.full,
          gap: 4,
        },
        transportBadgeText: {
          fontSize: 11,
          color: colors.status.info,
          fontWeight: '500',
        },
        detailsRow: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: Theme.spacing.md,
          marginTop: Theme.spacing.sm,
          flexWrap: 'wrap',
        },
        detailItem: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 4,
        },
        detailText: {
          fontSize: 11,
          color: colors.text.secondary,
          maxWidth: 100,
        },
        currentIndicator: {
          marginTop: Theme.spacing.sm,
        },
        currentGradient: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: Theme.spacing.sm,
          paddingHorizontal: Theme.spacing.md,
          borderRadius: Theme.radius.lg,
          gap: Theme.spacing.xs,
        },
        currentText: {
          fontSize: 12,
          fontWeight: '700',
          color: colors.text.inverse,
        },
        rightSection: {
          justifyContent: 'center',
          marginLeft: Theme.spacing.sm,
        },
        statusIcon: {
          width: 28,
          height: 28,
          borderRadius: 14,
          justifyContent: 'center',
          alignItems: 'center',
        },
      }),
    [colors, isDark],
  );
};
