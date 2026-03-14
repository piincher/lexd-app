import { StyleSheet } from 'react-native';
import { Fonts } from '@src/constants/Fonts';
import { COLORS } from '@src/constants/Colors';

export const styles = StyleSheet.create({
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
    color: '#FFF',
    marginLeft: 8,
    letterSpacing: 0.5,
  },
  warehouseMainName: {
    fontFamily: Fonts.bold,
    fontSize: 18,
    color: '#FFF',
  },
  warehouseMainAddress: {
    fontFamily: Fonts.meduim,
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
  },
  pickupDivider: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginVertical: 12,
  },
  consigneeSectionLabel: {
    fontFamily: Fonts.meduim,
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 8,
  },
  consigneeInfoCard: {
    backgroundColor: '#FFF',
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
    color: COLORS.DarkGrey,
    marginLeft: 12,
  },
  consigneeInfoPhone: {
    fontFamily: Fonts.meduim,
    fontSize: 15,
    color: '#7C3AED',
    marginLeft: 12,
  },
  consigneeInfoAddress: {
    fontFamily: Fonts.regular,
    fontSize: 13,
    color: COLORS.DimGray,
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
    color: '#FFF',
    marginLeft: 8,
    flex: 1,
  },
});
