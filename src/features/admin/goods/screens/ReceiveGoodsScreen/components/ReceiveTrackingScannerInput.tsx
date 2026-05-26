import React from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { CameraView } from 'expo-camera';
import { Control, Controller } from 'react-hook-form';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { FormInput } from '../../../components/FormInput';
import type { ReceiveGoodsFormData } from '../types';
import { TRACKING_BARCODE_TYPES } from '../hooks/trackingScannerGallery';
import { useReceiveTrackingScanner } from '../hooks/useReceiveTrackingScanner';

interface ReceiveTrackingScannerInputProps {
  control: Control<ReceiveGoodsFormData>;
  error?: string;
}

const SCAN_TARGET_WIDTH = 240;
const SCAN_TARGET_HEIGHT = 160;

export const ReceiveTrackingScannerInput: React.FC<ReceiveTrackingScannerInputProps> = ({
  control,
  error,
}) => {
  const { colors } = useAppTheme();
  const scanner = useReceiveTrackingScanner();

  return (
    <Controller
      control={control}
      name="expressTrackingNumber"
      render={({ field: { onChange, value } }) => {
        return (
          <View style={styles.container}>
            <FormInput
              label="N° de suivi express (optionnel)"
              value={value || ''}
              onChangeText={onChange}
              error={error}
              placeholder="Ex: 1Z999AA10123456784"
              autoCapitalize="characters"
            />
            <View style={styles.actionsRow}>
              <Button
                mode="outlined"
                icon="barcode-scan"
                onPress={scanner.openScanner}
                style={styles.actionButton}
                contentStyle={styles.actionContent}
              >
                Scanner le suivi
              </Button>
              <Button
                mode="outlined"
                icon="image-search"
                loading={scanner.isPickingFromGallery}
                disabled={scanner.isPickingFromGallery}
                onPress={() => scanner.pickFromGallery(onChange)}
                style={styles.actionButton}
                contentStyle={styles.actionContent}
              >
                Galerie
              </Button>
            </View>
            <Modal visible={scanner.visible} animationType="slide" onRequestClose={scanner.closeScanner}>
              <View style={[styles.scanner, { backgroundColor: colors.background.default }]}>
                {scanner.hasPermission === false ? (
                  <Text style={[styles.permissionText, { color: colors.text.primary }]}>
                    Autorisez la caméra pour scanner le numéro de suivi.
                  </Text>
                ) : scanner.hasPermission === null ? (
                  <Text style={[styles.permissionText, { color: colors.text.primary }]}>
                    Préparation de la caméra...
                  </Text>
                ) : (
                  <CameraView
                    style={StyleSheet.absoluteFillObject}
                    onBarcodeScanned={
                      scanner.isLocked
                        ? undefined
                        : (result) => scanner.handleBarcodeScanned(result, onChange)
                    }
                    barcodeScannerSettings={{ barcodeTypes: TRACKING_BARCODE_TYPES }}
                  />
                )}
                <View style={styles.overlay}>
                  <View style={[styles.target, { borderColor: colors.text.inverse }]} />
                  <View style={styles.modalActions}>
                    <Button
                      mode="outlined"
                      icon="image-search"
                      loading={scanner.isPickingFromGallery}
                      disabled={scanner.isPickingFromGallery}
                      onPress={() => scanner.pickFromGallery(onChange)}
                      style={styles.modalButton}
                    >
                      Galerie
                    </Button>
                    <Button mode="contained" onPress={scanner.closeScanner} style={styles.modalButton}>
                      Annuler
                    </Button>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: { gap: 6 },
  actionsRow: { flexDirection: 'row', gap: 8, marginBottom: 6 },
  actionButton: { flex: 1, borderRadius: 8 },
  actionContent: { minHeight: 44 },
  scanner: { flex: 1, justifyContent: 'center' },
  overlay: { ...StyleSheet.absoluteFillObject, alignItems: 'center', justifyContent: 'center' },
  target: { width: SCAN_TARGET_WIDTH, height: SCAN_TARGET_HEIGHT, borderWidth: 2, borderRadius: 12 },
  modalActions: {
    position: 'absolute',
    bottom: 36,
    flexDirection: 'row',
    gap: 10,
  },
  modalButton: { minWidth: 124, borderRadius: 8 },
  permissionText: { padding: 48, textAlign: 'center' },
});
