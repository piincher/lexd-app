import React, { useState } from 'react';
import { Image, Modal, Pressable, Share, StyleSheet, View } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { Button, Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { formatCurrency } from '@src/shared/lib/currency';
import { useAppTheme } from '@src/providers/ThemeProvider';
import type { Goods } from '../../../types';

interface ReceiveLabelModalProps {
  visible: boolean;
  goods: Goods | null;
  onDismiss: () => void;
}

const getClientName = (goods: Goods) => {
  if (!goods.clientId || typeof goods.clientId === 'string') return 'Client inconnu';
  return `${goods.clientId.firstName || ''} ${goods.clientId.lastName || ''}`.trim() || goods.clientId.phoneNumber;
};

export const ReceiveLabelModal: React.FC<ReceiveLabelModalProps> = ({ visible, goods, onDismiss }) => {
  const { colors } = useAppTheme();
  const [copied, setCopied] = useState(false);
  if (!goods) return null;

  const labelText = [
    `Goods: ${goods.goodsId}`,
    `Client: ${getClientName(goods)}`,
    `Mode: ${goods.shippingMode || 'SEA'}`,
    `Emplacement: ${goods.warehouseLocation}`,
    `Suivi: ${goods.expressTrackingNumber || '-'}`,
    `Montant: ${formatCurrency(goods.totalCost || 0)}`,
  ].join('\n');

  const copyLabel = async () => {
    await Clipboard.setStringAsync(labelText);
    setCopied(true);
  };

  const shareLabel = () => Share.share({
    title: `Étiquette ${goods.goodsId}`,
    message: goods.qrCodeImageUrl ? `${labelText}\n${goods.qrCodeImageUrl}` : labelText,
  });

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onDismiss}>
      <Pressable style={styles.overlay} onPress={onDismiss}>
        <Pressable style={[styles.sheet, { backgroundColor: colors.background.card }]} onPress={(event) => event.stopPropagation()}>
          <View style={[styles.handle, { backgroundColor: colors.border }]} />
          <View style={styles.header}>
            <View>
              <Text style={[styles.kicker, { color: colors.primary.main }]}>Étiquette réception</Text>
              <Text style={[styles.title, { color: colors.text.primary }]}>{goods.goodsId}</Text>
            </View>
            <Pressable onPress={onDismiss} style={styles.closeButton}>
              <MaterialCommunityIcons name="close" size={22} color={colors.text.secondary} />
            </Pressable>
          </View>
          <View style={[styles.labelCard, { backgroundColor: colors.background.paper, borderColor: colors.border }]}>
            {goods.qrCodeImageUrl ? (
              <Image source={{ uri: goods.qrCodeImageUrl }} style={styles.qr} resizeMode="contain" />
            ) : (
              <MaterialCommunityIcons name="qrcode-remove" size={64} color={colors.text.disabled} />
            )}
            <Text style={[styles.client, { color: colors.text.primary }]}>{getClientName(goods)}</Text>
            <Text style={[styles.meta, { color: colors.text.secondary }]}>
              {goods.shippingMode || 'SEA'} · {goods.warehouseLocation} · {goods.weight} kg
            </Text>
            <Text style={[styles.meta, { color: colors.text.secondary }]}>{goods.expressTrackingNumber || 'Sans suivi express'}</Text>
          </View>
          <View style={styles.actions}>
            <Button mode="contained" icon="share-variant" onPress={shareLabel} style={styles.action}>
              Partager
            </Button>
            <Button mode="outlined" icon={copied ? 'check' : 'content-copy'} onPress={copyLabel} style={styles.action}>
              {copied ? 'Copié' : 'Copier'}
            </Button>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.45)' },
  sheet: { padding: 16, borderTopLeftRadius: 18, borderTopRightRadius: 18 },
  handle: { alignSelf: 'center', width: 46, height: 4, borderRadius: 4, marginBottom: 14 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  kicker: { fontSize: 12, fontWeight: '800', textTransform: 'uppercase' },
  title: { fontSize: 22, fontWeight: '800', marginTop: 2 },
  closeButton: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
  labelCard: { marginTop: 16, borderRadius: 8, borderWidth: 1, padding: 16, alignItems: 'center' },
  qr: { width: 180, height: 180 },
  client: { marginTop: 12, fontSize: 16, fontWeight: '800' },
  meta: { marginTop: 4, fontSize: 13 },
  actions: { flexDirection: 'row', gap: 10, marginTop: 16 },
  action: { flex: 1, borderRadius: 8 },
});
