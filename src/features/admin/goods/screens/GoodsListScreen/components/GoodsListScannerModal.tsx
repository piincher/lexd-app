/**
 * GoodsListScannerModal - Full-screen QR scanner mounted from the goods list header.
 *
 * Wraps the shared `QRScanner` in a React Native `Modal` so the camera viewfinder takes
 * the whole screen but the list state behind it stays mounted. On scan, the parent hook
 * decides whether to navigate to the matching goods detail or show a "not found" toast —
 * this component is just the UI shell.
 */

import React from 'react';
import { Modal, View, StyleSheet } from 'react-native';
import { QRScanner } from '@src/features/goods/components/QRScanner';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface GoodsListScannerModalProps {
  visible: boolean;
  onScan: (data: string) => void;
  onDismiss: () => void;
}

export const GoodsListScannerModal: React.FC<GoodsListScannerModalProps> = ({
  visible,
  onScan,
  onDismiss,
}) => {
  const { colors } = useAppTheme();

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
      onRequestClose={onDismiss}
    >
      <View style={[styles.container, { backgroundColor: colors.background.default }]}>
        <QRScanner onScan={onScan} onCancel={onDismiss} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});
