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

// The pickup code is only actionable while the item is awaiting collection.
const CODE_VISIBLE_STATUSES = new Set(['APPROVED', 'READY_FOR_PICKUP']);

export const ProductRedemptionCard: React.FC<ProductRedemptionCardProps> = ({
  redemption,
  onCancel,
  isCancelling,
}) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);

  const itemName = redemption.rewardItem?.name || 'Récompense';
  const imageUrl = redemption.rewardItem?.imageUrl;
  const showCode = !!redemption.pickupCode && CODE_VISIBLE_STATUSES.has(redemption.status);
  const isPickup = (redemption.rewardItem?.pickupMethod || redemption.pickupMethod) !== 'DELIVERY';

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          {imageUrl ? (
            <Image source={{ uri: imageUrl }} style={styles.image} contentFit="cover" />
          ) : (
            <View style={styles.imagePlaceholder}>
              <MaterialCommunityIcons name="gift-outline" size={22} color={colors.primary.main} />
            </View>
          )}
          <View style={{ flex: 1 }}>
            <Text style={styles.name} numberOfLines={2}>{itemName}</Text>
            <Text style={styles.meta}>
              Qté {redemption.quantity} · {formatDate(redemption.createdAt)}
            </Text>
            <Text style={styles.points}>{redemption.requestedPoints} pts</Text>
          </View>
        </View>
        <RedemptionStatusBadgeV2 status={redemption.status} size="sm" />
      </View>

      {/* Pickup code — present this at the counter to collect the item. */}
      {showCode && (
        <View style={styles.pickupBox}>
          <Text style={styles.pickupLabel}>Code de retrait</Text>
          <Text style={styles.pickupCode}>{redemption.pickupCode}</Text>
          <Text style={styles.pickupHint}>
            {isPickup
              ? 'Présentez ce code au comptoir pour retirer votre article.'
              : 'Communiquez ce code au livreur lors de la remise.'}
          </Text>
        </View>
      )}

      {redemption.status === 'REJECTED' && redemption.rejectionReason ? (
        <View style={styles.rejectBox}>
          <Text style={styles.rejectLabel}>Motif du refus</Text>
          <Text style={styles.rejectText}>{redemption.rejectionReason}</Text>
        </View>
      ) : null}

      {redemption.adminRemarks ? (
        <View style={styles.remarkBox}>
          <Text style={styles.remarkLabel}>Note de l’équipe</Text>
          <Text style={styles.remarkText}>{redemption.adminRemarks}</Text>
        </View>
      ) : null}

      {redemption.status === 'PENDING' && (
        <TouchableOpacity
          style={[styles.cancelButton, isCancelling && styles.cancelDisabled]}
          onPress={() => onCancel(redemption.id)}
          disabled={isCancelling}
          activeOpacity={0.8}
        >
          <MaterialCommunityIcons name="close-circle-outline" size={16} color={colors.status.error} />
          <Text style={styles.cancelText}>
            {isCancelling ? 'Annulation…' : 'Annuler la demande'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
