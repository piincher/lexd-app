import React from 'react';
import { View } from 'react-native';
import { Text, Card, Chip, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useContainerHeaderCardStyles } from './ContainerHeaderCard.styles';
import {
  CustomerContainer,
  CUSTOMER_STATUS_LABELS,
  SHIPPING_LINE_LABELS,
} from '../../types';

type MaterialIconName = React.ComponentProps<typeof MaterialCommunityIcons>['name'];

interface ContainerHeaderCardProps {
  container: CustomerContainer;
  statusColor: string;
  statusBgColor: string;
  getShippingModeIcon: (mode: 'SEA' | 'AIR') => MaterialIconName;
}

const NEXT_ACTION_LABELS: Record<string, string> = {
  BOOKED: 'Votre envoi est planifié. Nous préparons les prochaines étapes.',
  EMPTY_TO_WAREHOUSE: 'Préparation du chargement en cours.',
  LOADING: 'Vos marchandises sont en cours de chargement.',
  LOADED: 'Le chargement est terminé. Prochaine étape : départ.',
  GATE_IN_FULL: 'L’envoi est au port de départ.',
  LOADED_ON_VESSEL: 'L’envoi est chargé sur le navire.',
  IN_TRANSIT: 'Votre expédition est en route.',
  ARRIVED: 'L’envoi est arrivé. Nous préparons la remise des marchandises.',
  DISCHARGED: 'Le déchargement est terminé.',
  READY_FOR_PICKUP: 'Vos marchandises sont prêtes pour retrait.',
  DELIVERED: 'Cette expédition est livrée.',
};

export const ContainerHeaderCard: React.FC<ContainerHeaderCardProps> = ({
  container,
  statusColor,
  statusBgColor,
  getShippingModeIcon,
}) => {
  const theme = useTheme();
  const styles = useContainerHeaderCardStyles();
  const origin = container.route?.origin || 'Origine à confirmer';
  const destination = container.route?.destination || 'Destination à confirmer';
  const goodsCount = container.myGoods?.length || 0;
  const nextAction = NEXT_ACTION_LABELS[container.status] || 'Statut en cours de mise à jour.';

  return (
    <Card style={styles.headerCard}>
      <Card.Content>
        <View style={styles.headerRow}>
          <View style={styles.containerIconContainer}>
            <MaterialCommunityIcons
              name={getShippingModeIcon(container.shippingMode)}
              size={32}
              color={theme.colors.primary}
            />
          </View>
          <View style={styles.headerInfo}>
            <Text style={styles.containerNumber}>
              {container.virtualContainerNumber}
            </Text>
            <Text style={styles.shippingLine}>
              {SHIPPING_LINE_LABELS[container.shippingLine]}
            </Text>
          </View>
          <Chip
            style={[styles.statusChip, { backgroundColor: statusBgColor }]}
            textStyle={{ color: statusColor, fontWeight: '700' }}
          >
            {CUSTOMER_STATUS_LABELS[container.status]}
          </Chip>
        </View>
        <View style={styles.situationBox}>
          <Text style={styles.situationEyebrow}>Situation actuelle</Text>
          <Text style={styles.situationText}>{nextAction}</Text>
          <View style={styles.routeSummary}>
            <Text style={styles.routeText} numberOfLines={1}>{origin}</Text>
            <MaterialCommunityIcons name="arrow-right" size={14} color={theme.colors.primary} />
            <Text style={styles.routeText} numberOfLines={1}>{destination}</Text>
          </View>
          <Text style={styles.goodsText}>
            {goodsCount} marchandise{goodsCount > 1 ? 's' : ''} dans cette expédition
          </Text>
        </View>
      </Card.Content>
    </Card>
  );
};
