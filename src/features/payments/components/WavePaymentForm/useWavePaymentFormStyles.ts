import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';

export const useWavePaymentFormStyles = () => {
  const { colors } = useAppTheme();

  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          padding: 16,
        },
        title: {
          fontSize: 20,
          fontFamily: Fonts.bold,
          color: colors.text.primary,
          marginBottom: 20,
        },
        qrSection: {
          backgroundColor: colors.background.default,
          borderRadius: 16,
          padding: 16,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.05,
          shadowRadius: 8,
          elevation: 2,
        },
        qrToggle: {
          flexDirection: 'row',
          backgroundColor: colors.neutral[200] + '30',
          borderRadius: 12,
          padding: 4,
          marginBottom: 16,
        },
        toggleButton: {
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: 10,
          borderRadius: 8,
          gap: 6,
        },
        toggleButtonActive: {
          backgroundColor: colors.primary.main,
        },
        toggleText: {
          fontSize: 14,
          fontFamily: Fonts.medium,
          color: colors.text.secondary,
        },
        toggleTextActive: {
          color: colors.text.inverse,
        },
        qrContainer: {
          alignItems: 'center',
        },
        qrImage: {
          width: 220,
          height: 220,
          borderRadius: 12,
          backgroundColor: colors.background.default,
        },
        qrPlaceholder: {
          width: 220,
          height: 220,
          borderRadius: 12,
          backgroundColor: colors.neutral[200] + '30',
          justifyContent: 'center',
          alignItems: 'center',
        },
        qrPlaceholderText: {
          marginTop: 12,
          fontSize: 14,
          fontFamily: Fonts.regular,
          color: colors.text.secondary,
        },
        qrInstructions: {
          marginTop: 16,
          fontSize: 14,
          fontFamily: Fonts.medium,
          color: colors.text.secondary,
          textAlign: 'center',
        },
        appLinkContainer: {
          alignItems: 'center',
          paddingVertical: 20,
        },
        waveIconContainer: {
          width: 80,
          height: 80,
          borderRadius: 40,
          backgroundColor: colors.primary.main + '10',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 16,
        },
        appLinkTitle: {
          fontSize: 18,
          fontFamily: Fonts.bold,
          color: colors.text.primary,
          marginBottom: 8,
        },
        appLinkDescription: {
          fontSize: 14,
          fontFamily: Fonts.regular,
          color: colors.text.secondary,
          textAlign: 'center',
          marginBottom: 20,
          paddingHorizontal: 20,
        },
        openAppButton: {
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: colors.primary.main,
          borderRadius: 12,
          paddingVertical: 14,
          paddingHorizontal: 24,
          gap: 8,
        },
        openAppButtonDisabled: {
          opacity: 0.6,
        },
        openAppButtonText: {
          fontSize: 16,
          fontFamily: Fonts.bold,
          color: colors.text.inverse,
        },
        divider: {
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 24,
        },
        dividerLine: {
          flex: 1,
          height: 1,
          backgroundColor: colors.neutral[200],
        },
        dividerText: {
          marginHorizontal: 12,
          fontSize: 12,
          fontFamily: Fonts.medium,
          color: colors.text.secondary,
        },
        manualEntry: {
          backgroundColor: colors.background.default,
          borderRadius: 16,
          padding: 16,
        },
        manualEntryTitle: {
          fontSize: 16,
          fontFamily: Fonts.bold,
          color: colors.text.primary,
          marginBottom: 4,
        },
        manualEntryDescription: {
          fontSize: 13,
          fontFamily: Fonts.regular,
          color: colors.text.secondary,
          marginBottom: 12,
        },
        phoneInputContainer: {
          flexDirection: 'row',
          alignItems: 'center',
        },
        countryCodeBadge: {
          backgroundColor: colors.primary.main + '10',
          borderRadius: 8,
          paddingHorizontal: 12,
          paddingVertical: 14,
          marginRight: 8,
        },
        countryCodeText: {
          fontSize: 14,
          fontFamily: Fonts.bold,
          color: colors.primary.main,
        },
        phoneButton: {
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: colors.neutral[200] + '30',
          borderRadius: 8,
          paddingHorizontal: 12,
          paddingVertical: 14,
        },
        phoneButtonDisabled: {
          opacity: 0.6,
        },
        phoneButtonText: {
          fontSize: 14,
          fontFamily: Fonts.medium,
          color: colors.text.primary,
        },
        instructions: {
          marginTop: 24,
        },
        instructionHeader: {
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 12,
        },
        instructionTitle: {
          marginLeft: 8,
          fontSize: 16,
          fontFamily: Fonts.bold,
          color: colors.text.primary,
        },
        instructionItem: {
          flexDirection: 'row',
          alignItems: 'flex-start',
          marginBottom: 10,
        },
        instructionIcon: {
          width: 28,
          height: 28,
          borderRadius: 14,
          backgroundColor: colors.primary.main + '10',
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: 10,
        },
        instructionText: {
          flex: 1,
          fontSize: 13,
          fontFamily: Fonts.regular,
          color: colors.text.secondary,
          lineHeight: 18,
        },
        securityNote: {
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: colors.status.success + '08',
          borderRadius: 12,
          padding: 12,
          marginTop: 20,
        },
        securityText: {
          flex: 1,
          marginLeft: 8,
          fontSize: 12,
          fontFamily: Fonts.regular,
          color: colors.status.success,
        },
        processingOverlay: {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(255,255,255,0.9)',
          justifyContent: 'center',
          alignItems: 'center',
        },
        processingText: {
          marginTop: 12,
          fontSize: 14,
          fontFamily: Fonts.medium,
          color: colors.primary.main,
        },
      }),
    [colors]
  );
};
