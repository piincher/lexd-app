import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Camera, CameraView, type BarcodeScanningResult, type BarcodeType } from "expo-camera";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { useTheme } from "react-native-paper";
import { hapticError, hapticLight, hapticSuccess } from "@src/shared/lib/haptics";
import { useQRScannerStyles, SCANNER_SIZE } from "./QRScanner.styles";
import { ScannerOverlay } from "./ScannerOverlay";

const QR_BARCODE_TYPES: BarcodeType[] = ["qr"];
const CAMERA_PERMISSION_LOADING = "Demande d'autorisation de caméra...";
const CAMERA_PERMISSION_DENIED =
  "Veuillez autoriser l'accès à la caméra dans les paramètres de l'application pour scanner les QR codes.";

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
  const [cameraError, setCameraError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const requestPermission = async () => {
      try {
        const { status } = await Camera.requestCameraPermissionsAsync();
        if (isMounted) setHasPermission(status === "granted");
      } catch {
        hapticError();
        if (isMounted) setHasPermission(false);
      }
    };

    requestPermission();

    return () => {
      isMounted = false;
    };
  }, []);

  const requestCameraPermission = async () => {
    hapticLight();
    setHasPermission(null);
    setCameraError(false);
    try {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    } catch {
      hapticError();
      setHasPermission(false);
    }
  };

  const handleBarCodeScanned = ({ data }: BarcodeScanningResult) => {
    if (scanned) return;
    setScanned(true);
    hapticSuccess();
    onScan(data);
  };

  const handleCameraMountError = () => {
    hapticError();
    setCameraError(true);
  };

  const toggleTorch = () => {
    hapticLight();
    setTorchEnabled((prev) => !prev);
  };

  if (cameraError) {
    return (
      <View style={styles.container}>
        <View style={styles.unavailableContainer}>
          <MaterialCommunityIcons name="qrcode-scan" size={80} color={theme.colors.primary} />
          <Text style={[styles.unavailableTitle, { color: colors.text.primary }]}>
            Caméra indisponible
          </Text>
          <Text style={[styles.unavailableText, { color: colors.text.secondary }]}>
            Impossible de démarrer la caméra. Vérifiez les autorisations puis réessayez.
          </Text>
          <Button title="Réessayer" onPress={requestCameraPermission} />
          {onCancel ? <Button title="Retour" onPress={onCancel} /> : null}
        </View>
      </View>
    );
  }

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text style={styles.messageText}>{CAMERA_PERMISSION_LOADING}</Text>
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
          {CAMERA_PERMISSION_DENIED}
        </Text>
        <Button title="Réessayer" onPress={requestCameraPermission} />
        {onCancel ? <Button title="Retour" onPress={onCancel} /> : null}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={[StyleSheet.absoluteFillObject, styles.scanner]}
        facing="back"
        enableTorch={torchEnabled}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        onMountError={handleCameraMountError}
        barcodeScannerSettings={{ barcodeTypes: QR_BARCODE_TYPES }}
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
