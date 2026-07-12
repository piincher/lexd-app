import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Theme } from '@src/constants/Theme';
import { ContainerArchiveMode } from '../../types';

type ArchiveTab = Exclude<ContainerArchiveMode, 'all'>;

interface ContainerArchiveToggleProps {
  archiveMode: ContainerArchiveMode;
  onSelectMode: (mode: ArchiveTab) => void;
}

const TABS: {
  key: ArchiveTab;
  label: string;
  helper: string;
  icon: keyof typeof Ionicons.glyphMap;
}[] = [
  {
    key: 'active',
    label: 'Actifs',
    helper: 'En cours',
    icon: 'cube-outline',
  },
  {
    key: 'archived',
    label: 'Archives',
    helper: 'Archivés',
    icon: 'archive-outline',
  },
];

export const ContainerArchiveToggle: React.FC<ContainerArchiveToggleProps> = ({
  archiveMode,
  onSelectMode,
}) => (
  <View style={styles.wrapper}>
    {TABS.map((tab) => {
      const isSelected = archiveMode === tab.key;
      return (
        <TouchableOpacity
          key={tab.key}
          activeOpacity={0.88}
          accessibilityRole="button"
          accessibilityState={{ selected: isSelected }}
          style={[styles.tab, isSelected && styles.tabActive]}
          onPress={() => onSelectMode(tab.key)}
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
            name={tab.icon}
            size={20}
            color={isSelected ? Theme.colors.text.inverse : Theme.neutral[500]}
          />
          <View style={styles.copy}>
            <Text style={[styles.label, isSelected && styles.selectedText]}>{tab.label}</Text>
            <Text style={[styles.helper, isSelected && styles.selectedHelper]}>{tab.helper}</Text>
          </View>
        </TouchableOpacity>
      );
    })}
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    marginHorizontal: Theme.spacing.xl,
    marginTop: Theme.spacing.lg,
    gap: Theme.spacing.md,
  },
  tab: {
    minHeight: 56,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: Theme.radius['2xl'],
    backgroundColor: Theme.colors.background.card,
    paddingHorizontal: Theme.spacing.lg,
    overflow: 'hidden',
    ...Theme.shadows.sm,
  },
  tabActive: {
    ...Theme.shadows.md,
  },
  copy: {
    marginLeft: Theme.spacing.md,
  },
  label: {
    fontSize: 15,
    fontWeight: '800',
    color: Theme.neutral[700],
  },
  helper: {
    fontSize: 12,
    fontWeight: '600',
    color: Theme.neutral[400],
    marginTop: 2,
  },
  selectedText: {
    color: Theme.colors.text.inverse,
  },
  selectedHelper: {
    color: Theme.colors.text.inverse + 'CC',
  },
});
