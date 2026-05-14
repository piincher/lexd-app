import { StyleSheet } from 'react-native';

export const createStyles = (colors: any) => StyleSheet.create({
  container: {
    borderRadius: 16,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text.primary,
  },
  summaryContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  summaryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.neutral[100],
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  summaryValue: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text.secondary,
  },
  tabsContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: colors.neutral[100],
  },
  tabText: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.text.secondary,
  },
  content: {
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text.secondary,
    marginBottom: 12,
  },
  stackedBarContainer: {
    marginVertical: 12,
  },
  legendGrid: {
    gap: 10,
    marginTop: 8,
  },
  legendItem: {
    backgroundColor: colors.neutral[50],
    padding: 10,
    borderRadius: 8,
  },
  legendHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.text.secondary,
    flex: 1,
  },
  legendValue: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.text.primary,
  },
  legendDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
    paddingLeft: 18,
  },
  legendDetail: {
    fontSize: 11,
    color: colors.text.secondary,
  },
  shippingItem: {
    marginBottom: 14,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[100],
  },
  shippingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  shippingIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shippingInfo: {
    flex: 1,
  },
  shippingLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text.primary,
  },
  shippingCount: {
    fontSize: 11,
    color: colors.text.secondary,
  },
  shippingValue: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.text.primary,
  },
  shippingBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 8,
    paddingLeft: 42,
  },
  shippingBarBackground: {
    flex: 1,
    height: 6,
    backgroundColor: colors.neutral[200],
    borderRadius: 3,
    overflow: 'hidden',
  },
  shippingBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  shippingCBM: {
    fontSize: 11,
    color: colors.text.secondary,
    minWidth: 60,
    textAlign: 'right',
  },
  trendSummary: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.neutral[100],
  },
  trendItem: {
    alignItems: 'center',
  },
  trendLabel: {
    fontSize: 11,
    color: colors.text.secondary,
  },
  trendValue: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text.primary,
    marginTop: 2,
  },
  noData: {
    textAlign: 'center',
    color: colors.text.secondary,
    paddingVertical: 20,
  },
});
