import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useAppTheme } from '@src/providers/ThemeProvider';
import type { ProductRedemption } from '../types';
import { RedemptionStatusBadgeV2 } from './RedemptionStatusBadgeV2';
import { createStyles } from './ProductRedemptionCard.styles';

interface ProductRedemptionCardProps {
  redemption: ProductRedemption;
  onCancel: (id: string) => void;
  isCancelling: boolean;
}

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

export const ProductRedemptionCard: React.FC<ProductRedemptionCardProps> = ({
  redemption,
  onCancel,
  isCancelling,
}) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image
            source={{ uri: '' }}
            style={styles.image}
            contentFit="cover"
          />
          <View style={{ flex: 1 }}>
            <Text style={styles.name} numberOfLines={2}>
              {redemption.rewardItemId || 'Récompense'}
            </Text>
            <Text style={styles.meta}>
              Qté: {redemption.quantity} · {formatDate(redemption.createdAt)}
            </Text>
            <Text style={styles.points}>{redemption.requestedPoints} pts</Text>
          </View>
        </View>
        <RedemptionStatusBadgeV2 status={redemption.status} size="sm" />
      </View>

      {redemption.adminRemarks ? (
        <View style={styles.remarkBox}>
          <Text style={styles.remarkLabel}>Note admin</Text>
          <Text style={styles.remarkText}>{redemption.adminRemarks}</Text>
        </View>
      ) : null}

      {redemption.status === 'PENDING' && (
        <TouchableOpacity
          style={[styles.cancelButton, isCancelling && styles.cancelDisabled]}
          onPress={() => onCancel(redemption.id)}
          disabled={isCancelling}
        >
          <MaterialCommunityIcons name="close-circle-outline" size={16} color={colors.status.error} />
          <Text style={styles.cancelText}>
            {isCancelling ? 'Annulation...' : 'Annuler'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
