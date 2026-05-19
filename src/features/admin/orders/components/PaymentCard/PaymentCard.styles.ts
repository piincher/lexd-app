import { StyleSheet } from 'react-native';
import { Fonts } from '@src/constants/Fonts';

export const createPaymentCardStyles = (colors: any, isDark?: boolean) => StyleSheet.create({
  paymentCard: {
    marginBottom: 12,
    padding: 16,
    borderRadius: 12,
    backgroundColor: colors.background.card,
    elevation: 2,
  },
  paymentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  methodContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  methodIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.background.paper,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  methodText: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: Fonts.semiBold,
    color: colors.text.primary,
  },
  dateText: {
    fontSize: 12,
    color: colors.text.secondary,
    fontFamily: Fonts.regular,
    marginTop: 2,
  },
  amountText: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: Fonts.bold,
    color: colors.status.success,
  },
  divider: {
    marginVertical: 12,
  },
  detailsContainer: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailLabel: {
    fontSize: 13,
    color: colors.text.secondary,
    fontFamily: Fonts.medium,
    minWidth: 100,
  },
  detailValue: {
    fontSize: 13,
    fontWeight: '500',
    fontFamily: Fonts.medium,
    color: colors.text.primary,
    flex: 1,
  },
  notesContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
    backgroundColor: colors.accent.goldLight,
    padding: 10,
    borderRadius: 8,
    marginTop: 4,
  },
  notesText: {
    flex: 1,
    fontSize: 13,
    color: colors.text.secondary,
    fontFamily: Fonts.regular,
    lineHeight: 18,
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    borderRadius: 8,
    borderColor: colors.primary.main,
  },
  whatsappButton: {
    flex: 1,
    borderRadius: 8,
  },
  imagesContainer: {
    marginTop: 12,
  },
  imagesLabel: {
    fontSize: 13,
    fontWeight: '500',
    fontFamily: Fonts.medium,
    color: colors.text.primary,
    marginBottom: 8,
  },
  imagesRow: {
    flexDirection: 'row',
    gap: 8,
  },
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
});
