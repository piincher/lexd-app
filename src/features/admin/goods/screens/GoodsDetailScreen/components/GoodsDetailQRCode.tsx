// GoodsDetailQRCode - QR Code card section

import React from 'react';
import { View, Image } from 'react-native';
import { Text, Card, Button } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Theme } from '@src/constants/Theme';

interface GoodsDetailQRCodeProps {
  qrCodeImageUrl?: string;
  onShare: () => void;
}

export const GoodsDetailQRCode: React.FC<GoodsDetailQRCodeProps> = ({
  qrCodeImageUrl,
  onShare,
}) => {
  const { colors } = useAppTheme();
  const hasQRCode = !!qrCodeImageUrl;

  return (
    <Card style={styles.qrCard}>
      <LinearGradient colors={[colors.background.card, colors.background.paper]} style={styles.qrGradient}>
        <View style={styles.qrHeader}>
          <MaterialCommunityIcons name="qrcode-scan" size={24} color={Theme.primary[600]} />
          <Text style={styles.qrTitle}>QR Code d'identification</Text>
        </View>
        
        {hasQRCode ? (
          <View style={styles.qrContent}>
            <View style={styles.qrImageContainer}>
              <Image 
                source={{ uri: qrCodeImageUrl }} 
                style={styles.qrImage} 
                resizeMode="contain"
              />
            </View>
            <Text style={styles.qrHint}>Scannez pour vérifier l'authenticité</Text>
            <Button
              mode="outlined"
              onPress={onShare}
              style={styles.shareButton}
              icon="share-variant"
              textColor={Theme.primary[600]}
            >
              Partager
            </Button>
          </View>
        ) : (
          <View style={styles.qrEmpty}>
            <MaterialCommunityIcons name="qrcode-off" size={64} color={Theme.neutral[300]} />
            <Text style={styles.qrEmptyText}>QR Code non disponible</Text>
          </View>
        )}
      </LinearGradient>
    </Card>
  );
};

const styles = {
  qrCard: {
    marginBottom: 16,
    borderRadius: 20,
    overflow: 'hidden' as const,
    elevation: 4,
    shadowColor: Theme.primary[600],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  qrGradient: {
    padding: 20,
  },
  qrHeader: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    marginBottom: 16,
  },
  qrTitle: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: Theme.neutral[800],
    marginLeft: 10,
  },
  qrContent: {
    alignItems: 'center' as const,
  },
  qrImageContainer: {
    backgroundColor: Theme.colors.background.card,
    padding: 16,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: Theme.primary[200],
    elevation: 2,
  },
  qrImage: {
    width: 200,
    height: 200,
  },
  qrHint: {
    marginTop: 12,
    fontSize: 13,
    color: Theme.neutral[500],
    fontStyle: 'italic' as const,
  },
  shareButton: {
    marginTop: 16,
    borderColor: Theme.primary[600],
    borderRadius: 10,
  },
  qrEmpty: {
    alignItems: 'center' as const,
    paddingVertical: 30,
  },
  qrEmptyText: {
    marginTop: 12,
    fontSize: 14,
    color: Theme.neutral[500],
  },
};
