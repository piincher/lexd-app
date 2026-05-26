import React from 'react';
import { View } from 'react-native';
import { Text, Card } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { CUSTOMER_AIR_STATUS_LABELS } from '@src/shared/lib/customerStatus';
import { createStyles } from './AirwayBillTrackingTimeline.styles';

type MaterialIconName = React.ComponentProps<typeof MaterialCommunityIcons>['name'];

const AWB_STATUS_STEPS = [
  { key: 'CREATED', label: CUSTOMER_AIR_STATUS_LABELS.CREATED, icon: 'file-document' },
  { key: 'PACKING', label: CUSTOMER_AIR_STATUS_LABELS.PACKING, icon: 'cube-outline' },
  { key: 'READY_FOR_DEPARTURE', label: CUSTOMER_AIR_STATUS_LABELS.READY_FOR_DEPARTURE, icon: 'clock-check' },
  { key: 'IN_TRANSIT', label: CUSTOMER_AIR_STATUS_LABELS.IN_TRANSIT, icon: 'airplane' },
  { key: 'ARRIVED', label: CUSTOMER_AIR_STATUS_LABELS.ARRIVED, icon: 'map-marker-check' },
  { key: 'READY_FOR_PICKUP', label: CUSTOMER_AIR_STATUS_LABELS.READY_FOR_PICKUP, icon: 'hand-wave' },
  { key: 'DELIVERED', label: CUSTOMER_AIR_STATUS_LABELS.DELIVERED, icon: 'check-circle' },
] satisfies { key: string; label: string; icon: MaterialIconName }[];

interface Props {
  currentStepIndex: number;
}

export const AirwayBillTrackingTimeline: React.FC<Props> = ({ currentStepIndex }) => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);
  const STATUS_COLORS: Record<string, string> = {
    CREATED: colors.neutral[400],
    PACKING: colors.primary[400],
    READY_FOR_DEPARTURE: colors.accent.gold,
    IN_TRANSIT: colors.status.info,
    ARRIVED: colors.status.success,
    READY_FOR_PICKUP: colors.accent.mint,
    DELIVERED: colors.status.success,
  };
  return (
    <>
      <Text style={styles.sectionTitle}>Suivi</Text>
      <Card style={styles.card}>
        <Card.Content>
          {AWB_STATUS_STEPS.map((step, index) => {
            const isCompleted = index <= currentStepIndex;
            const isCurrent = index === currentStepIndex;
            const color = isCompleted ? STATUS_COLORS[step.key] : colors.neutral[300];

            return (
              <View key={step.key} style={styles.timelineItem}>
                <View style={[styles.timelineIcon, { backgroundColor: isCompleted ? `${color}20` : colors.neutral[100] }]}>
                  <MaterialCommunityIcons
                    name={step.icon}
                    size={20}
                    color={isCompleted ? color : colors.neutral[400]}
                  />
                </View>
                <View style={styles.timelineContent}>
                  <Text style={[styles.timelineLabel, { color: isCompleted ? colors.neutral[800] : colors.neutral[400] }]}>
                    {step.label}
                  </Text>
                  {isCurrent && <Text style={styles.timelineCurrent}>En cours</Text>}
                </View>
                {index < AWB_STATUS_STEPS.length - 1 && (
                  <View style={[styles.timelineConnector, { backgroundColor: index < currentStepIndex ? color : colors.neutral[200] }]} />
                )}
              </View>
            );
          })}
        </Card.Content>
      </Card>
    </>
  );
};
