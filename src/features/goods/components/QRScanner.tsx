import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { useTheme } from "react-native-paper";
import { useQRScannerStyles, SCANNER_SIZE } from "./QRScanner.styles";
import { ScannerOverlay } from "./ScannerOverlay";

let BarCodeScanner: any;
let BarCodeScannerType: any;

try {
  const barcodeModule = require("expo-barcode-scanner");
  BarCodeScanner = barcodeModule.BarCodeScanner;
  BarCodeScannerType = barcodeModule.BarCodeScanner.Constants?.BarCodeType;
} catch {
  BarCodeScanner = null;
}

interface QRScannerProps {
  onScan: (data: string) => void;
  onCancel?: () => void;
}

export const QRScanner: React.FC<QRScannerProps> = ({ onScan, onCancel }) => {
  const { colors } = useAppTheme();
  const theme = useTheme();
  const styles = useQRScannerStyles();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [torchEnabled, setTorchEnabled] = useState(false);

  useEffect(() => {
    if (!BarCodeScanner) return;
    const getPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };
    getPermissions();
  }, []);

  const handleBarCodeScanned = ({ data }: { type: string; data: string }) => {
    if (scanned) return;
    setScanned(true);
    onScan(data);
  };

  const toggleTorch = () => setTorchEnabled((prev) => !prev);

  if (!BarCodeScanner) {
    return (
      <View style={styles.container}>
        <View style={styles.unavailableContainer}>
          <MaterialCommunityIcons name="qrcode-scan" size={80} color={theme.colors.primary} />
          <Text style={[styles.unavailableTitle, { color: colors.text.primary }]}>
            Scanner non disponible
          </Text>
          <Text style={[styles.unavailableText, { color: colors.text.secondary }]}>
            Le scanner QR code nécessite l'installation de expo-barcode-scanner.
          </Text>
          <Button title="Retour" onPress={onCancel} />
        </View>
      </View>
    );
  }

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text style={styles.messageText}>Demande d'autorisation de caméra...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <MaterialCommunityIcons name="camera-off" size={64} color={colors.text.disabled} />
        <Text style={[styles.permissionTitle, { color: colors.text.primary }]}>
          Accès caméra refusé
        </Text>
        <Text style={[styles.permissionText, { color: colors.text.secondary }]}>
          Veuillez autoriser l'accès à la caméra dans les paramètres de l'application pour scanner les QR codes.
        </Text>
        <Button title="Retour" onPress={onCancel} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        style={[StyleSheet.absoluteFillObject, styles.scanner]}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        barCodeTypes={[BarCodeScannerType?.QR || "qr"]}
        flashMode={torchEnabled ? "torch" : "off"}
      />
      <ScannerOverlay
        scanned={scanned}
        torchEnabled={torchEnabled}
        onToggleTorch={toggleTorch}
        onCancel={onCancel ?? (() => {})}
        scanAreaSize={SCANNER_SIZE}
        cancelButtonColor={theme.colors.error}
      />
    </View>
  );
};
