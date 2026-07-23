/**
 * PackingListStatusCard Component
 * Container status display
 * SRP: Display container status with appropriate colors
 */

import React from 'react';
import { View } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { format } from 'date-fns/format';
import { fr } from 'date-fns/locale';
import { styles } from './PackingListStatusCard.styles';

interface PackingListStatusCardProps {
  status: string;
  statusLabel: string;
  estimatedArrival?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getStatusColor = (status: string, colors: any) => {
  const colorsMap: Record<string, { bg: string; text: string; icon: string }> = {
    BOOKED: { bg: colors.feedback.infoBg, text: colors.status.info, icon: colors.status.info },
    EMPTY_TO_WAREHOUSE: { bg: colors.feedback.infoBg, text: colors.status.info, icon: colors.status.info },
    LOADING: { bg: colors.feedback.warningBg, text: colors.status.warning, icon: colors.status.warning },
    LOADED: { bg: colors.feedback.infoBg, text: colors.status.info, icon: colors.status.info },
    GATE_IN_FULL: { bg: colors.feedback.infoBg, text: colors.status.info, icon: colors.status.info },
    LOADED_ON_VESSEL: { bg: colors.feedback.infoBg, text: colors.status.info, icon: colors.status.info },
    IN_TRANSIT: { bg: colors.feedback.infoBg, text: colors.status.info, icon: colors.status.info },
    ARRIVED: { bg: colors.feedback.successBg, text: colors.status.success, icon: colors.status.success },
    DISCHARGED: { bg: colors.feedback.successBg, text: colors.status.success, icon: colors.status.success },
    READY_FOR_PICKUP: { bg: colors.feedback.warningBg, text: colors.status.warning, icon: colors.status.warning },
    DELIVERED: { bg: colors.feedback.successBg, text: colors.status.success, icon: colors.status.success },
  };
  return colorsMap[status] || { bg: colors.background.paper, text: colors.text.secondary, icon: colors.text.secondary };
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
  const { colors } = useAppTheme();
  const statusColors = getStatusColor(status, colors);

  return (
    <Card style={[styles.statusCard, { backgroundColor: statusColors.bg, borderColor: colors.border }]}>
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
