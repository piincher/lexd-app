import { StyleSheet } from "react-native";
import { Fonts } from "@src/constants/Fonts";

export const createStyles = (colors: any, isDark?: boolean) => StyleSheet.create({
  distributionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  distributionStar: {
    fontSize: 12,
    fontFamily: Fonts.meduim,
    color: colors.text.secondary,
    width: 12,
    textAlign: "right",
  },
  distributionTrack: {
    flex: 1,
    height: 6,
    backgroundColor: colors.neutral[100],
    borderRadius: 3,
    overflow: "hidden",
  },
  distributionFill: {
    height: "100%",
    backgroundColor: colors.primary.main,
    borderRadius: 3,
  },
  distributionCount: {
    fontSize: 12,
    fontFamily: Fonts.meduim,
    color: colors.text.secondary,
    width: 24,
    textAlign: "right",
  },
});
