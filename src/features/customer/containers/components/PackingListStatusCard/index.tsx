/**
 * PackingListStatusCard Component
 * Container status display
 * SRP: Display container status with appropriate colors
 */

import React from 'react';
import { View } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
import { format } from 'date-fns/format';
import { fr } from 'date-fns/locale';
import { styles } from './PackingListStatusCard.styles';

interface PackingListStatusCardProps {
  status: string;
  statusLabel: string;
  estimatedArrival?: string;
}

const getStatusColor = (status: string) => {
  const colors: Record<string, { bg: string; text: string; icon: string }> = {
    BOOKED: { bg: '#EDE9FE', text: '#8B5CF6', icon: '#8B5CF6' },
    EMPTY_TO_WAREHOUSE: { bg: '#E0E7FF', text: '#6366F1', icon: '#6366F1' },
    LOADING: { bg: '#FEF3C7', text: '#F59E0B', icon: '#F59E0B' },
    LOADED: { bg: '#DBEAFE', text: '#3B82F6', icon: '#3B82F6' },
    GATE_IN_FULL: { bg: '#CFFAFE', text: '#06B6D4', icon: '#06B6D4' },
    LOADED_ON_VESSEL: { bg: '#DBEAFE', text: '#2563EB', icon: '#2563EB' },
    IN_TRANSIT: { bg: '#E0F2FE', text: '#0EA5E9', icon: '#0EA5E9' },
    ARRIVED: { bg: '#D1FAE5', text: '#10B981', icon: '#10B981' },
    DISCHARGED: { bg: '#CCFBF1', text: '#14B8A6', icon: '#14B8A6' },
    READY_FOR_PICKUP: { bg: '#FEF3C7', text: '#F59E0B', icon: '#F59E0B' },
    DELIVERED: { bg: '#DCFCE7', text: '#22C55E', icon: '#22C55E' },
  };
  return colors[status] || { bg: Theme.colors.background.paper, text: Theme.colors.text.secondary, icon: Theme.colors.text.secondary };
};

const formatDate = (dateString?: string): string => {
  if (!dateString) return 'Non disponible';
  try {
    return format(new Date(dateString), 'dd MMMM yyyy', { locale: fr });
  } catch {
    return dateString;
  }
};

export const PackingListStatusCard: React.FC<PackingListStatusCardProps> = ({
  status,
  statusLabel,
  estimatedArrival,
}) => {
  const statusColors = getStatusColor(status);

  return (
    <Card style={[styles.statusCard, { backgroundColor: statusColors.bg }]}>
      <Card.Content>
        <View style={styles.statusHeader}>
          <MaterialCommunityIcons
            name="information-outline"
            size={24}
            color={statusColors.icon}
          />
          <Text style={[styles.statusTitle, { color: statusColors.text }]}>
            Statut du Container
          </Text>
        </View>
        <Text style={[styles.statusValue, { color: statusColors.text }]}>
          {statusLabel}
        </Text>
        {estimatedArrival && (
          <Text style={[styles.estimatedText, { color: statusColors.text }]}>
            Arrivée estimée: {formatDate(estimatedArrival)}
          </Text>
        )}
      </Card.Content>
    </Card>
  );
};

export default PackingListStatusCard;
