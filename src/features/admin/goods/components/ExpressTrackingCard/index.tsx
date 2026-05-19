import React from 'react';
import { View } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createStyles } from './ExpressTrackingCard.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface ExpressTrackingCardProps {
  trackingNumber: string;
}

export const ExpressTrackingCard: React.FC<ExpressTrackingCardProps> = ({ trackingNumber }) => {
  const { colors, isDark } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors, isDark), [colors, isDark]);
  return (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.header}>
          <MaterialCommunityIcons name="truck-fast" size={20} color={colors.primary[600]} />
          <Text style={styles.title}>N° de suivi express</Text>
        </View>
        <Text style={styles.trackingNumber}>{trackingNumber}</Text>
      </Card.Content>
    </Card>
  );
};
