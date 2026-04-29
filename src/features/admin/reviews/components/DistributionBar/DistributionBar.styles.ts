import { StyleSheet } from "react-native";
import { Fonts } from "@src/constants/Fonts";
import { Theme } from "@src/constants/Theme";

export const styles = StyleSheet.create({
  distributionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  distributionStar: {
    fontSize: 12,
    fontFamily: Fonts.meduim,
    color: Theme.colors.text.secondary,
    width: 12,
    textAlign: "right",
  },
  distributionTrack: {
    flex: 1,
    height: 6,
    backgroundColor: Theme.colors.neutral[100],
    borderRadius: 3,
    overflow: "hidden",
  },
  distributionFill: {
    height: "100%",
    backgroundColor: "#d4a843",
    borderRadius: 3,
  },
  distributionCount: {
    fontSize: 12,
    fontFamily: Fonts.meduim,
    color: Theme.colors.text.secondary,
    width: 24,
    textAlign: "right",
  },
});
