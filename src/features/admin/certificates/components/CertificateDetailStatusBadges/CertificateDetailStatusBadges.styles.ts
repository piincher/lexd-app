import { StyleSheet } from "react-native";
import { Fonts } from "@src/constants/Fonts";

export const getStyles = (colors: any) => StyleSheet.create({
  badgeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    marginBottom: 24,
  },
  badge: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 13,
    fontFamily: Fonts.bold,
    textTransform: "uppercase",
  },
  badgeActive: {
    backgroundColor: colors.status.success + '18',
  },
  badgeActiveText: {
    color: colors.status.success,
  },
  badgeRevoked: {
    backgroundColor: colors.status.error + '15',
  },
  badgeRevokedText: {
    color: colors.status.error,
  },
  badgeAuto: {
    backgroundColor: colors.status.info + '15',
  },
  badgeAutoText: {
    color: colors.status.info,
  },
  badgeManual: {
    backgroundColor: colors.status.warning + '15',
  },
  badgeManualText: {
    color: colors.status.warning,
  },
});
