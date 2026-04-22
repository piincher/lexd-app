/**
 * FilterPresetsModal - Modal for selecting filter presets
 * Displays available filter presets in a bottom sheet
 */

import React from 'react';
import { View, Modal, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
import { FilterPreset } from '../api/searchApi';

interface FilterPresetsModalProps {
  visible: boolean;
  entity: string;
  presets: FilterPreset[];
  onSelect: (preset: FilterPreset) => void;
  onClose: () => void;
}

export const FilterPresetsModal: React.FC<FilterPresetsModalProps> = ({
  visible,
  entity,
  presets,
  onSelect,
  onClose,
}) => {
  const filteredPresets = presets.filter((p) => p.entity === entity);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>Filtres prédéfinis</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color={Theme.neutral[600]} />
            </TouchableOpacity>
          </View>
          <ScrollView>
            {filteredPresets.map((preset) => (
              <TouchableOpacity
                key={preset.id}
                style={styles.item}
                onPress={() => {
                  onSelect(preset);
                  onClose();
                }}
              >
                <View style={styles.iconContainer}>
                  <Ionicons name={preset.icon as any} size={20} color={Theme.primary[500]} />
                </View>
                <View style={styles.info}>
                  <Text style={styles.name}>{preset.name}</Text>
                  <Text style={styles.description}>{preset.description}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={Theme.neutral[400]} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  content: {
    backgroundColor: Theme.colors.background.card,
    borderTopLeftRadius: Theme.radius['2xl'],
    borderTopRightRadius: Theme.radius['2xl'],
    maxHeight: '70%',
    paddingBottom: Theme.spacing.xl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Theme.neutral[200],
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: Theme.neutral[800],
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Theme.neutral[100],
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: Theme.radius.lg,
    backgroundColor: Theme.primary[50],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Theme.spacing.md,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: Theme.neutral[800],
    marginBottom: 2,
  },
  description: {
    fontSize: 13,
    color: Theme.neutral[500],
  },
});
