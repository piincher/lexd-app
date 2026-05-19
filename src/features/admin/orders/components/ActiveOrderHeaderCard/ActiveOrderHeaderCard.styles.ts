import { StyleSheet } from 'react-native';
import { Fonts } from '@src/constants/Fonts';

export const createStyles = (colors: any, isDark?: boolean) => StyleSheet.create({
  card: {
    marginHorizontal: 12,
    marginBottom: 12,
    padding: 16,
    borderRadius: 16,
    backgroundColor: colors.background.card,
    elevation: 2,
    shadowColor: colors.neutral[900],
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
    backgroundColor: colors.status.success + '15',
  },
  avatarDefault: {
    backgroundColor: colors.status.info + '15',
  },
  avatarText: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: Fonts.bold,
  },
  avatarTextDelivered: {
    color: colors.status.success,
  },
  avatarTextDefault: {
    color: colors.status.info,
  },
  clientNameWrapper: {
    flex: 1,
  },
  clientName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    fontFamily: Fonts.semiBold,
  },
  clientPhone: {
    fontSize: 12,
    color: colors.text.secondary,
    fontFamily: Fonts.regular,
    marginTop: 1,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  chipStatus: {
    backgroundColor: colors.status.warning + '12',
  },
  chipStatusDelivered: {
    backgroundColor: colors.status.success + '15',
  },
  chipStatusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  chipStatusTextDelivered: {
    color: colors.status.success,
  },
  chipStatusTextDefault: {
    color: colors.status.warning,
  },
  shippingModeChip: {
    backgroundColor: colors.status.success + '15',
  },
  shippingModeChipAir: {
    backgroundColor: colors.status.info + '15',
  },
  shippingModeChipText: {
    fontSize: 11,
    fontWeight: '600',
  },
  shippingModeChipTextSea: {
    color: colors.status.success,
  },
  shippingModeChipTextAir: {
    color: colors.status.info,
  },
  priceColumn: {
    alignItems: 'flex-end',
  },
  priceLabel: {
    fontSize: 10,
    color: colors.text.secondary,
    fontFamily: Fonts.medium,
  },
  priceValue: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text.primary,
    fontFamily: Fonts.bold,
  },
});
