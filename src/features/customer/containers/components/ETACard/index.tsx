import React from 'react';
import { View } from 'react-native';
import { Text, Card, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { useETACardStyles } from './ETACard.styles';

interface ETACardProps {
  estimatedArrival: string;
  progressPercentage: number;
  formatDate: (dateString?: string) => string;
}

export const ETACard: React.FC<ETACardProps> = ({
  estimatedArrival,
  progressPercentage,
  formatDate,
}) => {
  const theme = useTheme();
  const { colors } = useAppTheme();
  const styles = useETACardStyles();

  return (
    <Card style={[styles.sectionCard, { backgroundColor: `${theme.colors.primary}08` }]}>
      <Card.Content>
        <View style={styles.estimatedArrivalContainer}>
          <MaterialCommunityIcons
            name="calendar-clock"
            size={24}
            color={theme.colors.primary}
          />
          <View style={styles.etaTextContainer}>
            <Text style={styles.etaLabel}>Arrivée estimée</Text>
            <Text style={styles.etaValue}>{formatDate(estimatedArrival)}</Text>
          </View>
          <Text style={styles.progressPercent}>{Math.round(progressPercentage)}%</Text>
        </View>
      </Card.Content>
    </Card>
  );
};
