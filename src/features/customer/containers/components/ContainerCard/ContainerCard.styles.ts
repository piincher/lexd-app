import { StyleSheet } from 'react-native';
import { useMemo } from 'react';
import { Fonts } from '@src/constants/Fonts';
import { useAppTheme } from '@src/providers/ThemeProvider';

const PRIMARY_COLOR = '#16A34A';

export const useContainerCardStyles = () => {
  const { colors, isDark } = useAppTheme();

  return useMemo(
    () =>
      StyleSheet.create({
        card: {
          marginHorizontal: 16,
          marginVertical: 8,
          borderRadius: 12,
          elevation: 2,
          backgroundColor: colors.background.card,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.06,
          shadowRadius: 4,
        },
        content: {
          padding: 16,
        },
        headerRow: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: 16,
        },
        titleSection: {
          flex: 1,
          marginRight: 12,
        },
        containerNumberContainer: {
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 4,
        },
        modeIcon: {
          marginRight: 8,
        },
        containerNumber: {
          fontFamily: Fonts.bold,
          fontSize: 16,
          color: colors.text.primary,
        },
        shippingLine: {
          fontFamily: Fonts.regular,
          fontSize: 12,
          color: colors.text.secondary,
        },
        statusChip: {
          height: 28,
          borderRadius: 6,
        },
        routeRow: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 16,
          paddingHorizontal: 4,
        },
        routeLocation: {
          flex: 1,
        },
        routeLocationRight: {
          alignItems: 'flex-end',
        },
        routeLabel: {
          fontFamily: Fonts.regular,
          fontSize: 11,
          color: colors.text.secondary,
          marginBottom: 4,
          textTransform: 'uppercase',
          letterSpacing: 0.5,
        },
        routeValue: {
          fontFamily: Fonts.bold,
          fontSize: 14,
          color: colors.text.primary,
        },
        routeArrow: {
          alignItems: 'center',
          paddingHorizontal: 16,
          minWidth: 60,
        },
        arrowLine: {
          flexDirection: 'row',
          alignItems: 'center',
        },
        transitDays: {
          fontFamily: Fonts.meduim,
          fontSize: 11,
          color: PRIMARY_COLOR,
          marginTop: 2,
        },
        readyBanner: {
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#F59E0B',
          paddingVertical: 10,
          paddingHorizontal: 12,
          borderRadius: 8,
          marginBottom: 12,
        },
        readyBannerText: {
          fontFamily: Fonts.bold,
          fontSize: 12,
          color: colors.text.inverse,
          marginLeft: 8,
        },
        infoBanner: {
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: isDark ? 'rgba(14, 165, 233, 0.15)' : '#E0F2FE',
          paddingVertical: 8,
          paddingHorizontal: 12,
          borderRadius: 8,
          marginBottom: 12,
        },
        infoBannerText: {
          fontFamily: Fonts.meduim,
          fontSize: 12,
          color: PRIMARY_COLOR,
          marginLeft: 6,
        },
        arrivedBanner: {
          backgroundColor: isDark ? 'rgba(16, 185, 129, 0.15)' : colors.status.success + '18',
        },
        arrivedBannerText: {
          color: colors.status.success,
        },
        footerRow: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: 12,
          borderTopWidth: 1,
          borderTopColor: colors.border,
        },
        footerItem: {
          flexDirection: 'row',
          alignItems: 'center',
        },
        footerText: {
          fontFamily: Fonts.regular,
          fontSize: 12,
          color: colors.text.secondary,
          marginLeft: 6,
        },
        footerTextPrimary: {
          color: PRIMARY_COLOR,
        },
      }),
    [colors, isDark],
  );
};
