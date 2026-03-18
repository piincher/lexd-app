import { StyleSheet } from 'react-native';
import { COLORS } from '@src/constants/Colors';
import { Fonts } from '@src/constants/Fonts';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginHorizontal: 12,
    marginVertical: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  statusBar: {
    width: 4,
  },
  content: {
    flex: 1,
    padding: 14,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  clientSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },
  avatar: {
    marginRight: 10,
  },
  avatarLabel: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: Fonts.semiBold,
  },
  clientInfo: {
    flex: 1,
  },
  clientName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1A1A2E',
    fontFamily: Fonts.semiBold,
    marginBottom: 2,
  },
  orderMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderCode: {
    fontSize: 12,
    color: COLORS.grey,
    fontFamily: Fonts.medium,
    letterSpacing: 0.5,
  },
  priorityBadge: {
    backgroundColor: '#FF5722',
    borderRadius: 8,
    padding: 2,
    marginLeft: 6,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 16,
    gap: 4,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
    fontFamily: Fonts.semiBold,
  },
  shippingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 10,
  },
  shippingMode: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    gap: 4,
  },
  shippingText: {
    fontSize: 11,
    fontWeight: '600',
    fontFamily: Fonts.semiBold,
  },
  routeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  routeText: {
    fontSize: 11,
    color: COLORS.grey,
    fontFamily: Fonts.medium,
  },
  detailsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    padding: 10,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailText: {
    fontSize: 12,
    color: '#666',
    fontFamily: Fonts.regular,
  },
  amountText: {
    fontSize: 12,
    fontWeight: '600',
    fontFamily: Fonts.semiBold,
  },
  progressSection: {
    marginTop: 10,
  },
  progressTrack: {
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    marginBottom: 6,
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 10,
    color: COLORS.grey,
    fontFamily: Fonts.medium,
  },
});

export default styles;
