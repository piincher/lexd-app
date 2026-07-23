import React, { useMemo } from 'react';
import { Pressable, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text } from 'react-native-paper';
import { useAppTheme } from '@src/providers/ThemeProvider';
import type { WorkQueueFilter } from '../../types';
import { createStyles } from './WorkQueueOverview.styles';

interface WorkQueueOverviewProps {
  counts: Record<WorkQueueFilter, number>;
  isPartialError: boolean;
  isTruncated: boolean;
  onOpenAssignments: () => void;
  onOpenPayments: () => void;
}

export const WorkQueueOverview: React.FC<WorkQueueOverviewProps> = ({
  counts, isPartialError, isTruncated, onOpenAssignments, onOpenPayments,
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = useMemo(() => createStyles(colors, isDark), [colors, isDark]);

  return (
    <View style={styles.container}>
      <View style={styles.headingRow}>
        <View>
          <Text style={styles.eyebrow}>CENTRE OPÉRATIONNEL</Text>
          <Text style={styles.title}>Priorités à résoudre</Text>
        </View>
        <View style={styles.totalChip}>
          <Text style={styles.totalValue}>{counts.all}</Text>
          <Text style={styles.totalLabel}>chargées</Text>
        </View>
      </View>

      <View style={styles.summaryRow}>
        <View style={styles.summaryCell}>
          <Text style={[styles.summaryValue, { color: colors.status.error }]}>{counts.critical}</Text>
          <Text style={styles.summaryLabel}>Critiques</Text>
        </View>
        <View style={styles.divider} />
        <Pressable
          style={({ pressed }) => [styles.summaryCell, pressed && styles.pressed]}
          onPress={onOpenAssignments}
          accessibilityRole="button"
          accessibilityLabel="Ouvrir toutes les marchandises à traiter"
          android_ripple={{ color: colors.primary.main + '18' }}
        >
          <Text style={styles.summaryValue}>{counts.goods}</Text>
          <Text style={styles.summaryLink}>Marchandises</Text>
        </Pressable>
        <View style={styles.divider} />
        <Pressable
          style={({ pressed }) => [styles.summaryCell, pressed && styles.pressed]}
          onPress={onOpenPayments}
          accessibilityRole="button"
          accessibilityLabel="Ouvrir tous les paiements en attente"
          android_ripple={{ color: colors.primary.main + '18' }}
        >
          <Text style={styles.summaryValue}>{counts.payment}</Text>
          <Text style={styles.summaryLink}>Paiements</Text>
        </Pressable>
      </View>

      {isPartialError || isTruncated ? (
        <View style={styles.notice}>
          <MaterialCommunityIcons name="information-outline" size={16} color={colors.status.warning} />
          <Text style={styles.noticeText}>
            {isPartialError ? 'Une source est indisponible. Les autres priorités restent utilisables.' : 'La file est volumineuse. Ouvrez une liste spécialisée pour tout afficher.'}
          </Text>
        </View>
      ) : null}
    </View>
  );
};
