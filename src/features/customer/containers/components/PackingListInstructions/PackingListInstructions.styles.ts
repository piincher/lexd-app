import { StyleSheet } from 'react-native';
import { Fonts } from '@src/constants/Fonts';
import { COLORS } from '@src/constants/Colors';

export const styles = StyleSheet.create({
  instructionsCard: {
    marginBottom: 16,
    backgroundColor: '#FFFBEB',
    borderColor: '#FDE68A',
    borderWidth: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: COLORS.orange,
    marginLeft: 12,
  },
  sectionDivider: {
    marginBottom: 12,
  },
  instructionsText: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: COLORS.DarkGrey,
    lineHeight: 20,
  },
});
