import { StyleSheet } from 'react-native';
import { Fonts } from '@src/constants/Fonts';
import { HAIRLINE, RADIUS } from '@src/shared/ui/designLanguage';

export const styles = StyleSheet.create({
  paymentCard: {
    borderRadius: RADIUS.card,
    padding: 16,
    marginBottom: 12,
  },
  paymentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  providerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  providerIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  providerName: {
    fontSize: 14,
    fontFamily: Fonts.bold,
  },
  paymentDate: {
    fontSize: 12,
    fontFamily: Fonts.regular,
    marginTop: 2,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: RADIUS.badge,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    fontFamily: Fonts.medium,
  },
  paymentBody: {
    paddingTop: 12,
    borderTopWidth: HAIRLINE,
  },
  amountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  amountLabel: {
    fontSize: 12,
    fontFamily: Fonts.regular,
  },
  amount: {
    fontSize: 16,
    fontFamily: Fonts.bold,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  detailText: {
    marginLeft: 6,
    fontSize: 12,
    fontFamily: Fonts.regular,
  },
  paymentFooter: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: HAIRLINE,
  },
  receiptButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  receiptText: {
    marginLeft: 6,
    fontSize: 13,
    fontFamily: Fonts.medium,
  },
});
