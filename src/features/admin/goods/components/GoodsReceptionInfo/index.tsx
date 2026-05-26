/**
 * GoodsReceptionInfo - Display reception details
 * SRP: Show reception date and receiver info
 */

import React from 'react';
import { View } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createStyles } from './GoodsReceptionInfo.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface Receiver {
  firstName?: string;
  lastName?: string;
}

interface GoodsReceptionInfoProps {
  receivedAt?: string;
  receivedBy?: Receiver | string;
  receivedByName?: string;
}

export const GoodsReceptionInfo: React.FC<GoodsReceptionInfoProps> = ({
  receivedAt,
  receivedBy,
  receivedByName,
}) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getReceiverName = () => {
    if (receivedByName) return receivedByName;
    if (typeof receivedBy === 'object' && receivedBy) {
      return `${receivedBy.firstName} ${receivedBy.lastName}`;
    }
    return 'N/A';
  };

  const { colors, isDark } = useAppTheme();

  const styles = createStyles(colors, isDark);

  return (
    <Card style={styles.container}>
      <Card.Content>
        <View style={styles.header}>
          <MaterialCommunityIcons name="calendar-check" size={20} color={colors.primary[600]} />
          <Text style={styles.title}>Réception</Text>
        </View>

        <View style={styles.grid}>
          <View style={styles.item}>
            <Text style={styles.label}>Date de réception</Text>
            <Text style={styles.value}>{formatDate(receivedAt || '')}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.label}>Reçu par</Text>
            <Text style={styles.value}>{getReceiverName()}</Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};
