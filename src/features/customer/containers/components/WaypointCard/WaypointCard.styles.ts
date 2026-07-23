import { StyleSheet } from 'react-native';
import { useMemo } from 'react';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';
import { Theme } from '@src/constants/Theme';
import { HAIRLINE } from '@src/shared/ui/designLanguage';

export const useWaypointCardStyles = () => {
  const { colors, isDark } = useAppTheme();

  return useMemo(
    () =>
      StyleSheet.create({
        timelineConnector: {
          alignItems: 'center',
          height: 24,
        },
        connectorLine: {
          width: 3,
          height: 24,
          borderRadius: 2,
        },
        waypointCard: {
          borderWidth: HAIRLINE,
          borderColor: colors.border,
          backgroundColor: colors.background.card,
          borderRadius: 16,
          overflow: 'hidden',
        },
        waypointCardCurrent: {
          borderWidth: 2,
          borderColor: colors.status.info,
        },
        waypointCardCompleted: {
          opacity: 0.85,
        },
        waypointCardDakar: {
          borderWidth: 2,
          borderColor: colors.status.info,
        },
        waypointCardBorder: {
          borderWidth: 2,
          borderColor: colors.status.warning,
        },
        waypointCardWarehouse: {
          borderWidth: 2,
          borderColor: colors.primary.main,
        },
        wpStatusBar: {
          height: 4,
          width: '100%',
        },
        wpContent: {
          padding: 16,
        },
        wpHeader: {
          flexDirection: 'row',
          alignItems: 'flex-start',
          marginBottom: 10,
        },
        wpNumber: {
          width: 36,
          height: 36,
          borderRadius: 18,
          backgroundColor: isDark ? `${colors.status.success}20` : colors.feedback.successBg,
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: 12,
        },
        wpNumberText: {
          fontSize: 16,
          fontFamily: Fonts.bold,
          color: colors.status.success,
        },
        wpTitleContainer: {
          flex: 1,
        },
        wpLocation: {
          fontSize: 16,
          fontFamily: Fonts.bold,
          color: colors.text.primary,
        },
        wpCode: {
          fontSize: 12,
          fontFamily: Fonts.regular,
          color: colors.text.secondary,
          marginTop: 2,
        },
        wpStatusBadge: {
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 8,
          paddingVertical: 4,
          borderRadius: 20,
          gap: 4,
        },
        wpStatusText: {
          fontSize: 10,
          fontFamily: Fonts.bold,
        },
        wpTypeRow: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
          marginBottom: 8,
          flexWrap: 'wrap',
        },
        wpTypeBadge: {
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: colors.background.paper,
          paddingHorizontal: 10,
          paddingVertical: 4,
          borderRadius: 20,
          gap: 4,
        },
        wpTypeBadgeText: {
          fontSize: 11,
          fontFamily: Fonts.meduim,
          color: colors.text.secondary,
        },
        currentBadge: {
          backgroundColor: colors.status.info,
          paddingHorizontal: 10,
          paddingVertical: 2,
          borderRadius: 20,
        },
        currentBadgeText: {
          fontSize: 9,
          fontFamily: Fonts.bold,
          color: colors.text.inverse,
        },
        wpQuickInfo: {
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 12,
        },
        wpInfoItem: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 4,
        },
        wpInfoText: {
          fontSize: 12,
          fontFamily: Fonts.regular,
          color: colors.text.secondary,
        },
        wpExpandIndicator: {
          alignItems: 'center',
          marginTop: 6,
        },
        wpDetails: {
          marginTop: 8,
        },
        wpDetailDivider: {
          height: 1,
          backgroundColor: colors.border,
          marginBottom: 10,
        },
        wpDetailRow: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingVertical: 6,
        },
        wpDetailLabel: {
          fontSize: 13,
          fontFamily: Fonts.regular,
          color: colors.text.secondary,
        },
        wpDetailValue: {
          fontSize: 13,
          fontFamily: Fonts.meduim,
          color: colors.text.primary,
        },
        wpNotes: {
          flexDirection: 'row',
          alignItems: 'flex-start',
          gap: 6,
          backgroundColor: colors.background.paper,
          padding: 10,
          borderRadius: 8,
          marginTop: 8,
        },
        wpNotesText: {
          fontSize: 12,
          fontFamily: Fonts.regular,
          color: colors.text.secondary,
          flex: 1,
        },
      }),
    [colors, isDark],
  );
};
