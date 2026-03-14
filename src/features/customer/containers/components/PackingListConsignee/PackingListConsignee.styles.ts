import { StyleSheet } from 'react-native';
import { Fonts } from '@src/constants/Fonts';
import { COLORS } from '@src/constants/Colors';

export const styles = StyleSheet.create({
  sectionCard: {
    marginBottom: 16,
    elevation: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: COLORS.DarkGrey,
    marginLeft: 12,
  },
  sectionDivider: {
    marginBottom: 16,
  },
  consigneeInfo: {
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  infoContent: {
    marginLeft: 12,
    flex: 1,
  },
  infoLabel: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: COLORS.SlateGray,
    marginBottom: 2,
  },
  infoValue: {
    fontFamily: Fonts.meduim,
    fontSize: 15,
    color: COLORS.DarkGrey,
    lineHeight: 20,
  },
  consigneeActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    borderColor: '#DDD',
  },
});
