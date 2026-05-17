import { StyleSheet } from 'react-native';
import { Fonts } from '@src/constants/Fonts';

export const createStyles = (colors: any, isDark: boolean) => StyleSheet.create({
  // Banner styles
  routeBannerCard: {
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
  },
  routeBannerGradient: {
    padding: 4,
  },
  routeBannerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  routeBannerTitle: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: colors.primary.main,
    marginLeft: 8,
  },
  routeBannerFlow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  routeBannerItem: {
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  routeBannerHighlight: {
    backgroundColor: colors.feedback.successBg,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  routeBannerLabel: {
    fontFamily: Fonts.regular,
    fontSize: 11,
    color: colors.text.secondary,
    marginTop: 4,
  },
  routeBannerValue: {
    fontFamily: Fonts.bold,
    fontSize: 14,
    color: colors.status.success,
    marginTop: 2,
  },
  routeBannerSubtext: {
    fontFamily: Fonts.regular,
    fontSize: 10,
    color: colors.text.secondary,
  },
  routeBannerArrow: {
    paddingHorizontal: 4,
  },
  // Detailed route styles
  sectionCard: {
    marginBottom: 16,
    elevation: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: colors.text.secondary,
    marginLeft: 12,
  },
  sectionDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginBottom: 16,
  },
  routeContainer: {
    paddingHorizontal: 8,
  },
  routePoint: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  routeDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
  },
  routeContent: {
    marginLeft: 16,
  },
  routeLabel: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: colors.status.success,
  },
  routeValue: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: colors.text.secondary,
  },
  routeLine: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 6,
    marginVertical: 8,
  },
  routeLineBar: {
    width: 2,
    height: 30,
    backgroundColor: colors.neutral[200],
  },
  routeTransitInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },
  transitDays: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: colors.text.secondary,
    marginLeft: 8,
  },
});
