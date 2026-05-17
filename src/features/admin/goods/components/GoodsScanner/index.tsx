import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { CameraView } from 'expo-camera';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface GoodsScannerProps {
  isScanning: boolean;
  showScanner: boolean;
  onStartScan: () => void;
  onStopScan: () => void;
  onBarCodeScanned: ({ data }: { data: string }) => void;
}

export const GoodsScanner: React.FC<GoodsScannerProps> = ({
  isScanning,
  showScanner,
  onStartScan,
  onStopScan,
  onBarCodeScanned,
}) => {
  const { colors } = useAppTheme();

  if (showScanner) {
    return (
      <View style={styles.scannerContainer}>
        <CameraView
          onBarcodeScanned={isScanning ? onBarCodeScanned : undefined}
          barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
          style={StyleSheet.absoluteFillObject}
        />
        <View style={[styles.scannerOverlay, { backgroundColor: colors.background.overlay }]}>
          <View style={[styles.scannerTarget, { borderColor: colors.text.inverse }]} />
          <Button mode="contained" onPress={onStopScan} style={styles.cancelButton}>
            Annuler
          </Button>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Button
        mode="outlined"
        onPress={onStartScan}
        icon="qrcode-scan"
        style={styles.scanButton}
      >
        Scanner QR Client
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  scanButton: {
    borderRadius: 8,
  },
  scannerContainer: {
    height: 300,
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  scannerOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scannerTarget: {
    width: 200,
    height: 200,
    borderWidth: 2,
    borderRadius: 12,
  },
  cancelButton: {
    position: 'absolute',
    bottom: 24,
  },
});
