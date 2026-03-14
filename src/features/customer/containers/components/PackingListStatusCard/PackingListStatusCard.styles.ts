import { StyleSheet } from 'react-native';
import { Fonts } from '@src/constants/Fonts';

export const styles = StyleSheet.create({
  statusCard: {
    marginBottom: 16,
    elevation: 1,
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusTitle: {
    fontFamily: Fonts.meduim,
    fontSize: 14,
    marginLeft: 8,
  },
  statusValue: {
    fontFamily: Fonts.bold,
    fontSize: 18,
  },
  estimatedText: {
    fontFamily: Fonts.regular,
    fontSize: 13,
    marginTop: 4,
    opacity: 0.9,
  },
});
