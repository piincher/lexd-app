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
  avatarText: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: Fonts.bold,
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
