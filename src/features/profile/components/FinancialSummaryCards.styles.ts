import { StyleSheet } from 'react-native';
import { Fonts } from '@src/constants/Fonts';
import type { ThemeContextType } from '@src/constants/Theme';

type AppColors = ThemeContextType['colors'];

export const createStyles = (colors: AppColors) => StyleSheet.create({
  card: {
    borderRadius: 18,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 8,
    borderWidth: 1,
  },
  title: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    marginBottom: 14,
  },
  metricsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  metricCard: {
    flex: 1,
    alignItems: 'center',
    minHeight: 102,
    paddingVertical: 12,
    paddingHorizontal: 6,
    borderRadius: 12,
    backgroundColor: colors.background.paper,
  },
  metricIconBox: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 7,
    backgroundColor: colors.primary[50],
  },
  metricValue: {
    fontFamily: Fonts.bold,
    fontSize: 13,
    textAlign: 'center',
  },
  metricLabel: {
    fontFamily: Fonts.regular,
    fontSize: 11,
    marginTop: 2,
  },
  healthContainer: {
    marginTop: 16,
    gap: 6,
  },
  healthHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  healthLabel: {
    fontFamily: Fonts.meduim,
    fontSize: 12,
  },
  healthValue: {
    fontFamily: Fonts.bold,
    fontSize: 13,
  },
  track: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 4,
  },
  emptyState: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontFamily: Fonts.regular,
    fontSize: 13,
  },
});
