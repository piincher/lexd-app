import React, { useCallback, useMemo, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, Divider } from 'react-native-paper';
import { Theme } from '@src/constants/Theme';
import type { RouteWaypointDraft, ShippingLine } from '@src/features/admin/routes/types';
import { WaypointEditorCard } from './WaypointEditorCard';
import { WaypointPresetToolbar } from './WaypointPresetToolbar';
import {
  createPresetWaypoints,
  createWaypoint,
  createWaypointsForShippingLine,
} from './routeWaypointOptions';

interface RouteWaypointsInputProps {
  waypoints: RouteWaypointDraft[];
  totalDays: number;
  shippingLine: ShippingLine | '';
  onChange: (waypoints: RouteWaypointDraft[]) => void;
}

const reorderWaypoints = (waypoints: RouteWaypointDraft[]) =>
  waypoints.map((waypoint, index) => ({ ...waypoint, order: index + 1 }));

export const RouteWaypointsInput: React.FC<RouteWaypointsInputProps> = ({
  waypoints,
  totalDays,
  shippingLine,
  onChange,
}) => {
  const [openPortMenuIndex, setOpenPortMenuIndex] = useState<number | null>(null);
  const safeTotalDays = Number.isFinite(totalDays) && totalDays > 0 ? totalDays : 90;

  const summary = useMemo(() => {
    if (waypoints.length === 0) return 'Aucune escale configurée';
    return waypoints.map((waypoint) => waypoint.location.city || 'Étape').join(' → ');
  }, [waypoints]);

  const handleApplyPreset = useCallback((labels: readonly string[]) => {
    onChange(createPresetWaypoints(labels, safeTotalDays));
  }, [onChange, safeTotalDays]);

  const handleGenerate = useCallback(() => {
    if (!shippingLine) return;
    onChange(createWaypointsForShippingLine(shippingLine, safeTotalDays));
  }, [onChange, shippingLine, safeTotalDays]);

  const handleAddWaypoint = useCallback(() => {
    onChange([
      ...waypoints,
      createWaypoint('', waypoints.length, waypoints.length + 1, safeTotalDays),
    ]);
  }, [onChange, safeTotalDays, waypoints]);

  const handleChangeWaypoint = useCallback((index: number, waypoint: RouteWaypointDraft) => {
    const next = [...waypoints];
    next[index] = waypoint;
    onChange(reorderWaypoints(next));
  }, [onChange, waypoints]);

  const handleMoveWaypoint = useCallback((index: number, direction: -1 | 1) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= waypoints.length) return;

    const next = [...waypoints];
    [next[index], next[targetIndex]] = [next[targetIndex], next[index]];
    onChange(reorderWaypoints(next));
  }, [onChange, waypoints]);

  const handleRemoveWaypoint = useCallback((index: number) => {
    onChange(reorderWaypoints(waypoints.filter((_, waypointIndex) => waypointIndex !== index)));
  }, [onChange, waypoints]);

  return (
    <View style={styles.container}>
      <Divider style={styles.divider} />
      <Text style={styles.title}>Éditeur des escales</Text>
      <Text style={styles.summary} numberOfLines={2}>{summary}</Text>

      <WaypointPresetToolbar
        shippingLine={shippingLine}
        onGenerate={handleGenerate}
        onApplyPreset={handleApplyPreset}
      />

      <View style={styles.list}>
        {waypoints.map((waypoint, index) => (
          <WaypointEditorCard
            key={`${waypoint.order}-${index}`}
            waypoint={waypoint}
            index={index}
            total={waypoints.length}
            portMenuVisible={openPortMenuIndex === index}
            onTogglePortMenu={setOpenPortMenuIndex}
            onChange={handleChangeWaypoint}
            onMove={handleMoveWaypoint}
            onRemove={handleRemoveWaypoint}
          />
        ))}
      </View>

      <Button mode="contained-tonal" icon="plus" onPress={handleAddWaypoint} style={styles.addButton}>
        Ajouter une escale
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { gap: Theme.spacing.md },
  divider: {
    marginTop: Theme.spacing.lg,
    backgroundColor: Theme.neutral[200],
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: Theme.neutral[700],
  },
  summary: {
    fontSize: 13,
    fontWeight: '500',
    color: Theme.neutral[500],
  },
  list: {
    gap: Theme.spacing.md,
  },
  addButton: {
    borderRadius: Theme.radius.md,
  },
});
