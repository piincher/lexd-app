/**
 * RouteStopsManager - Manage route stops (waypoints) with add/remove functionality
 */

import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Input } from '@src/shared/ui/Input';
import { Button } from '@src/shared/ui/Button';
import { Card } from '@src/shared/ui/Card';
import { createStyles } from './RouteStopsManager.styles';

export interface RouteStopsManagerProps {
  stops: string[];
  onAddStop: (stop: string) => void;
  onRemoveStop: (index: number) => void;
}

export const RouteStopsManager: React.FC<RouteStopsManagerProps> = ({
  stops, onAddStop, onRemoveStop,
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors, isDark), [colors, isDark]);
  const [newStop, setNewStop] = useState('');

  const handleAdd = useCallback(() => {
    const trimmed = newStop.trim();
    if (trimmed) { onAddStop(trimmed); setNewStop(''); }
  }, [newStop, onAddStop]);

  const handleRemove = useCallback((index: number, stopName: string) => {
    Alert.alert('Confirmer', `Supprimer "${stopName}" ?`, [
      { text: 'Annuler', style: 'cancel' },
      { text: 'Supprimer', style: 'destructive', onPress: () => onRemoveStop(index) },
    ]);
  }, [onRemoveStop]);

  if (stops.length === 0) {
    return (
      <View style={styles.emptyState}>
        <Ionicons name="location-outline" size={48} color={colors.neutral[300]} />
        <Text style={styles.emptyText}>Aucune escale configurée</Text>
        <Text style={styles.emptySubtext}>Ajoutez des arrêts intermédiaires</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputRow}>
        <View style={styles.inputWrapper}>
          <Input placeholder="Nouvelle escale..." value={newStop} onChangeText={setNewStop} onSubmitEditing={handleAdd} />
        </View>
        <Button title="Ajouter" onPress={handleAdd} icon="add" size="small" disabled={!newStop.trim()} />
      </View>
      <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
        {stops.map((stop, index) => (
          <Card key={`${stop}-${index}`} variant="outlined" padding="small" style={styles.stopCard}>
            <View style={styles.stopRow}>
              <View style={styles.stopInfo}>
                <Text style={styles.stopNumber}>{index + 1}</Text>
                <Ionicons name="location" size={20} color={colors.primary.main} />
                <Text style={styles.stopName} numberOfLines={1}>{stop}</Text>
              </View>
              <Button title="" onPress={() => handleRemove(index, stop)} icon="trash-outline" variant="ghost" size="small" />
            </View>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
};

export default RouteStopsManager;
