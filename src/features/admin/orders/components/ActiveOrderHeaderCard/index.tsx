import React from 'react';
import { View, Text } from 'react-native';
import { Chip, Surface } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createStyles } from './ActiveOrderHeaderCard.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface ActiveOrderHeaderCardProps {
  clientName?: string;
  clientPhone?: string;
  status?: string;
  isDelivered: boolean;
  isAir: boolean;
  orderPrice: number;
}

export const ActiveOrderHeaderCard: React.FC<ActiveOrderHeaderCardProps> = ({
  clientName,
  clientPhone,
  status,
  isDelivered,
  isAir,
  orderPrice,
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors, isDark), [colors, isDark]);
  const initials = clientName?.split(' ').map((n: string) => n[0]).join('') || '?';

  return (
    <Surface style={styles.card}>
      <View style={styles.headerRow}>
        <View style={styles.clientSection}>
          <View style={[styles.avatar, isDelivered ? styles.avatarDelivered : styles.avatarDefault]}>
            <Text style={[styles.avatarText, isDelivered ? styles.avatarTextDelivered : styles.avatarTextDefault]}>
              {initials}
            </Text>
          </View>
          <View style={styles.clientNameWrapper}>
            <Text style={styles.clientName} numberOfLines={1}>
              {clientName || 'Client'}
            </Text>
            <Text style={styles.clientPhone}>{clientPhone || '—'}</Text>
          </View>
        </View>

        <Chip
          style={[styles.chipStatus, isDelivered ? styles.chipStatusDelivered : undefined]}
          textStyle={[styles.chipStatusText, isDelivered ? styles.chipStatusTextDelivered : styles.chipStatusTextDefault]}
          compact
          icon={() => (
            <MaterialCommunityIcons
              name={isDelivered ? 'check-circle' : 'clock-outline'}
              size={14}
              color={isDelivered ? colors.status.success : colors.status.warning}
            />
          )}
        >
          {status || 'En attente'}
        </Chip>
      </View>

      <View style={styles.metaRow}>
        <Chip
          style={[styles.shippingModeChip, isAir ? styles.shippingModeChipAir : undefined]}
          textStyle={[styles.shippingModeChipText, isAir ? styles.shippingModeChipTextAir : styles.shippingModeChipTextSea]}
          compact
          icon={() => (
            <MaterialCommunityIcons
              name={isAir ? 'airplane' : 'ferry'}
              size={14}
              color={isAir ? colors.status.info : colors.status.success}
            />
          )}
        >
          {isAir ? 'Aérien' : 'Maritime'}
        </Chip>
        <View style={styles.priceColumn}>
          <Text style={styles.priceLabel}>Montant total</Text>
          <Text style={styles.priceValue}>
            {orderPrice > 0 ? `${orderPrice.toLocaleString()} FCFA` : 'Non défini'}
          </Text>
        </View>
      </View>
    </Surface>
  );
};

export default ActiveOrderHeaderCard;
