/**
 * RecentOrders styles
 */

import { StyleSheet } from "react-native";
import { COLORS } from "@src/constants/Colors";
import { Fonts } from "@src/constants/Fonts";

export const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
    borderRadius: 12,
    elevation: 2,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    color: COLORS.DarkGrey,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  textContainer: {
    marginLeft: 12,
  },
  clientName: {
    fontSize: 14,
    fontFamily: Fonts.bold,
    color: COLORS.DarkGrey,
  },
  orderCode: {
    fontSize: 12,
    fontFamily: Fonts.regular,
    color: COLORS.grey,
    marginTop: 2,
  },
  right: {
    alignItems: "flex-end",
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  statusText: {
    fontSize: 10,
    fontFamily: Fonts.bold,
  },
  date: {
    fontSize: 11,
    fontFamily: Fonts.regular,
    color: COLORS.grey,
    marginTop: 4,
  },
  empty: {
    alignItems: "center",
    paddingVertical: 30,
  },
  emptyText: {
    fontSize: 14,
    color: COLORS.grey,
  },
});
