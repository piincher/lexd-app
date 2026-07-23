import { StyleSheet } from 'react-native';
import { Fonts } from '@src/constants/Fonts';
import { RADIUS } from '@src/shared/ui/designLanguage';

export const styles = StyleSheet.create({
  card: {
    borderRadius: RADIUS.card,
    padding: 16,
    marginBottom: 16,
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
  notesText: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    lineHeight: 20,
  },
});
