import { StyleSheet } from 'react-native';
import { Fonts } from '@src/constants/Fonts';

export const createStyles = (colors: any, isDark: boolean) => StyleSheet.create({
  pickupSectionCard: {
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
  },
  pickupGradient: {
    padding: 4,
  },
  pickupSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  pickupSectionTitle: {
    fontFamily: Fonts.bold,
    fontSize: 14,
    color: colors.text.inverse,
    marginLeft: 8,
    letterSpacing: 0.5,
  },
  warehouseMainName: {
    fontFamily: Fonts.bold,
    fontSize: 18,
    color: colors.text.inverse,
  },
  warehouseMainAddress: {
    fontFamily: Fonts.meduim,
    fontSize: 14,
    color: colors.text.inverse,
    marginTop: 2,
  },
  pickupDivider: {
    backgroundColor: `${colors.text.inverse}30`,
    marginVertical: 12,
  },
  consigneeSectionLabel: {
    fontFamily: Fonts.meduim,
    fontSize: 13,
    color: colors.text.inverse,
    marginBottom: 8,
  },
  consigneeInfoCard: {
    backgroundColor: colors.background.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  consigneeInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  consigneeInfoName: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: colors.text.secondary,
    marginLeft: 12,
  },
  consigneeInfoPhone: {
    fontFamily: Fonts.meduim,
    fontSize: 15,
    color: colors.primary.main,
    marginLeft: 12,
  },
  consigneeInfoAddress: {
    fontFamily: Fonts.regular,
    fontSize: 13,
    color: colors.text.secondary,
    marginLeft: 12,
    flex: 1,
  },
  requiredDocs: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  requiredDocsText: {
    fontFamily: Fonts.meduim,
    fontSize: 12,
    color: colors.text.inverse,
    marginLeft: 8,
    flex: 1,
  },
});
