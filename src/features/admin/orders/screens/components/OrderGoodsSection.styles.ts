/* Hallmark · pre-emit critique: P5 H4 E4 S5 R4 V4 · genre: modern-minimal · macrostructure: Workbench Detail · design-system: app theme · designed-as-app */
import { StyleSheet } from 'react-native';
import { Fonts } from '@src/constants/Fonts';
import type { lightTheme } from '@src/constants/Theme';

type AppColors = typeof lightTheme.colors;

export const createStyles = (colors: AppColors, isDark: boolean) => StyleSheet.create({
  container: {
    marginHorizontal: 12,
    marginTop: 8,
    padding: 12,
    borderRadius: 8,
    backgroundColor: colors.background.card,
    borderWidth: 1,
    borderColor: colors.border,
    elevation: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    color: colors.text.primary,
  },
  subtitle: {
    marginTop: 2,
    fontSize: 12,
    fontFamily: Fonts.regular,
    color: colors.text.secondary,
  },
  countBadge: {
    minHeight: 28,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    backgroundColor: colors.background.paper,
    color: colors.text.secondary,
    fontSize: 11,
    fontFamily: Fonts.semiBold,
    overflow: 'hidden',
  },
  totalsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 10,
  },
  totalCell: {
    flex: 1,
    padding: 8,
    borderRadius: 6,
    backgroundColor: colors.background.paper,
  },
  totalLabel: {
    fontSize: 10,
    fontFamily: Fonts.medium,
    color: colors.text.secondary,
  },
  totalValue: {
    marginTop: 2,
    fontSize: 12,
    fontFamily: Fonts.semiBold,
    color: colors.text.primary,
  },
  item: {
    minHeight: 84,
    flexDirection: 'row',
    gap: 10,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  thumb: {
    width: 52,
    height: 52,
    borderRadius: 6,
    backgroundColor: colors.background.paper,
  },
  thumbPlaceholder: {
    width: 52,
    height: 52,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background.paper,
  },
  itemBody: {
    flex: 1,
    minWidth: 0,
  },
  itemTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  goodsCode: {
    flex: 1,
    fontSize: 14,
    fontFamily: Fonts.semiBold,
    color: colors.text.primary,
  },
  description: {
    marginTop: 3,
    fontSize: 12,
    fontFamily: Fonts.regular,
    color: colors.text.secondary,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 8,
  },
  metaPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: colors.background.paper,
  },
  metaText: {
    fontSize: 10,
    fontFamily: Fonts.medium,
    color: colors.text.secondary,
  },
  statusPill: {
    minHeight: 24,
    paddingHorizontal: 7,
    justifyContent: 'center',
    borderRadius: 6,
  },
  statusText: {
    fontSize: 10,
    fontFamily: Fonts.semiBold,
  },
});

export default createStyles;
