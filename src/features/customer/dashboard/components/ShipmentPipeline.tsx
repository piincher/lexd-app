/**
 * ShipmentPipeline Component
 * Visual status breakdown showing goods at each stage of the shipping pipeline
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';

interface PipelineStage {
  key: string;
  label: string;
  icon: string;
  count: number;
  color: string;
}

export interface ShipmentPipelineProps {
  goodsByStatus: Record<string, number>;
  totalGoods: number;
}

const PIPELINE_STAGES: Omit<PipelineStage, 'count'>[] = [
  { key: 'received', label: 'Recu', icon: 'archive-outline', color: '#8B5CF6' },
  { key: 'inContainer', label: 'Chargement', icon: 'cube-outline', color: '#0EA5E9' },
  { key: 'inTransit', label: 'En Transit', icon: 'airplane-outline', color: '#F59E0B' },
  { key: 'arrived', label: 'Arrive', icon: 'flag-outline', color: '#10B981' },
  { key: 'ready', label: 'Pret', icon: 'checkmark-circle-outline', color: '#22C55E' },
  { key: 'delivered', label: 'Livre', icon: 'home-outline', color: '#059669' },
];

export const ShipmentPipeline: React.FC<ShipmentPipelineProps> = ({
  goodsByStatus,
  totalGoods,
}) => {
  const stages: PipelineStage[] = PIPELINE_STAGES.map((stage) => ({
    ...stage,
    count: goodsByStatus[stage.key] || 0,
  }));

  const hasData = totalGoods > 0;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Suivi des Marchandises</Text>
      <Text style={styles.subtitle}>
        {hasData
          ? `${totalGoods} marchandise${totalGoods > 1 ? 's' : ''} au total`
          : 'Vos marchandises apparaitront ici'}
      </Text>

      <View style={styles.pipelineContainer}>
        {stages.map((stage, index) => {
          const isActive = stage.count > 0;
          const barWidth = totalGoods > 0 ? (stage.count / totalGoods) * 100 : 0;

          return (
            <View key={stage.key} style={styles.stageRow}>
              {/* Icon + Label */}
              <View style={styles.stageLeft}>
                <View style={[
                  styles.iconCircle,
                  { backgroundColor: isActive ? `${stage.color}15` : Theme.neutral[100] },
                ]}>
                  <Ionicons
                    name={stage.icon as any}
                    size={16}
                    color={isActive ? stage.color : Theme.neutral[300]}
                  />
                </View>
                <Text style={[
                  styles.stageLabel,
                  { color: isActive ? Theme.neutral[700] : Theme.neutral[400] },
                ]}>
                  {stage.label}
                </Text>
              </View>

              {/* Bar + Count */}
              <View style={styles.stageRight}>
                <View style={styles.barTrack}>
                  <View
                    style={[
                      styles.barFill,
                      {
                        width: `${Math.max(barWidth, isActive ? 8 : 0)}%`,
                        backgroundColor: stage.color,
                      },
                    ]}
                  />
                </View>
                <Text style={[
                  styles.stageCount,
                  { color: isActive ? stage.color : Theme.neutral[300] },
                ]}>
                  {stage.count}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    ...Theme.shadows.sm,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: Theme.neutral[800],
  },
  subtitle: {
    fontSize: 12,
    color: Theme.neutral[400],
    marginTop: 2,
    marginBottom: 16,
  },
  pipelineContainer: {
    gap: 10,
  },
  stageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  stageLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 110,
    gap: 8,
  },
  iconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stageLabel: {
    fontSize: 12,
    fontWeight: '600',
    flex: 1,
  },
  stageRight: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  barTrack: {
    flex: 1,
    height: 6,
    backgroundColor: Theme.neutral[100],
    borderRadius: 3,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 3,
  },
  stageCount: {
    fontSize: 13,
    fontWeight: '700',
    width: 24,
    textAlign: 'right',
  },
});

export default ShipmentPipeline;
