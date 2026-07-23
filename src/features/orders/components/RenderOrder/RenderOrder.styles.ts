import { StyleSheet } from 'react-native';
import { useMemo } from 'react';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';
import { RADIUS, HAIRLINE } from '@src/shared/ui/designLanguage';

export const useRenderOrderStyles = () => {
  const { colors } = useAppTheme();

  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: colors.background.default,
        },
        // Border-first surfaces: the shadow stack is replaced by hairlines.
        headerCard: {
          backgroundColor: colors.background.card,
          borderRadius: RADIUS.card,
          borderWidth: HAIRLINE,
          borderColor: colors.border,
          padding: 16,
          marginBottom: 16,
        },
        headerContent: {
          flex: 1,
        },
        progressContainer: {
          marginBottom: 16,
        },
        progressTitle: {
          fontSize: 11,
          fontWeight: '700',
          letterSpacing: 0.8,
          textTransform: 'uppercase',
          fontFamily: Fonts.bold,
          color: colors.text.secondary,
          marginBottom: 8,
        },
        progressTrack: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        },
        progressStep: {
          alignItems: 'center',
        },
        progressText: {
          fontSize: 9,
          fontWeight: '700',
          letterSpacing: 0.5,
          textTransform: 'uppercase',
          fontFamily: Fonts.medium,
          color: colors.text.muted,
          marginTop: 4,
        },
        statusContainer: {
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 8,
        },
        statusBadge: {
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 8,
          paddingVertical: 4,
          borderRadius: RADIUS.badge,
          marginRight: 12,
          backgroundColor: colors.primary.main,
        },
        paid: {
          backgroundColor: colors.status.success,
        },
        // Uses the darker warning step, not status.warning: white on #DC6803
        // is only 3.49:1 and fails AA at this text size. The dark step is 7.52.
        partial: {
          backgroundColor: colors.feedback.warningDark,
        },
        unpaid: {
          backgroundColor: colors.status.error,
        },
        statusText: {
          fontSize: 10,
          fontWeight: '700',
          letterSpacing: 0.6,
          textTransform: 'uppercase',
          fontFamily: Fonts.bold,
          color: colors.text.inverse,
        },
        orderId: {
          fontSize: 18,
          fontWeight: '700',
          letterSpacing: 0.4,
          fontFamily: Fonts.bold,
          color: colors.text.primary,
        },
        dateText: {
          fontSize: 14,
          color: colors.text.secondary,
          fontFamily: Fonts.regular,
        },
        card: {
          backgroundColor: colors.background.card,
          borderRadius: RADIUS.card,
          borderWidth: HAIRLINE,
          borderColor: colors.border,
          padding: 16,
          marginBottom: 16,
        },
        sliderContainer: {
          marginBottom: 16,
          borderRadius: RADIUS.card,
          overflow: 'hidden',
          borderWidth: HAIRLINE,
          borderColor: colors.border,
        },
        sectionTitle: {
          fontSize: 11,
          fontWeight: '700',
          letterSpacing: 0.8,
          textTransform: 'uppercase',
          fontFamily: Fonts.bold,
          color: colors.text.secondary,
          marginBottom: 12,
          paddingBottom: 8,
          borderBottomWidth: HAIRLINE,
          borderBottomColor: colors.border,
        },
        adminActions: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 16,
          marginTop: 16,
        },
        adminButton: {
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 16,
          paddingVertical: 12,
          borderRadius: RADIUS.control,
          backgroundColor: colors.background.card,
          borderWidth: HAIRLINE,
          borderColor: colors.border,
        },
        adminButtonText: {
          marginLeft: 8,
          fontSize: 14,
          fontFamily: Fonts.medium,
        },
        primaryButton: {
          width: '90%',
          alignSelf: 'center',
          backgroundColor: colors.primary.main,
          marginVertical: 16,
          borderRadius: RADIUS.control,
          height: 50,
        },
        buttonContent: {
          justifyContent: 'center',
        },
        buttonText: {
          fontFamily: Fonts.medium,
          color: colors.text.inverse,
          fontSize: 16,
        },
      }),
    [colors],
  );
};
