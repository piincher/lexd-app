import { StyleSheet } from 'react-native';
import { Fonts } from '@src/constants/Fonts';
import { RADIUS } from '@src/shared/ui/designLanguage';

export const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    borderRadius: RADIUS.card,
    padding: 18,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 15,
    fontFamily: Fonts.bold,
    fontWeight: '700',
  },
  headerSubtitle: {
    fontSize: 11,
    fontFamily: Fonts.regular,
    marginTop: 2,
  },
  countBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: RADIUS.badge,
  },
  countText: {
    fontSize: 13,
    fontFamily: Fonts.bold,
    fontWeight: '700',
  },
  orderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    gap: 12,
  },
  shippingIconContainer: {
    width: 36,
    height: 36,
    borderRadius: RADIUS.control,
    justifyContent: 'center',
    alignItems: 'center',
  },
  orderInfo: {
    flex: 1,
  },
  orderTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderCode: {
    fontSize: 13,
    fontFamily: Fonts.bold,
    fontWeight: '700',
  },
  orderAmount: {
    fontSize: 12,
    fontFamily: Fonts.bold,
    fontWeight: '700',
  },
  orderBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 2,
  },
  orderClient: {
    fontSize: 11,
    fontFamily: Fonts.regular,
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: RADIUS.badge,
  },
  statusText: {
    fontSize: 9,
    fontFamily: Fonts.bold,
    fontWeight: '700',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  orderDate: {
    fontSize: 10,
    fontFamily: Fonts.regular,
    marginTop: 2,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 20,
    gap: 6,
  },
  emptyText: {
    fontSize: 12,
    fontFamily: Fonts.regular,
  },
});
