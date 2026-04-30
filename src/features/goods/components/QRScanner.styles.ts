import { StyleSheet, Dimensions } from "react-native";
import { Fonts } from "@src/constants/Fonts";
import { Theme } from "@src/constants/Theme";

const { width } = Dimensions.get("window");
export const SCANNER_SIZE = width * 0.7;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
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
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  middleSection: {
    flexDirection: "row",
    width: "100%",
  },
  overlaySide: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
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
    borderColor: "#4CAF50",
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
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  instructionText: {
    color: "white",
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
    backgroundColor: "rgba(76, 175, 80, 0.3)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  },
  scannedText: {
    color: "white",
    fontSize: 18,
    fontFamily: Fonts.bold,
    backgroundColor: "rgba(0,0,0,0.7)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  messageText: {
    color: "white",
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
    backgroundColor: Theme.colors.background.card,
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
});
