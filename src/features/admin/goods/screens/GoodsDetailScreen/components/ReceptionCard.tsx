import React from 'react';
import { View } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
import { styles } from '../GoodsDetailScreen.styles';


interface ReceptionCardProps {
  receivedAt: string;
  receivedByName?: string;
  formatDate: (dateString: string) => string;
}

export const ReceptionCard: React.FC<ReceptionCardProps> = ({ receivedAt, receivedByName, formatDate }) => (
  <Card style={styles.sectionCard}>
    <Card.Content>
      <View style={styles.sectionHeader}>
        <MaterialCommunityIcons name="calendar-check" size={20} color={Theme.primary[600]} />
        <Text style={styles.sectionTitle}>Réception</Text>
      </View>
      <View style={styles.receptionGrid}>
        <View style={styles.receptionItem}>
          <Text style={styles.receptionLabel}>Date de réception</Text>
          <Text style={styles.receptionValue}>{formatDate(receivedAt)}</Text>
        </View>
        <View style={styles.receptionItem}>
          <Text style={styles.receptionLabel}>Reçu par</Text>
          <Text style={styles.receptionValue}>{receivedByName || 'N/A'}</Text>
        </View>
      </View>
    </Card.Content>
  </Card>
);
