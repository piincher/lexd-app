import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Theme } from '@src/constants/Theme';

interface GoodsDetailTimelineProps {
  status: string;
  shippingMode?: string;
}

const ALL_STEPS = [
  { key: 'RECEIVED_AT_WAREHOUSE', label: 'Réception', icon: 'checkmark-circle-outline' as const },
  { key: 'ASSIGNED_TO_CONTAINER', label: 'Assignation', icon: 'link-outline' as const },
  { key: 'LOADED_IN_CONTAINER', label: 'Chargement', icon: 'cube-outline' as const },
  { key: 'IN_TRANSIT', label: 'Transit', icon: 'airplane-outline' as const },
  { key: 'ARRIVED_DESTINATION', label: 'Arrivée', icon: 'location-outline' as const },
  { key: 'READY_FOR_PICKUP', label: 'Prêt', icon: 'hand-left-outline' as const },
  { key: 'DELIVERED', label: 'Livré', icon: 'checkmark-done-outline' as const },
];

export const GoodsDetailTimeline: React.FC<GoodsDetailTimelineProps> = ({ status, shippingMode }) => {
  const { colors } = useAppTheme();
  const currentIndex = ALL_STEPS.findIndex(s => s.key === status);

  const steps = shippingMode === 'AIR'
    ? ALL_STEPS.filter(s => !['ASSIGNED_TO_CONTAINER', 'LOADED_IN_CONTAINER'].includes(s.key))
    : ALL_STEPS;

  return (
    <Card style={[styles.card, { backgroundColor: colors.background.card }]}>
      <Card.Content>
        <View style={styles.header}>
          <Ionicons name="time-outline" size={20} color={colors.primary.main} />
          <Text style={[styles.title, { color: colors.text.primary }]}>Suivi du statut</Text>
        </View>
        <View style={styles.timeline}>
          {steps.map((step, index) => {
            const stepIndex = ALL_STEPS.findIndex(s => s.key === step.key);
            const isCompleted = currentIndex >= stepIndex;
            const isCurrent = currentIndex === stepIndex;
            const circleColor = isCompleted ? colors.status.success : colors.neutral[300];

            return (
              <View key={step.key} style={styles.step}>
                <View style={styles.stepIconRow}>
                  <View
                    style={[
                      styles.circle,
                      {
                        backgroundColor: isCurrent ? colors.primary.main : circleColor,
                        borderColor: isCurrent ? colors.primary.main : circleColor,
                      },
                    ]}
                  >
                    <Ionicons
                      name={(isCompleted && !isCurrent ? 'checkmark' : step.icon) as any}
                      size={14}
                      color={colors.text.inverse}
                    />
                  </View>
                  {index < steps.length - 1 && (
                    <View
                      style={[
                        styles.line,
                        { backgroundColor: currentIndex > stepIndex ? colors.status.success : colors.neutral[200] },
                      ]}
                    />
                  )}
                </View>
                <Text
                  style={[
                    styles.stepLabel,
                    {
                      color: isCurrent ? colors.primary.main : isCompleted ? colors.text.primary : colors.text.disabled,
                      fontWeight: isCurrent ? '700' : '500',
                    },
                  ]}
                >
                  {step.label}
                </Text>
              </View>
            );
          })}
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: { marginBottom: 12, borderRadius: Theme.radius.lg },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  title: { fontSize: 16, fontWeight: '700', marginLeft: 10 },
  timeline: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 4 },
  step: { alignItems: 'center', flex: 1 },
  stepIconRow: { alignItems: 'center', height: 32, justifyContent: 'center', width: '100%', position: 'relative' },
  circle: { width: 24, height: 24, borderRadius: 12, justifyContent: 'center', alignItems: 'center', zIndex: 2, borderWidth: 2 },
  line: { position: 'absolute', top: 11, left: '50%', right: '-50%', height: 2, zIndex: 1 },
  stepLabel: { fontSize: 11, marginTop: 6, textAlign: 'center' },
});
