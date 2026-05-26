/**
 * FilterPresetsModal - Modal for selecting filter presets
 * Displays available filter presets in a bottom sheet
 */

import React from 'react';
import { View, Modal, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
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
  const { colors } = useAppTheme();
  const styles = createStyles(colors);
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
              <Ionicons name="close" size={24} color={colors.neutral[600]} />
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
                  <Ionicons name={preset.icon as any} size={20} color={colors.primary[500]} />
                </View>
                <View style={styles.info}>
                  <Text style={styles.name}>{preset.name}</Text>
                  <Text style={styles.description}>{preset.description}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={colors.neutral[400]} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const createStyles = (colors: any) => StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  content: {
    backgroundColor: colors.background.card,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: '70%',
    paddingBottom: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[200],
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.neutral[800],
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[100],
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: colors.primary[50],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.neutral[800],
    marginBottom: 2,
  },
  description: {
    fontSize: 13,
    color: colors.neutral[500],
  },
});
