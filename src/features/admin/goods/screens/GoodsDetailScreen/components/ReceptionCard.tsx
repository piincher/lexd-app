import React, { useMemo } from 'react';
import { View } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
import {  createStyles  } from '../GoodsDetailScreen.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';


interface ReceptionCardProps {
  receivedAt?: string;
  receivedByName?: string;
  receivedBy?: { firstName?: string; lastName?: string } | null;
  formatDate: (dateString?: string) => string;
}

export const ReceptionCard: React.FC<ReceptionCardProps> = ({ receivedAt, receivedByName, receivedBy, formatDate }) => {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  // Get receiver name from receivedByName or from populated receivedBy object
  const receiverName = receivedByName || 
    (receivedBy ? `${receivedBy.firstName || ''} ${receivedBy.lastName || ''}`.trim() : null) || 
    'N/A';
  
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
          <Text style={styles.receptionValue}>{formatDate(receivedAt)}</Text>
        </View>
        <View style={styles.receptionItem}>
          <Text style={styles.receptionLabel}>Reçu par</Text>
          <Text style={styles.receptionValue}>{receiverName}</Text>
        </View>
      </View>
    </Card.Content>
  </Card>
  );
};
