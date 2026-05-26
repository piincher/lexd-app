import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { ShimmerBlock } from '@src/shared/ui';
import { OperationsAnalyticsResponse } from '../../types';
import { createStaffActivityStyles } from './StaffActivityCard.styles';

interface StaffActivityCardProps {
  staffActivity?: OperationsAnalyticsResponse['staffActivity'];
  isLoading?: boolean;
}

export const StaffActivityCard: React.FC<StaffActivityCardProps> = ({ staffActivity, isLoading }) => {
  const { colors } = useAppTheme();
  const topAdmins = staffActivity?.byAdmin.slice(0, 3) || [];
  const recentRisk = staffActivity?.recentHighRisk.slice(0, 3) || [];
  const styles = createStaffActivityStyles(colors);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ShimmerBlock width="45%" height={16} borderRadius={4} />
        <View style={styles.summaryRow}>
          {Array.from({ length: 3 }).map((_, index) => (
            <ShimmerBlock key={index} width="30%" height={54} borderRadius={12} />
          ))}
        </View>
      </View>
    );
  }

  if (!staffActivity) return null;

  return (
    <Animated.View entering={FadeInUp.delay(360).springify().damping(15)} style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Activité équipe</Text>
          <Text style={styles.subtitle}>Audit et actions sensibles</Text>
        </View>
        <View style={styles.iconBox}>
          <Ionicons name="shield-checkmark-outline" size={18} color={colors.status.warning} />
        </View>
      </View>
      <View style={styles.summaryRow}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryValue}>{staffActivity.totalActions}</Text>
          <Text style={styles.summaryLabel}>Actions</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={[styles.summaryValue, { color: colors.status.warning }]}>{staffActivity.highSeverityCount}</Text>
          <Text style={styles.summaryLabel}>Sensibles</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={[styles.summaryValue, { color: colors.status.error }]}>{staffActivity.failedCount}</Text>
          <Text style={styles.summaryLabel}>Échecs</Text>
        </View>
      </View>
      {topAdmins.length === 0 && recentRisk.length === 0 ? (
        <Text style={styles.emptyText}>Aucune activité récente</Text>
      ) : (
        <>
          {topAdmins.map((admin) => (
            <View key={`${admin.actorId || admin.name}`} style={styles.row}>
              <Text style={styles.rowText} numberOfLines={1}>{admin.name}</Text>
              <Text style={styles.rowMeta}>{admin.count} actions</Text>
            </View>
          ))}
          {recentRisk.map((event) => (
            <View key={event.id} style={styles.row}>
              <Text style={styles.rowText} numberOfLines={1}>{event.action}</Text>
              <Text style={styles.rowMeta}>{event.severity}</Text>
            </View>
          ))}
        </>
      )}
    </Animated.View>
  );
};
