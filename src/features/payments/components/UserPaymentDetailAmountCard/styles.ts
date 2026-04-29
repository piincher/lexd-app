import { StyleSheet } from 'react-native';
import { Fonts } from '@src/constants/Fonts';

export const styles = StyleSheet.create({
  heroCard: {
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
    alignItems: 'center',
    elevation: 3,
  },
  methodIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  amountText: {
    fontSize: 28,
    fontFamily: Fonts.bold,
    marginBottom: 10,
  },
  statusChip: {
    marginBottom: 8,
    height: 30,
  },
  methodText: {
    fontSize: 14,
    fontFamily: Fonts.medium,
    marginTop: 4,
  },
  dateText: {
    fontSize: 13,
    fontFamily: Fonts.regular,
    marginTop: 4,
  },
});
