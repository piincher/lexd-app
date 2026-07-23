import React, { useState } from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import { Button, IconButton, TextInput } from 'react-native-paper';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import type { PackageTargetType } from '../types';
import { usePackageAssignmentScanner } from '../hooks/usePackageAssignmentScanner';
import { scannerStyles as styles } from './PackageAssignmentScannerModal.styles';

interface Props { visible: boolean; targetType: PackageTargetType; targetId: string; targetLabel: string; onDismiss: () => void }

export const PackageAssignmentScannerModal: React.FC<Props> = ({ visible, targetType, targetId, targetLabel, onDismiss }) => {
  const { colors } = useAppTheme();
  const [permission, requestPermission] = useCameraPermissions();
  const [torch, setTorch] = useState(false);
  const [manualCode, setManualCode] = useState('');
  const scanner = usePackageAssignmentScanner(targetType, targetId);
  const close = () => { scanner.reset(); setManualCode(''); setTorch(false); onDismiss(); };
  const feedbackColor = scanner.feedback?.tone === 'success' ? colors.status.success : scanner.feedback?.tone === 'error' ? colors.status.error : colors.status.info;
  const feedbackIcon = scanner.feedback?.tone === 'success' ? 'checkmark-circle' : scanner.feedback?.tone === 'error' ? 'close-circle' : 'information-circle';

  return <Modal visible={visible} animationType="slide" onRequestClose={close}>
    <View style={[styles.root, { backgroundColor: colors.background.default }]}>
      <View style={styles.header}>
        <View style={styles.headerRow}><View><Text style={[styles.title, { color: colors.text.primary }]}>Scanner les colis</Text><Text style={[styles.subtitle, { color: colors.text.secondary }]}>{targetLabel} · {scanner.assignedCount} ajouté(s)</Text></View><Pressable accessibilityRole="button" accessibilityLabel="Fermer" onPress={close} style={styles.close}><Ionicons name="close" size={28} color={colors.text.primary} /></Pressable></View>
      </View>
      {!permission ? <View style={styles.center}><Text style={{ color: colors.text.secondary }}>Initialisation de la caméra…</Text></View>
        : !permission.granted ? <View style={styles.center}><Ionicons name="camera-outline" size={48} color={colors.text.secondary} /><Text style={[styles.permission, { color: colors.text.secondary }]}>L’accès à la caméra est nécessaire pour scanner les étiquettes des colis.</Text><Button mode="contained" onPress={requestPermission}>Autoriser la caméra</Button></View>
        : <View style={styles.cameraWrap}>
          <CameraView enableTorch={torch} onBarcodeScanned={({ data }) => scanner.scan(data)} barcodeScannerSettings={{ barcodeTypes: ['qr', 'code128', 'code39'] }} style={styles.camera} />
          <View style={styles.overlay} pointerEvents="none"><View style={[styles.target, { borderColor: colors.text.inverse }]} /></View>
          <IconButton icon={torch ? 'flashlight-off' : 'flashlight'} mode="contained" onPress={() => setTorch((value) => !value)} style={styles.torch} />
          {scanner.feedback ? <View style={[styles.feedback, { backgroundColor: feedbackColor }]}><Ionicons name={feedbackIcon} size={19} color={colors.text.inverse} /><Text style={[styles.feedbackText, { color: colors.text.inverse }]} numberOfLines={3}>{scanner.feedback.message}</Text></View> : null}
        </View>}
      <View style={styles.footer}>
        <View style={styles.manualRow}><TextInput mode="outlined" dense label="Code manuel" value={manualCode} onChangeText={setManualCode} autoCapitalize="characters" style={styles.manualInput} /><Button mode="outlined" loading={scanner.isPending} disabled={!manualCode.trim() || scanner.isPending} onPress={() => scanner.scan(manualCode)} style={styles.manualButton}>Ajouter</Button></View>
        <Button mode="contained" onPress={close} style={styles.done}>Terminer ({scanner.assignedCount})</Button>
      </View>
    </View>
  </Modal>;
};
