import { StyleSheet } from 'react-native';
import { useMemo } from 'react';
import { Fonts } from '@src/constants/Fonts';
import { useAppTheme } from '@src/providers/ThemeProvider';

export const useGoodsFormStyles = () => {
  const { colors } = useAppTheme();

  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          gap: 12,
        },
        card: {
          borderRadius: 12,
          elevation: 1,
          backgroundColor: colors.background.card,
        },
        sectionHeader: {
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 12,
          gap: 8,
        },
        sectionTitle: {
          fontFamily: Fonts.bold,
          fontSize: 15,
          color: colors.text.primary,
          flex: 1,
        },
        row: {
          flexDirection: 'row',
          gap: 12,
        },
        input: {
          backgroundColor: 'transparent',
        },
        halfInput: {
          flex: 1,
        },
        thirdInput: {
          flex: 1,
        },
        textArea: {
          backgroundColor: 'transparent',
          minHeight: 80,
        },
        inputOutline: {
          borderRadius: 8,
        },
        shippingRow: {
          flexDirection: 'row',
          gap: 12,
        },
        shippingOption: {
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          paddingVertical: 14,
          borderRadius: 10,
          backgroundColor: colors.background.paper,
          borderWidth: 1.5,
          borderColor: colors.border,
        },
        shippingOptionActive: {
          backgroundColor: colors.primary.main,
          borderColor: colors.primary.main,
        },
        shippingText: {
          fontFamily: Fonts.bold,
          fontSize: 14,
          color: colors.text.secondary,
        },
        shippingTextActive: {
          color: colors.text.inverse,
        },
        switchRow: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 6,
        },
        switchLabel: {
          fontFamily: Fonts.meduim,
          fontSize: 12,
          color: colors.text.secondary,
        },
        cbmBadge: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 6,
          marginTop: 8,
          paddingHorizontal: 12,
          paddingVertical: 6,
          backgroundColor: colors.background.paper,
          borderRadius: 8,
          alignSelf: 'flex-start',
        },
        cbmText: {
          fontFamily: Fonts.bold,
          fontSize: 13,
          color: colors.primary.main,
        },
        totalCostRow: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 10,
          paddingHorizontal: 12,
          paddingVertical: 8,
          backgroundColor: colors.background.paper,
          borderRadius: 8,
        },
        totalCostLabel: {
          fontFamily: Fonts.meduim,
          fontSize: 13,
          color: colors.text.secondary,
        },
        totalCostValue: {
          fontFamily: Fonts.bold,
          fontSize: 14,
          color: colors.primary.main,
        },
      }),
    [colors],
  );
};
