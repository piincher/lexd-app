import { StyleSheet } from 'react-native';
import { Fonts } from '@src/constants/Fonts';

export const createStyles = (colors: any, isDark: boolean) => StyleSheet.create({
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
    color: colors.text.secondary,
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
    color: colors.status.success,
    marginBottom: 2,
  },
  infoValue: {
    fontFamily: Fonts.meduim,
    fontSize: 15,
    color: colors.text.secondary,
    lineHeight: 20,
  },
  consigneeActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    borderColor: colors.border,
  },
});
