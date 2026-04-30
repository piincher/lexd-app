import { StyleSheet } from 'react-native';
import { useMemo } from 'react';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';

export const useOrangeMoneyFormStyles = () => {
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
        inputContainer: {
          marginBottom: 20,
        },
        label: {
          fontSize: 14,
          fontFamily: Fonts.medium,
          color: colors.text.primary,
          marginBottom: 8,
        },
        inputWrapper: {
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: colors.background.default,
          borderRadius: 12,
          borderWidth: 2,
          borderColor: colors.neutral[200],
          overflow: 'hidden',
        },
        inputWrapperFocused: {
          borderColor: colors.primary.main,
        },
        inputWrapperError: {
          borderColor: colors.status.error,
        },
        inputWrapperDisabled: {
          backgroundColor: colors.neutral[200] + '50',
        },
        countryCode: {
          paddingHorizontal: 16,
          paddingVertical: 14,
          backgroundColor: colors.neutral[200] + '30',
          borderRightWidth: 1,
          borderRightColor: colors.neutral[200],
        },
        countryCodeText: {
          fontSize: 16,
          fontFamily: Fonts.bold,
          color: colors.text.primary,
        },
        input: {
          flex: 1,
          paddingHorizontal: 16,
          paddingVertical: 14,
          fontSize: 18,
          fontFamily: Fonts.medium,
          color: colors.text.primary,
        },
        validIcon: {
          marginRight: 12,
        },
        errorContainer: {
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 8,
        },
        errorText: {
          marginLeft: 6,
          fontSize: 12,
          fontFamily: Fonts.regular,
          color: colors.status.error,
        },
        helperText: {
          marginTop: 8,
          fontSize: 12,
          fontFamily: Fonts.regular,
          color: colors.text.secondary,
        },
        instructionsHeader: {
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 12,
          marginBottom: 0,
        },
        instructionsTitle: {
          flex: 1,
          marginLeft: 8,
          fontSize: 16,
          fontFamily: Fonts.medium,
          color: colors.text.primary,
        },
        instructionsContent: {
          backgroundColor: colors.background.default,
          borderRadius: 12,
          padding: 16,
          marginBottom: 20,
        },
        stepContainer: {
          flexDirection: 'row',
          alignItems: 'flex-start',
          marginBottom: 12,
        },
        stepNumber: {
          width: 24,
          height: 24,
          borderRadius: 12,
          backgroundColor: colors.primary.main,
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: 12,
        },
        stepNumberText: {
          fontSize: 12,
          fontFamily: Fonts.bold,
          color: colors.text.inverse,
        },
        stepText: {
          flex: 1,
          fontSize: 14,
          fontFamily: Fonts.regular,
          color: colors.text.primary,
          lineHeight: 20,
        },
        noteContainer: {
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: colors.status.success + '10',
          borderRadius: 8,
          padding: 12,
          marginTop: 8,
        },
        noteText: {
          flex: 1,
          marginLeft: 8,
          fontSize: 12,
          fontFamily: Fonts.regular,
          color: colors.status.success,
        },
        supportedContainer: {
          marginTop: 8,
        },
        supportedTitle: {
          fontSize: 14,
          fontFamily: Fonts.medium,
          color: colors.text.secondary,
          marginBottom: 12,
        },
        countryTags: {
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 8,
        },
        countryTag: {
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: colors.neutral[200] + '30',
          borderRadius: 16,
          paddingHorizontal: 12,
          paddingVertical: 6,
        },
        countryTagCode: {
          fontSize: 12,
          fontFamily: Fonts.bold,
          color: colors.primary.main,
          marginRight: 4,
        },
        countryTagName: {
          fontSize: 12,
          fontFamily: Fonts.regular,
          color: colors.text.secondary,
        },
        processingContainer: {
          alignItems: 'center',
          padding: 24,
          backgroundColor: colors.primary.main + '08',
          borderRadius: 12,
          marginTop: 16,
        },
        processingText: {
          marginTop: 12,
          fontSize: 14,
          fontFamily: Fonts.medium,
          color: colors.primary.main,
          textAlign: 'center',
        },
      }),
    [colors],
  );
};
