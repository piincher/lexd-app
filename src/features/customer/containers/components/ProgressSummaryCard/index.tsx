import React from 'react';
import { View } from 'react-native';
import { Text, Card } from 'react-native-paper';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { useProgressSummaryCardStyles } from './ProgressSummaryCard.styles';

interface ProgressSummaryCardProps {
  currentWaypointIndex: number;
  waypointsLength: number;
  progressPercentage: number;
}

export const ProgressSummaryCard: React.FC<ProgressSummaryCardProps> = ({
  currentWaypointIndex,
  waypointsLength,
  progressPercentage,
}) => {
  const { colors } = useAppTheme();
  const styles = useProgressSummaryCardStyles();

  return (
    <Card style={styles.sectionCard}>
      <Card.Content>
        <View style={styles.progressRow}>
          <View style={styles.progressItem}>
            <Text style={styles.progressValue}>{currentWaypointIndex + 1}</Text>
            <Text style={styles.progressLabel}>Étape Actuelle</Text>
          </View>
          <View style={styles.progressDivider} />
          <View style={styles.progressItem}>
            <Text style={styles.progressValue}>{waypointsLength}</Text>
            <Text style={styles.progressLabel}>Total Étapes</Text>
          </View>
          <View style={styles.progressDivider} />
          <View style={styles.progressItem}>
            <Text style={[styles.progressValue, { color: colors.status.success }]}>
              {Math.round(progressPercentage)}%
            </Text>
            <Text style={styles.progressLabel}>Complété</Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};
