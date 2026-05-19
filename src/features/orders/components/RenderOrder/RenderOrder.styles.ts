import { StyleSheet } from 'react-native';
import { useMemo } from 'react';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';

export const useRenderOrderStyles = () => {
  const { colors } = useAppTheme();

  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: colors.background.default,
        },
        headerCard: {
          backgroundColor: colors.background.card,
          borderRadius: 16,
          padding: 16,
          shadowColor: colors.neutral[900],
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 3,
          marginBottom: 16,
        },
        headerContent: {
          flex: 1,
        },
        progressContainer: {
          marginBottom: 16,
        },
        progressTitle: {
          fontSize: 14,
          fontWeight: '600',
          fontFamily: Fonts.medium,
          color: colors.text.primary,
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
          fontSize: 12,
          fontWeight: '500',
          fontFamily: Fonts.regular,
          color: colors.text.secondary,
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
          paddingHorizontal: 12,
          paddingVertical: 6,
          borderRadius: 20,
          marginRight: 12,
          backgroundColor: colors.primary.main,
        },
        paid: {
          backgroundColor: colors.status.success,
        },
        unpaid: {
          backgroundColor: colors.status.error,
        },
        statusText: {
          fontSize: 12,
          fontWeight: '600',
          fontFamily: Fonts.medium,
          color: colors.text.inverse,
        },
        orderId: {
          fontSize: 18,
          fontWeight: '700',
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
          borderRadius: 16,
          padding: 16,
          shadowColor: colors.neutral[900],
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 3,
          marginBottom: 16,
        },
        sliderContainer: {
          marginBottom: 16,
          borderRadius: 16,
          overflow: 'hidden',
          shadowColor: colors.neutral[900],
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 3,
        },
        sectionTitle: {
          fontSize: 16,
          fontWeight: '700',
          fontFamily: Fonts.bold,
          color: colors.text.primary,
          marginBottom: 12,
          paddingBottom: 8,
          borderBottomWidth: 1,
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
          borderRadius: 12,
          backgroundColor: colors.background.card,
          borderWidth: 1,
          borderColor: colors.border,
          shadowColor: colors.neutral[900],
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.05,
          shadowRadius: 4,
          elevation: 2,
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
          borderRadius: 12,
          height: 50,
          shadowColor: colors.neutral[900],
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 8,
          elevation: 4,
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
