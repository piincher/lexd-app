/**
 * ScanToAssignModal — warehouse-floor QR/barcode scanning to assign goods into a
 * container without hunting through lists. The operator points the camera at a
 * package label; we resolve the code against the unassigned-goods pool and fire
 * the assign mutation immediately, with a running tally of what was added.
 */
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { useGetUnassignedGoods, useAssignGoodsToContainer } from '../../hooks';
import type { ShippingMode } from '../../types';
import type { Goods } from '../../../goods/types';

interface ScanToAssignModalProps {
  visible: boolean;
  containerId: string;
  shippingMode?: ShippingMode;
  onDismiss: () => void;
}

type Feedback = { tone: 'success' | 'error' | 'info'; message: string } | null;

const extractGoods = (response: unknown): Goods[] => {
  if (Array.isArray(response)) return response as Goods[];
  const data = (response as { data?: unknown })?.data;
  if (Array.isArray(data)) return data as Goods[];
  const nested = (data as { goods?: unknown })?.goods;
  if (Array.isArray(nested)) return nested as Goods[];
  return [];
};

const normalize = (value?: string) => (value ?? '').trim().toUpperCase();

/** Match a scanned code against a goods record across its identifying fields. */
const matchesCode = (goods: Goods, code: string): boolean => {
  const c = normalize(code);
  return (
    normalize(goods.qrCodeData) === c ||
    normalize(goods.goodsId) === c ||
    normalize(goods.expressTrackingNumber) === c ||
    normalize(goods._id) === c
  );
};

export const ScanToAssignModal: React.FC<ScanToAssignModalProps> = ({
  visible,
  containerId,
  shippingMode,
  onDismiss,
}) => {
  const { colors } = useAppTheme();
  const [permission, requestPermission] = useCameraPermissions();
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [assignedIds, setAssignedIds] = useState<string[]>([]);
  // Debounce: the camera fires onBarcodeScanned continuously while a code is in
  // frame, so we lock per-code until the result settles.
  const lockRef = useRef(false);
  const lastCodeRef = useRef<string>('');

  const { data } = useGetUnassignedGoods(shippingMode, { enabled: visible });
  const assignMutation = useAssignGoodsToContainer();
  const unassignedGoods = useMemo(() => extractGoods(data), [data]);

  const handleScanned = useCallback(
    ({ data: code }: { data: string }) => {
      if (lockRef.current || !code) return;
      if (normalize(code) === lastCodeRef.current) return;
      lockRef.current = true;
      lastCodeRef.current = normalize(code);

      const match = unassignedGoods.find((g) => matchesCode(g, code));

      if (!match) {
        setFeedback({ tone: 'error', message: `Code introuvable ou déjà assigné : ${code}` });
        setTimeout(() => { lockRef.current = false; lastCodeRef.current = ''; }, 1500);
        return;
      }
      if (assignedIds.includes(match._id)) {
        setFeedback({ tone: 'info', message: `Déjà ajouté : ${match.goodsId}` });
        setTimeout(() => { lockRef.current = false; lastCodeRef.current = ''; }, 1500);
        return;
      }

      assignMutation.mutate(
        { containerId, data: { goodsIds: [match._id] } },
        {
          onSuccess: () => {
            setAssignedIds((prev) => [...prev, match._id]);
            setFeedback({ tone: 'success', message: `Ajouté : ${match.goodsId} — ${match.description ?? ''}` });
          },
          onError: () => {
            setFeedback({ tone: 'error', message: `Échec de l’assignation : ${match.goodsId}` });
          },
          onSettled: () => {
            setTimeout(() => { lockRef.current = false; lastCodeRef.current = ''; }, 1200);
          },
        },
      );
    },
    [assignMutation, assignedIds, containerId, unassignedGoods],
  );

  const handleClose = () => {
    setFeedback(null);
    setAssignedIds([]);
    lockRef.current = false;
    lastCodeRef.current = '';
    onDismiss();
  };

  const feedbackColor =
    feedback?.tone === 'success'
      ? colors.status.success
      : feedback?.tone === 'error'
        ? colors.status.error
        : colors.status.info;

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={handleClose}>
      <View style={[styles.root, { backgroundColor: colors.background.default }]}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text.primary }]}>Scanner pour assigner</Text>
          <Text style={[styles.subtitle, { color: colors.text.secondary }]}>
            {assignedIds.length} colis ajouté{assignedIds.length > 1 ? 's' : ''} · {unassignedGoods.length} disponibles
          </Text>
        </View>

        {!permission ? (
          <View style={styles.center}>
            <Text style={{ color: colors.text.secondary }}>Initialisation de la caméra…</Text>
          </View>
        ) : !permission.granted ? (
          <View style={styles.center}>
            <Ionicons name="camera-outline" size={48} color={colors.text.secondary} />
            <Text style={[styles.permText, { color: colors.text.secondary }]}>
              L’accès à la caméra est nécessaire pour scanner les colis.
            </Text>
            <Button mode="contained" onPress={requestPermission} style={styles.permButton}>
              Autoriser la caméra
            </Button>
          </View>
        ) : (
          <View style={styles.cameraWrap}>
            <CameraView
              onBarcodeScanned={handleScanned}
              barcodeScannerSettings={{ barcodeTypes: ['qr', 'code128', 'code39', 'ean13'] }}
              style={StyleSheet.absoluteFillObject}
            />
            <View style={styles.overlay} pointerEvents="none">
              <View style={[styles.target, { borderColor: colors.text.inverse }]} />
            </View>
            {feedback && (
              <View style={[styles.feedback, { backgroundColor: feedbackColor }]}>
                <Ionicons
                  name={
                    feedback.tone === 'success'
                      ? 'checkmark-circle'
                      : feedback.tone === 'error'
                        ? 'close-circle'
                        : 'information-circle'
                  }
                  size={18}
                  color={colors.text.inverse}
                />
                <Text style={[styles.feedbackText, { color: colors.text.inverse }]} numberOfLines={2}>
                  {feedback.message}
                </Text>
              </View>
            )}
          </View>
        )}

        <View style={styles.footer}>
          <Button mode="contained" onPress={handleClose} style={styles.doneButton}>
            Terminer ({assignedIds.length})
          </Button>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1 },
  header: { paddingHorizontal: 20, paddingTop: 56, paddingBottom: 14 },
  title: { fontSize: 22, fontWeight: '900' },
  subtitle: { marginTop: 4, fontSize: 13, fontWeight: '600' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32, gap: 14 },
  permText: { textAlign: 'center', fontSize: 14, fontWeight: '600' },
  permButton: { borderRadius: 8 },
  cameraWrap: { flex: 1, marginHorizontal: 16, borderRadius: 16, overflow: 'hidden' },
  overlay: { ...StyleSheet.absoluteFillObject, alignItems: 'center', justifyContent: 'center' },
  target: { width: 220, height: 220, borderWidth: 3, borderRadius: 16 },
  feedback: { position: 'absolute', left: 16, right: 16, bottom: 20, flexDirection: 'row', alignItems: 'center', gap: 10, padding: 12, borderRadius: 10 },
  feedbackText: { flex: 1, fontSize: 13, fontWeight: '700' },
  footer: { padding: 16, paddingBottom: 28 },
  doneButton: { borderRadius: 8 },
});

export default ScanToAssignModal;
