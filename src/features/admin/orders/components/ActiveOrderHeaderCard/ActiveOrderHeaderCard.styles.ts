import { StyleSheet } from 'react-native';
import { Fonts } from '@src/constants/Fonts';
import { Theme } from '@src/constants/Theme';

export const styles = StyleSheet.create({
  card: {
    marginHorizontal: 12,
    marginBottom: 12,
    padding: 16,
    borderRadius: 16,
    backgroundColor: Theme.colors.background.card,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  clientSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  avatarDelivered: {
    backgroundColor: '#E8F5E9',
  },
  avatarDefault: {
    backgroundColor: '#E3F2FD',
  },
  avatarText: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: Fonts.bold,
  },
  avatarTextDelivered: {
    color: '#4CAF50',
  },
  avatarTextDefault: {
    color: '#1976D2',
  },
  clientNameWrapper: {
    flex: 1,
  },
  clientName: {
    fontSize: 16,
    fontWeight: '600',
    color: Theme.colors.text.primary,
    fontFamily: Fonts.semiBold,
  },
  clientPhone: {
    fontSize: 12,
    color: Theme.colors.text.secondary,
    fontFamily: Fonts.regular,
    marginTop: 1,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Theme.colors.border,
  },
  chipStatus: {
    backgroundColor: Theme.colors.status.warning + '12',
  },
  chipStatusDelivered: {
    backgroundColor: '#E8F5E9',
  },
  chipStatusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  chipStatusTextDelivered: {
    color: '#2E7D32',
  },
  chipStatusTextDefault: {
    color: '#E65100',
  },
  shippingModeChip: {
    backgroundColor: '#E0F2F1',
  },
  shippingModeChipAir: {
    backgroundColor: '#E3F2FD',
  },
  shippingModeChipText: {
    fontSize: 11,
    fontWeight: '600',
  },
  shippingModeChipTextSea: {
    color: '#00796B',
  },
  shippingModeChipTextAir: {
    color: '#1976D2',
  },
  priceColumn: {
    alignItems: 'flex-end',
  },
  priceLabel: {
    fontSize: 10,
    color: Theme.colors.text.secondary,
    fontFamily: Fonts.medium,
  },
  priceValue: {
    fontSize: 17,
    fontWeight: '700',
    color: Theme.colors.text.primary,
    fontFamily: Fonts.bold,
  },
});
