/**
 * UnassignedGoodsAlert Styles
 * SRP: Define styles for UnassignedGoodsAlert ONLY
 */

import { StyleSheet } from "react-native";
import { COLORS } from "@src/constants/Colors";
import { Fonts } from "@src/constants/Fonts";

export const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    borderRadius: 12,
    elevation: 2,
    overflow: "hidden",
    borderLeftWidth: 4,
  },
  touchable: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    color: COLORS.DarkGrey,
    marginLeft: 12,
    flex: 1,
  },
  countContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.Silver,
  },
  count: {
    fontSize: 36,
    fontFamily: Fonts.bold,
    letterSpacing: -1,
  },
  countLabel: {
    fontSize: 12,
    fontFamily: Fonts.regular,
    color: COLORS.grey,
    marginTop: 4,
  },
  breakdownContainer: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 12,
  },
  breakdownRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  breakdownItem: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  breakdownIconContainer: {
    width: 28,
    height: 28,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  breakdownTextContainer: {
    flex: 1,
  },
  breakdownValue: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    color: COLORS.DarkGrey,
  },
  breakdownLabel: {
    fontSize: 10,
    fontFamily: Fonts.medium,
    color: COLORS.grey,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  ageContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: COLORS.Silver,
    marginTop: 4,
  },
  ageItem: {
    alignItems: "center",
    flex: 1,
  },
  ageValue: {
    fontSize: 14,
    fontFamily: Fonts.bold,
    color: COLORS.DarkGrey,
  },
  ageValueCritical: {
    color: COLORS.danger,
  },
  ageLabel: {
    fontSize: 10,
    fontFamily: Fonts.medium,
    color: COLORS.grey,
    marginTop: 2,
  },
  ageLabelCritical: {
    color: COLORS.danger,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    backgroundColor: COLORS.FeatherWhite,
    borderTopWidth: 1,
    borderTopColor: COLORS.Silver,
  },
  footerText: {
    fontSize: 13,
    fontFamily: Fonts.bold,
    color: COLORS.grey,
  },
  successBanner: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.success + "10",
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  successText: {
    fontSize: 14,
    fontFamily: Fonts.medium,
    color: COLORS.success,
    marginLeft: 8,
  },
});

export default styles;
