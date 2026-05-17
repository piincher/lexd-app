import React, { useMemo } from 'react';
import { View, Image } from 'react-native';
import { Card, Button, Text } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from '../GoodsDetailScreen.styles';
import { Theme } from '@src/constants/Theme';

interface QRCardProps {
  hasQRCode: boolean;
  qrCodeImageUrl?: string;
  goodsId: string;
  onShare: () => void;
}

export const QRCard: React.FC<QRCardProps> = ({ hasQRCode, qrCodeImageUrl, goodsId, onShare }) => {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  return (
  <Card style={styles.qrCard}>
    <LinearGradient colors={[colors.background.card, colors.background.paper]} style={styles.qrGradient}>
      <View style={styles.qrHeader}>
        <MaterialCommunityIcons name="qrcode-scan" size={24} color={colors.primary.main} />
        <Text style={[styles.qrTitle, { color: colors.text.primary }]}>QR Code d'identification</Text>
      </View>

      {hasQRCode ? (
        <View style={styles.qrContent}>
          <View style={styles.qrImageContainer}>
            <Image source={{ uri: qrCodeImageUrl }} style={styles.qrImage} resizeMode="contain" />
          </View>
          <Text style={[styles.qrHint, { color: colors.text.secondary }]}>Scannez pour vérifier l'authenticité</Text>
          <Button
            mode="outlined"
            onPress={onShare}
            style={styles.shareButton}
            icon="share-variant"
            textColor={colors.primary.main}
          >
            Partager
          </Button>
        </View>
      ) : (
        <View style={styles.qrEmpty}>
          <MaterialCommunityIcons name="qrcode-off" size={64} color={colors.text.disabled} />
          <Text style={[styles.qrEmptyText, { color: colors.text.secondary }]}>QR Code non disponible</Text>
        </View>
      )}
    </LinearGradient>
  </Card>
);
};
