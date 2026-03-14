import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { CameraView } from 'expo-camera';
import { MaterialCommunityIcons } from '@expo/vector-icons';

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
  if (showScanner) {
    return (
      <View style={styles.scannerContainer}>
        <CameraView
          onBarcodeScanned={isScanning ? onBarCodeScanned : undefined}
          barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
          style={StyleSheet.absoluteFillObject}
        />
        <View style={styles.scannerOverlay}>
          <View style={styles.scannerTarget} />
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
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  scannerTarget: {
    width: 200,
    height: 200,
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 12,
  },
  cancelButton: {
    position: 'absolute',
    bottom: 24,
  },
});
