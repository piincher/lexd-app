import { StyleSheet } from 'react-native';
import { Fonts } from '@src/constants/Fonts';

export const createPaymentFormStyles = (colors: any) => StyleSheet.create({
  formCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: Fonts.semiBold,
    marginBottom: 16,
    color: colors.text.primary,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: Fonts.medium,
    marginBottom: 8,
    color: colors.text.primary,
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioIcon: {
    marginLeft: 8,
  },
  radioButton: {
    flex: 1,
  },
});
