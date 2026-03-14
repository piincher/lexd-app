import { StyleSheet } from 'react-native';
import { Fonts } from '@src/constants/Fonts';
import { COLORS } from '@src/constants/Colors';

export const styles = StyleSheet.create({
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
    color: '#0369A1',
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
    backgroundColor: '#D1FAE5',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  routeBannerLabel: {
    fontFamily: Fonts.regular,
    fontSize: 11,
    color: '#64748B',
    marginTop: 4,
  },
  routeBannerValue: {
    fontFamily: Fonts.bold,
    fontSize: 14,
    color: '#059669',
    marginTop: 2,
  },
  routeBannerSubtext: {
    fontFamily: Fonts.regular,
    fontSize: 10,
    color: '#64748B',
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
    color: COLORS.DarkGrey,
    marginLeft: 12,
  },
  sectionDivider: {
    height: 1,
    backgroundColor: '#E2E8F0',
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
    color: COLORS.SlateGray,
  },
  routeValue: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: COLORS.DarkGrey,
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
    backgroundColor: COLORS.Silver,
  },
  routeTransitInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },
  transitDays: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: COLORS.DimGray,
    marginLeft: 8,
  },
});
