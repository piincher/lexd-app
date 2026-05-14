import { StyleSheet } from "react-native";
import { Fonts } from "@src/constants/Fonts";

interface SlideStyleOptions {
  width: number;
  viewportHeight: number;
}

export const createStyles = ({ width, viewportHeight, colors }: SlideStyleOptions & { colors: any }) => {
  const isNarrow = width < 360;
  const isShort = viewportHeight < 700;
  const horizontalPadding = isNarrow ? 18 : 24;
  const imageHeight = Math.max(
    isShort ? 170 : 220,
    Math.min(viewportHeight * (isShort ? 0.32 : 0.38), width * 0.78)
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
      maxWidth: Math.min(width - horizontalPadding * 2, 390),
      height: imageHeight,
      justifyContent: "center",
      alignItems: "center",
      zIndex: 2,
    },
    image: {
      width: "100%",
      height: "100%",
    },
    decorationCircle: {
      position: "absolute",
      borderRadius: 999,
      backgroundColor: "rgba(255, 255, 255, 0.1)",
    },
    circle1: {
      width: Math.min(width * 0.42, 180),
      height: Math.min(width * 0.42, 180),
      top: isShort ? 8 : 18,
      right: horizontalPadding,
    },
    circle2: {
      width: Math.min(width * 0.28, 112),
      height: Math.min(width * 0.28, 112),
      bottom: 0,
      left: horizontalPadding,
    },
    contentSection: {
      flexShrink: 0,
      alignItems: "center",
      paddingTop: isShort ? 12 : 20,
      paddingBottom: isShort ? 4 : 10,
    },
    title: {
      fontSize: isNarrow ? 24 : 28,
      fontFamily: Fonts.black,
      fontWeight: "800",
      color: colors.text.inverse,
      textAlign: "center",
      marginBottom: isShort ? 10 : 14,
      lineHeight: isNarrow ? 31 : 36,
      textShadowColor: "rgba(0, 0, 0, 0.18)",
      textShadowOffset: { width: 0, height: 2 },
      textShadowRadius: 4,
    },
    description: {
      maxWidth: 520,
      fontSize: isNarrow ? 14 : 16,
      fontFamily: Fonts.regular,
      color: colors.text.inverse + "EB",
      textAlign: "center",
      lineHeight: isNarrow ? 21 : 24,
      paddingHorizontal: isNarrow ? 0 : 8,
    },
    counter: {
      marginTop: isShort ? 14 : 20,
      paddingHorizontal: 14,
      paddingVertical: 7,
      backgroundColor: "rgba(255, 255, 255, 0.18)",
      borderRadius: 999,
    },
    counterText: {
      fontSize: 13,
      fontFamily: Fonts.medium,
    },
    counterCurrent: {
      color: colors.text.inverse,
      fontWeight: "700",
    },
    counterTotal: {
      color: colors.text.inverse + "B8",
    },
  });
};
