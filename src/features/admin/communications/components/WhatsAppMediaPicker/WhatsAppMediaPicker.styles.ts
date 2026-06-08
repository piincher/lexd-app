import { StyleSheet } from "react-native";
import { Fonts } from "@src/constants/Fonts";
import { Theme } from "@src/constants/Theme";
import type { ThemeContextType } from "@src/constants/Theme";

const THUMB = 84;

export const createStyles = (colors: ThemeContextType["colors"]) =>
  StyleSheet.create({
    container: {
      gap: Theme.spacing.sm,
    },
    headerRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    label: {
      fontSize: 13,
      fontFamily: Fonts.medium,
      color: colors.text.secondary,
    },
    counter: {
      fontSize: 12,
      fontFamily: Fonts.medium,
      color: colors.text.disabled,
    },
    actionsRow: {
      flexDirection: "row",
      gap: Theme.spacing.sm,
    },
    actionButton: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 6,
      paddingVertical: Theme.spacing.sm + 2,
      borderRadius: Theme.radius.md,
      borderWidth: 1,
      borderStyle: "dashed",
      borderColor: colors.primary[300],
      backgroundColor: colors.primary[50],
    },
    actionButtonDisabled: {
      opacity: 0.4,
    },
    actionText: {
      fontSize: 13,
      fontFamily: Fonts.medium,
      color: colors.primary[700],
    },
    previewList: {
      paddingVertical: 2,
      gap: Theme.spacing.sm,
    },
    thumbWrap: {
      width: THUMB,
      height: THUMB,
      borderRadius: Theme.radius.md,
      overflow: "hidden",
      backgroundColor: colors.neutral[200],
      borderWidth: 1,
      borderColor: colors.border,
    },
    thumbImage: {
      width: "100%",
      height: "100%",
    },
    videoThumb: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      gap: 4,
      backgroundColor: colors.neutral[800],
    },
    videoDuration: {
      fontSize: 10,
      fontFamily: Fonts.medium,
      color: colors.neutral.white,
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "rgba(0,0,0,0.45)",
      gap: 4,
    },
    overlayText: {
      fontSize: 10,
      fontFamily: Fonts.bold,
      color: colors.neutral.white,
    },
    removeButton: {
      position: "absolute",
      top: 2,
      right: 2,
      width: 22,
      height: 22,
      borderRadius: 11,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "rgba(0,0,0,0.6)",
    },
    sizeBadge: {
      position: "absolute",
      bottom: 2,
      left: 2,
      paddingHorizontal: 5,
      paddingVertical: 1,
      borderRadius: 4,
      backgroundColor: "rgba(0,0,0,0.6)",
    },
    sizeText: {
      fontSize: 9,
      fontFamily: Fonts.medium,
      color: colors.neutral.white,
    },
  });
