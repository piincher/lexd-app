import React from 'react';
import { View } from 'react-native';
import { Text, Card, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import type { ContainerETA } from '../../types';
import { useETACardStyles } from './ETACard.styles';

interface ETACardProps {
  estimatedArrival: string;
  progressPercentage: number;
  formatDate: (dateString?: string) => string;
  eta?: ContainerETA;
}

export const ETACard: React.FC<ETACardProps> = ({
  estimatedArrival,
  progressPercentage,
  formatDate,
  eta,
}) => {
  const theme = useTheme();
  const { colors } = useAppTheme();
  const styles = useETACardStyles();
  const displayDate = eta?.estimatedArrival
    ? eta.estimatedArrival.toString()
    : estimatedArrival;
  const isDelayed = Boolean(eta?.isDelayed);
  const confidence = eta?.confidence ? String(eta.confidence).toLowerCase() : null;
  const source = eta?.source ? String(eta.source).replace(/_/g, ' ') : null;

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
            <Text style={styles.etaValue}>{formatDate(displayDate)}</Text>
          </View>
          <Text style={styles.progressPercent}>{Math.round(progressPercentage)}%</Text>
        </View>
        <View style={styles.metaGrid}>
          {eta?.daysRemaining !== undefined && eta.daysRemaining !== null && (
            <View style={styles.metaPill}>
              <Text style={styles.metaLabel}>Jours restants</Text>
              <Text style={styles.metaValue}>{Math.max(eta.daysRemaining, 0)}</Text>
            </View>
          )}
          {confidence && (
            <View style={styles.metaPill}>
              <Text style={styles.metaLabel}>Confiance</Text>
              <Text style={styles.metaValue}>{confidence}</Text>
            </View>
          )}
          {source && (
            <View style={styles.metaPillWide}>
              <Text style={styles.metaLabel}>Source</Text>
              <Text style={styles.metaValue}>{source}</Text>
            </View>
          )}
        </View>
        {isDelayed && (
          <View style={styles.delayBanner}>
            <MaterialCommunityIcons name="alert-circle-outline" size={18} color={colors.status.warning} />
            <Text style={styles.delayText}>
              Retard estimé{eta?.delayDays ? `: ${eta.delayDays} jour(s)` : ''}
            </Text>
          </View>
        )}
      </Card.Content>
    </Card>
  );
};
