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
  divider: {
    marginBottom: 12,
  },
});
