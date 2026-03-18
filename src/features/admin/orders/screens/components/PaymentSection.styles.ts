import { StyleSheet } from 'react-native';
import { COLORS } from '@src/constants/Colors';
import { Fonts } from '@src/constants/Fonts';

export const styles = StyleSheet.create({
  container: {
    marginHorizontal: 12,
    marginBottom: 12,
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#FFF',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A2E',
    fontFamily: Fonts.semiBold,
  },
  statusCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  statusIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
    elevation: 2,
  },
  statusContent: {
    flex: 1,
  },
  statusLabel: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: Fonts.semiBold,
    marginBottom: 4,
  },
  statusAmount: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A2E',
    fontFamily: Fonts.bold,
  },
  breakdown: {
    backgroundColor: '#F8F9FA',
    borderRadius: 10,
    padding: 14,
    marginBottom: 16,
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },
  breakdownLabel: {
    fontSize: 13,
    color: COLORS.grey,
    fontFamily: Fonts.medium,
  },
  breakdownValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A2E',
    fontFamily: Fonts.semiBold,
  },
  actions: {
    gap: 10,
  },
  payButton: {
    borderRadius: 10,
    paddingVertical: 6,
  },
  historyButton: {
    borderRadius: 10,
    borderColor: COLORS.blue,
    paddingVertical: 6,
  },
  buttonLabel: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: Fonts.semiBold,
  },
  adminNote: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
    marginTop: 14,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  adminNoteText: {
    flex: 1,
    fontSize: 11,
    color: COLORS.grey,
    fontFamily: Fonts.regular,
    lineHeight: 16,
  },
});

export default styles;
