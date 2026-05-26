/**
 * GoodsQRCodeShareModal - Preview and share QR code actions.
 * Hallmark · component: modal · genre: editorial · theme: project tokens
 * states: default · pressed · focus via native a11y · disabled · loading · success
 * pre-emit critique: P4 H4 E4 S4 R5 V3
 */

import React, { useEffect, useState } from 'react';
import { Image, Modal, Pressable, Text, TouchableOpacity, View } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useAppTheme } from '@src/providers/ThemeProvider';
import { hapticSuccess } from '@src/shared/lib/haptics';
import { createShareModalStyles } from './GoodsQRCodeShareModal.styles';

interface GoodsQRCodeShareModalProps {
  visible: boolean;
  goodsId: string;
  qrCodeImageUrl: string;
  onDismiss: () => void;
  onShare: () => Promise<void>;
}

export const GoodsQRCodeShareModal: React.FC<GoodsQRCodeShareModalProps> = ({
  visible,
  goodsId,
  qrCodeImageUrl,
  onDismiss,
  onShare,
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = createShareModalStyles(colors, isDark);
  const [copied, setCopied] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  useEffect(() => {
    if (!visible) setCopied(false);
  }, [visible]);

  const handleCopy = async () => {
    await Clipboard.setStringAsync(qrCodeImageUrl);
    setCopied(true);
    hapticSuccess();
  };

  const handleShare = async () => {
    setIsSharing(true);
    try {
      await onShare();
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onDismiss}>
      <Pressable style={styles.overlay} onPress={onDismiss}>
        <Pressable style={styles.sheet} onPress={(event) => event.stopPropagation()}>
          <View style={styles.handle} />
          <View style={styles.header}>
            <View style={styles.titleBlock}>
              <Text style={styles.eyebrow}>Partage QR</Text>
              <Text style={styles.title}>Code marchandise</Text>
            </View>
            <TouchableOpacity
              onPress={onDismiss}
              style={styles.closeButton}
              accessibilityRole="button"
              accessibilityLabel="Fermer le partage du QR code"
            >
              <MaterialCommunityIcons name="close" size={22} color={colors.text.secondary} />
            </TouchableOpacity>
          </View>

          <View style={styles.previewPanel}>
            <View style={styles.qrFrame}>
              <Image source={{ uri: qrCodeImageUrl }} style={styles.qrImage} resizeMode="contain" />
            </View>
            <View style={styles.metaRow}>
              <MaterialCommunityIcons name="package-variant-closed" size={18} color={colors.primary.main} />
              <Text style={styles.goodsId} numberOfLines={1}>{goodsId}</Text>
            </View>
          </View>

          <View style={styles.actions}>
            <TouchableOpacity
              onPress={handleShare}
              style={[styles.actionButton, styles.primaryAction]}
              activeOpacity={0.82}
              disabled={isSharing}
              accessibilityRole="button"
              accessibilityLabel="Ouvrir le partage du QR code"
            >
              <MaterialCommunityIcons name="share-variant" size={20} color={colors.text.inverse} />
              <Text style={styles.primaryActionText}>{isSharing ? 'Ouverture...' : 'Partager maintenant'}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleCopy}
              style={[styles.actionButton, styles.secondaryAction]}
              activeOpacity={0.82}
              accessibilityRole="button"
              accessibilityLabel="Copier le lien du QR code"
            >
              <MaterialCommunityIcons
                name={copied ? 'check-circle-outline' : 'content-copy'}
                size={20}
                color={copied ? colors.status.success : colors.primary.main}
              />
              <Text style={[styles.secondaryActionText, copied && styles.successText]}>
                {copied ? 'Lien copié' : 'Copier le lien'}
              </Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};
