import React from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { ContainerStatus } from '../../types';
import { Theme } from '@src/constants/Theme';

type StatusFilterIcon = keyof typeof Ionicons.glyphMap;

const STATUS_FILTERS: { key: ContainerStatus | 'all' | 'assignable'; label: string; icon: StatusFilterIcon }[] = [
  { key: 'all', label: 'Tous', icon: 'apps' },
  { key: 'assignable', label: 'Peut recevoir', icon: 'add-circle' },
  { key: 'BOOKED', label: 'Réservés', icon: 'bookmark' },
  { key: 'LOADING', label: 'Chargement', icon: 'hammer' },
  { key: 'LOADED', label: 'Chargés', icon: 'cube' },
  { key: 'GATE_IN_FULL', label: 'Port', icon: 'enter-outline' },
  { key: 'LOADED_ON_VESSEL', label: 'À bord', icon: 'boat' },
  { key: 'IN_TRANSIT', label: 'Transit', icon: 'airplane' },
  { key: 'ARRIVED', label: 'Arrivés', icon: 'flag' },
  { key: 'DISCHARGED', label: 'Déchargés', icon: 'archive-outline' },
  { key: 'READY_FOR_PICKUP', label: 'Retrait', icon: 'checkmark-done' },
];

interface ContainerStatusFilterProps {
  selectedStatus: ContainerStatus | 'all' | 'assignable';
  onSelectStatus: (status: ContainerStatus | 'all' | 'assignable') => void;
}

export const ContainerStatusFilter: React.FC<ContainerStatusFilterProps> = ({
  selectedStatus,
  onSelectStatus,
}) => (
  <View style={styles.filterWrapper}>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterList}>
      {STATUS_FILTERS.map((filter) => {
        const isSelected = selectedStatus === filter.key;
        return (
          <TouchableOpacity
            key={filter.key}
            style={[styles.filterPill, isSelected && styles.filterPillActive]}
            onPress={() => onSelectStatus(filter.key)}
          >
            {isSelected && (
              <LinearGradient
                colors={Theme.gradients.primary}
                style={StyleSheet.absoluteFill}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              />
            )}
            <Ionicons
              name={filter.icon}
              size={16}
              color={isSelected ? '#FFF' : Theme.neutral[500]}
              style={styles.filterIcon}
            />
            <Text style={[styles.filterText, isSelected && styles.filterTextActive]}>{filter.label}</Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  filterWrapper: {
    marginTop: Theme.spacing.lg,
    marginBottom: Theme.spacing.sm,
  },
  filterList: {
    paddingHorizontal: Theme.spacing.xl,
    gap: Theme.spacing.md,
  },
  filterPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.lg,
    paddingVertical: Theme.spacing.md,
    borderRadius: Theme.radius.full,
    backgroundColor: Theme.colors.background.card,
    ...Theme.shadows.sm,
    overflow: 'hidden',
  },
  filterPillActive: {
    ...Theme.shadows.md,
  },
  filterIcon: {
    marginRight: 6,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: Theme.neutral[600],
  },
  filterTextActive: {
    color: '#FFF',
  },
});
