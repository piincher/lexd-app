import React from 'react';
import { View } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
import { styles } from '../GoodsDetailScreen.styles';
import { Goods } from '../../../types';

interface ReceptionCardProps {
  goods: Goods;
  formatDate: (dateString: string) => string;
}

export const ReceptionCard: React.FC<ReceptionCardProps> = ({ goods, formatDate }) => {
  const receivedByName = goods.receivedByName ||
    (typeof goods.receivedBy === 'object'
      ? `${goods.receivedBy.firstName} ${goods.receivedBy.lastName}`
      : 'N/A');

  return (
    <Card style={styles.sectionCard}>
      <Card.Content>
        <View style={styles.sectionHeader}>
          <MaterialCommunityIcons name="calendar-check" size={20} color={Theme.primary[600]} />
          <Text style={styles.sectionTitle}>Réception</Text>
        </View>
        <View style={styles.receptionGrid}>
          <View style={styles.receptionItem}>
            <Text style={styles.receptionLabel}>Date de réception</Text>
            <Text style={styles.receptionValue}>{formatDate(goods.receivedAt)}</Text>
          </View>
          <View style={styles.receptionItem}>
            <Text style={styles.receptionLabel}>Reçu par</Text>
            <Text style={styles.receptionValue}>{receivedByName}</Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};
