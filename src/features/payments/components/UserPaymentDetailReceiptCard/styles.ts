import { StyleSheet } from 'react-native';
import { Fonts } from '@src/constants/Fonts';

export const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 15,
    fontFamily: Fonts.semiBold,
    marginLeft: 8,
  },
  receiptPreview: {
    alignItems: 'center',
    paddingVertical: 20,
    borderRadius: 10,
    marginBottom: 12,
  },
  receiptNumber: {
    fontSize: 14,
    fontFamily: Fonts.bold,
    marginTop: 8,
  },
  receiptLabel: {
    fontSize: 12,
    fontFamily: Fonts.regular,
    marginTop: 4,
  },
  viewReceiptBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    paddingVertical: 12,
    gap: 8,
  },
  viewReceiptText: {
    fontSize: 14,
    fontFamily: Fonts.semiBold,
    color: '#FFFFFF',
  },
  noReceiptContainer: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  noReceiptText: {
    fontSize: 13,
    fontFamily: Fonts.regular,
    marginTop: 8,
  },
});
