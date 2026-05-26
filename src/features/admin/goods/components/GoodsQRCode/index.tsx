/**
 * GoodsQRCode - Display QR code for goods identification
 * SRP: Show QR code image and share functionality
 */

import React, { useState } from 'react';
import { View, Image, Share } from 'react-native';
import { Card, Text, Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { useAppTheme } from '@src/providers/ThemeProvider';
import { hapticSelection, hapticSuccess } from '@src/shared/lib/haptics';
import { createStyles } from './GoodsQRCode.styles';
import { GoodsQRCodeShareModal } from './GoodsQRCodeShareModal';

interface GoodsQRCodeProps {
  goodsId: string;
  qrCodeImageUrl?: string;
}

export const GoodsQRCode: React.FC<GoodsQRCodeProps> = ({ goodsId, qrCodeImageUrl }) => {
  const { colors, isDark } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors, isDark), [colors, isDark]);
  const [shareModalVisible, setShareModalVisible] = useState(false);
  const hasQRCode = !!qrCodeImageUrl;

  const openShareModal = () => {
    if (!hasQRCode) return;
    hapticSelection();
    setShareModalVisible(true);
  };

  const closeShareModal = () => {
    setShareModalVisible(false);
  };

  const handleShareQR = async () => {
    if (qrCodeImageUrl) {
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
    }
  };

  return (
    <Card style={styles.container}>
      <LinearGradient colors={[colors.background.card, colors.background.paper]} style={styles.gradient}>
        <View style={styles.header}>
          <MaterialCommunityIcons name="qrcode-scan" size={24} color={colors.primary.main} />
          <Text style={styles.title}>{"QR Code d'identification"}</Text>
        </View>

        {hasQRCode ? (
          <View style={styles.content}>
            <View style={styles.imageContainer}>
              <Image source={{ uri: qrCodeImageUrl }} style={styles.image} resizeMode="contain" />
            </View>
            <Text style={styles.hint}>{"Scannez pour vérifier l'authenticité"}</Text>
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
            <GoodsQRCodeShareModal
              visible={shareModalVisible}
              goodsId={goodsId}
              qrCodeImageUrl={qrCodeImageUrl}
              onDismiss={closeShareModal}
              onShare={handleShareQR}
            />
          </View>
        ) : (
          <View style={styles.empty}>
            <MaterialCommunityIcons name="barcode-off" size={64} color={colors.text.disabled} />
            <Text style={styles.emptyText}>QR Code non disponible</Text>
          </View>
        )}
      </LinearGradient>
    </Card>
  );
};
