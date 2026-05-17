import { StyleSheet, Dimensions } from "react-native";
import { Fonts } from "@src/constants/Fonts";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { useMemo } from "react";

const { width } = Dimensions.get("window");
export const SCANNER_SIZE = width * 0.7;

export const useQRScannerStyles = () => {
  const { colors } = useAppTheme();

  return useMemo(() => StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background.default,
      justifyContent: "center",
      alignItems: "center",
    },
    scanner: {
      flex: 1,
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: "center",
      alignItems: "center",
    },
    overlayTop: {
      flex: 1,
      width: "100%",
      backgroundColor: colors.background.overlay,
    },
    middleSection: {
      flexDirection: "row",
      width: "100%",
    },
    overlaySide: {
      flex: 1,
      backgroundColor: colors.background.overlay,
    },
    scanArea: {
      position: "relative",
      borderRadius: 12,
      overflow: "hidden",
    },
    corner: {
      position: "absolute",
      width: 20,
      height: 20,
      borderColor: colors.primary.main,
      borderWidth: 4,
    },
    cornerTopLeft: {
      top: 0,
      left: 0,
      borderRightWidth: 0,
      borderBottomWidth: 0,
      borderTopLeftRadius: 12,
    },
    cornerTopRight: {
      top: 0,
      right: 0,
      borderLeftWidth: 0,
      borderBottomWidth: 0,
      borderTopRightRadius: 12,
    },
    cornerBottomLeft: {
      bottom: 0,
      left: 0,
      borderRightWidth: 0,
      borderTopWidth: 0,
      borderBottomLeftRadius: 12,
    },
    cornerBottomRight: {
      bottom: 0,
      right: 0,
      borderLeftWidth: 0,
      borderTopWidth: 0,
      borderBottomRightRadius: 12,
    },
    overlayBottom: {
      flex: 1,
      width: "100%",
      backgroundColor: colors.background.overlay,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 32,
    },
    instructionText: {
      color: colors.text.inverse,
      fontSize: 16,
      textAlign: "center",
      fontFamily: Fonts.meduim,
      marginBottom: 24,
    },
    controls: {
      flexDirection: "row",
      gap: 20,
    },
    controlButton: {
      width: 56,
      height: 56,
      borderRadius: 28,
      justifyContent: "center",
      alignItems: "center",
    },
    scannedOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: colors.status.success + "4D",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 12,
    },
    scannedText: {
      color: colors.text.inverse,
      fontSize: 18,
      fontFamily: Fonts.bold,
      backgroundColor: colors.background.overlay,
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 8,
    },
    messageText: {
      color: colors.text.inverse,
      fontSize: 16,
      fontFamily: Fonts.meduim,
    },
    permissionTitle: {
      fontSize: 20,
      fontFamily: Fonts.bold,
      marginTop: 16,
    },
    permissionText: {
      fontSize: 14,
      fontFamily: Fonts.regular,
      textAlign: "center",
      marginTop: 8,
      marginHorizontal: 32,
    },
    button: {
      marginTop: 24,
    },
    unavailableContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 32,
      backgroundColor: colors.background.card,
      width: "100%",
    },
    unavailableTitle: {
      fontSize: 20,
      fontFamily: Fonts.bold,
      marginTop: 16,
    },
    unavailableText: {
      fontSize: 14,
      fontFamily: Fonts.regular,
      textAlign: "center",
      marginTop: 8,
    },
  }), [colors]);
};
