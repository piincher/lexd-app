/**
 * OutstandingPaymentsCard Styles
 * SRP: Define styles for OutstandingPaymentsCard ONLY
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
    borderLeftColor: COLORS.green,
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
  criticalBadge: {
    alignSelf: "center",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  amountContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.Silver,
  },
  amount: {
    fontSize: 32,
    fontFamily: Fonts.bold,
    letterSpacing: -0.5,
  },
  amountLabel: {
    fontSize: 12,
    fontFamily: Fonts.regular,
    color: COLORS.grey,
    marginTop: 4,
  },
  statusContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  statusItem: {
    alignItems: "center",
    flex: 1,
  },
  statusIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6,
  },
  statusCount: {
    fontSize: 18,
    fontFamily: Fonts.bold,
    color: COLORS.DarkGrey,
  },
  statusLabel: {
    fontSize: 11,
    fontFamily: Fonts.medium,
    marginTop: 2,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    backgroundColor: COLORS.FeatherWhite,
    borderTopWidth: 1,
    borderTopColor: COLORS.Silver,
  },
  footerText: {
    fontSize: 12,
    fontFamily: Fonts.medium,
    color: COLORS.grey,
  },
});

export default styles;
