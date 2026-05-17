import React from "react";
import { View, Text, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { useQRScannerStyles } from "./QRScanner.styles";

interface ScannerOverlayProps {
  scanned: boolean;
  torchEnabled: boolean;
  onToggleTorch: () => void;
  onCancel: () => void;
  scanAreaSize: number;
  cancelButtonColor: string;
}

export const ScannerOverlay: React.FC<ScannerOverlayProps> = ({
  scanned,
  torchEnabled,
  onToggleTorch,
  onCancel,
  scanAreaSize,
  cancelButtonColor,
}) => {
  const { colors } = useAppTheme();
  const styles = useQRScannerStyles();

  return (
    <View style={styles.overlay}>
      <View style={styles.overlayTop} />
      <View style={styles.middleSection}>
        <View style={styles.overlaySide} />
        <View style={[styles.scanArea, { width: scanAreaSize, height: scanAreaSize }]}>
          <View style={[styles.corner, styles.cornerTopLeft]} />
          <View style={[styles.corner, styles.cornerTopRight]} />
          <View style={[styles.corner, styles.cornerBottomLeft]} />
          <View style={[styles.corner, styles.cornerBottomRight]} />
          {scanned && (
            <View style={styles.scannedOverlay}>
              <Text style={styles.scannedText}>QR Code détecté!</Text>
            </View>
          )}
        </View>
        <View style={styles.overlaySide} />
      </View>
      <View style={styles.overlayBottom}>
        <Text style={styles.instructionText}>
          Placez le QR code dans le cadre pour scanner
        </Text>
        <View style={styles.controls}>
          <Pressable
            style={[styles.controlButton, { backgroundColor: colors.background.overlay }]}
            onPress={onToggleTorch}
          >
            <MaterialCommunityIcons
              name={torchEnabled ? "flashlight-off" : "flashlight"}
              size={24}
              color={colors.text.inverse}
            />
          </Pressable>
          <Pressable
            style={[styles.controlButton, { backgroundColor: cancelButtonColor }]}
            onPress={onCancel}
          >
            <MaterialCommunityIcons name="close" size={24} color={colors.text.inverse} />
          </Pressable>
        </View>
      </View>
    </View>
  );
};
