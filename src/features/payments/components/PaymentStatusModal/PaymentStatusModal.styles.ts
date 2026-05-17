import { StyleSheet } from 'react-native';
import { useMemo } from 'react';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';

export const usePaymentStatusModalStyles = () => {
  const { colors } = useAppTheme();

  return useMemo(
    () =>
      StyleSheet.create({
        overlay: {
          flex: 1,
          backgroundColor: colors.background.overlay,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 20,
        },
        container: {
          backgroundColor: colors.background.default,
          borderRadius: 24,
          width: '100%',
          maxWidth: 400,
          maxHeight: '80%',
          overflow: 'hidden',
        },
        content: {
          padding: 24,
          alignItems: 'center',
        },
        spinner: {
          width: 80,
          height: 80,
          borderRadius: 40,
          borderWidth: 4,
          borderStyle: 'dashed',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 24,
        },
        qrContainer: {
          width: 200,
          height: 200,
          borderRadius: 16,
          overflow: 'hidden',
          marginBottom: 24,
          position: 'relative',
        },
        qrImage: {
          width: '100%',
          height: '100%',
        },
        scanOverlay: {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          justifyContent: 'center',
        },
        scanLine: {
          width: '100%',
          height: 2,
          opacity: 0.8,
        },
        processingTitle: {
          fontSize: 20,
          fontFamily: Fonts.bold,
          color: colors.text.primary,
          marginBottom: 8,
        },
        processingMessage: {
          fontSize: 14,
          fontFamily: Fonts.regular,
          color: colors.text.secondary,
          textAlign: 'center',
        },
        instructionsContainer: {
          width: '100%',
          marginTop: 20,
          paddingHorizontal: 8,
        },
        instructionRow: {
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 12,
        },
        instructionDot: {
          width: 24,
          height: 24,
          borderRadius: 12,
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: 12,
        },
        instructionNumber: {
          fontSize: 12,
          fontFamily: Fonts.bold,
          color: colors.text.inverse,
        },
        instructionText: {
          flex: 1,
          fontSize: 13,
          fontFamily: Fonts.regular,
          color: colors.text.primary,
        },
        processingNote: {
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 20,
          padding: 12,
          backgroundColor: colors.neutral[200] + '30',
          borderRadius: 8,
        },
        processingNoteText: {
          marginLeft: 8,
          fontSize: 12,
          fontFamily: Fonts.medium,
          color: colors.text.secondary,
        },
        successIcon: {
          width: 100,
          height: 100,
          borderRadius: 50,
          backgroundColor: colors.status.success + '15',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 20,
        },
        successTitle: {
          fontSize: 22,
          fontFamily: Fonts.bold,
          color: colors.status.success,
          marginBottom: 8,
        },
        successMessage: {
          fontSize: 14,
          fontFamily: Fonts.regular,
          color: colors.text.secondary,
          textAlign: 'center',
          marginBottom: 20,
        },
        successDetails: {
          width: '100%',
          marginBottom: 24,
        },
        detailRow: {
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 10,
        },
        detailText: {
          marginLeft: 10,
          fontSize: 13,
          fontFamily: Fonts.regular,
          color: colors.text.secondary,
        },
        completeButton: {
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: colors.status.success,
          borderRadius: 12,
          paddingVertical: 14,
          paddingHorizontal: 32,
          gap: 8,
        },
        completeButtonText: {
          fontSize: 16,
          fontFamily: Fonts.bold,
          color: colors.text.inverse,
        },
        errorIcon: {
          width: 100,
          height: 100,
          borderRadius: 50,
          backgroundColor: colors.status.error + '15',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 20,
        },
        errorTitle: {
          fontSize: 22,
          fontFamily: Fonts.bold,
          color: colors.status.error,
          marginBottom: 8,
        },
        errorMessage: {
          fontSize: 14,
          fontFamily: Fonts.regular,
          color: colors.text.secondary,
          textAlign: 'center',
          marginBottom: 24,
        },
        errorActions: {
          flexDirection: 'row',
          gap: 12,
          marginBottom: 20,
        },
        retryButton: {
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: colors.primary.main + '10',
          borderRadius: 12,
          paddingVertical: 12,
          paddingHorizontal: 24,
          gap: 8,
        },
        retryButtonText: {
          fontSize: 14,
          fontFamily: Fonts.bold,
          color: colors.primary.main,
        },
        closeButton: {
          borderRadius: 12,
          paddingVertical: 12,
          paddingHorizontal: 24,
        },
        closeButtonText: {
          fontSize: 14,
          fontFamily: Fonts.medium,
          color: colors.text.secondary,
        },
        supportNote: {
          flexDirection: 'row',
          alignItems: 'center',
        },
        supportText: {
          marginLeft: 8,
          fontSize: 12,
          fontFamily: Fonts.regular,
          color: colors.text.secondary,
        },
      }),
    [colors],
  );
};
