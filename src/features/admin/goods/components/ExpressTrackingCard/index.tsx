import React from 'react';
import { View } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
import { styles } from './ExpressTrackingCard.styles';

interface ExpressTrackingCardProps {
  trackingNumber: string;
}

export const ExpressTrackingCard: React.FC<ExpressTrackingCardProps> = ({ trackingNumber }) => {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.header}>
          <MaterialCommunityIcons name="truck-fast" size={20} color={Theme.primary[600]} />
          <Text style={styles.title}>N° de suivi express</Text>
        </View>
        <Text style={styles.trackingNumber}>{trackingNumber}</Text>
      </Card.Content>
    </Card>
  );
};
