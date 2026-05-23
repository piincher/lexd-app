import { StyleSheet } from "react-native";
import { Fonts } from "@src/constants/Fonts";

interface SlideStyleOptions {
  width: number;
  viewportHeight: number;
}

export const createStyles = ({ width, viewportHeight, colors }: SlideStyleOptions & { colors: any }) => {
  const isNarrow = width < 360;
  const isShort = viewportHeight < 700;
  const horizontalPadding = isNarrow ? 20 : 28;
  const imageHeight = Math.max(
    isShort ? 160 : 200,
    Math.min(viewportHeight * (isShort ? 0.30 : 0.36), width * 0.72)
  );

  return StyleSheet.create({
    container: {
      flex: 1,
      minHeight: 0,
      paddingHorizontal: horizontalPadding,
      justifyContent: "center",
    },
    imageSection: {
      flex: 1,
      minHeight: imageHeight,
      justifyContent: "flex-end",
      alignItems: "center",
      position: "relative",
    },
    imageWrapper: {
      width: "100%",
      maxWidth: Math.min(width - horizontalPadding * 2, 360),
      height: imageHeight,
      justifyContent: "center",
      alignItems: "center",
    },
    image: {
      width: "100%",
      height: "100%",
    },
    contentSection: {
      flexShrink: 0,
      alignItems: "flex-start",
      paddingTop: isShort ? 12 : 20,
      paddingBottom: isShort ? 4 : 10,
    },
    title: {
      fontSize: isNarrow ? 24 : 28,
      fontFamily: Fonts.black,
      fontWeight: "800",
      color: colors.text.primary,
      textAlign: "left",
      marginBottom: isShort ? 10 : 14,
      lineHeight: isNarrow ? 31 : 36,
    },
    description: {
      maxWidth: 520,
      fontSize: isNarrow ? 14 : 16,
      fontFamily: Fonts.regular,
      color: colors.text.secondary,
      textAlign: "left",
      lineHeight: isNarrow ? 21 : 24,
    },
    counter: {
      marginTop: isShort ? 14 : 20,
    },
    counterText: {
      fontSize: 13,
      fontFamily: Fonts.medium,
    },
    counterCurrent: {
      color: colors.primary.main,
      fontWeight: "700",
    },
    counterTotal: {
      color: colors.text.muted,
    },
  });
};
