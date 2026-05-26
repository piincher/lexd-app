import React, { useState } from 'react';
import { View, Image, Share } from 'react-native';
import { Card, Button, Text } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { hapticSelection, hapticSuccess } from '@src/shared/lib/haptics';
import { createStyles } from '../GoodsDetailScreen.styles';
import { GoodsQRCodeShareModal } from '../../../components/GoodsQRCode/GoodsQRCodeShareModal';

interface QRCardProps {
  hasQRCode: boolean;
  qrCodeImageUrl?: string;
  goodsId: string;
}

export const QRCard: React.FC<QRCardProps> = ({ hasQRCode, qrCodeImageUrl, goodsId }) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);
  const [shareModalVisible, setShareModalVisible] = useState(false);
  const canShare = hasQRCode && !!qrCodeImageUrl;

  const openShareModal = () => {
    if (!canShare) return;
    hapticSelection();
    setShareModalVisible(true);
  };

  const closeShareModal = () => {
    setShareModalVisible(false);
  };

  const handleShareQR = async () => {
    if (!qrCodeImageUrl) return;

    try {
      await Share.share({
        title: `QR Code ${goodsId}`,
        message: `QR Code pour ${goodsId}\n${qrCodeImageUrl}`,
        url: qrCodeImageUrl,
      });
      hapticSuccess();
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
  <Card style={styles.qrCard}>
    <LinearGradient colors={[colors.background.card, colors.background.paper]} style={styles.qrGradient}>
      <View style={styles.qrHeader}>
        <MaterialCommunityIcons name="qrcode-scan" size={24} color={colors.primary.main} />
        <Text style={[styles.qrTitle, { color: colors.text.primary }]}>{"QR Code d'identification"}</Text>
      </View>

      {hasQRCode ? (
        <View style={styles.qrContent}>
          <View style={styles.qrImageContainer}>
            <Image source={{ uri: qrCodeImageUrl }} style={styles.qrImage} resizeMode="contain" />
          </View>
          <Text style={[styles.qrHint, { color: colors.text.secondary }]}>{"Scannez pour vérifier l'authenticité"}</Text>
          <Button
            mode="outlined"
            onPress={openShareModal}
            style={styles.shareButton}
            icon="share-variant"
            textColor={colors.primary.main}
            accessibilityLabel={`Partager le QR code de ${goodsId}`}
          >
            Partager
          </Button>
          {qrCodeImageUrl ? (
            <GoodsQRCodeShareModal
              visible={shareModalVisible}
              goodsId={goodsId}
              qrCodeImageUrl={qrCodeImageUrl}
              onDismiss={closeShareModal}
              onShare={handleShareQR}
            />
          ) : null}
        </View>
      ) : (
        <View style={styles.qrEmpty}>
          <MaterialCommunityIcons name="qrcode-remove" size={64} color={colors.text.disabled} />
          <Text style={[styles.qrEmptyText, { color: colors.text.secondary }]}>QR Code non disponible</Text>
        </View>
      )}
    </LinearGradient>
  </Card>
);
};
