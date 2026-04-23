/**
 * TimelineTransportIcon - Ship/truck/plane icons
 */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';

type TransportMode = 'sea' | 'truck' | 'air' | 'train' | 'warehouse';

interface TimelineTransportIconProps {
  mode: TransportMode;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  isActive?: boolean;
}

const MODE_CONFIG: Record<TransportMode, { icon: keyof typeof Ionicons.glyphMap; label: string; color: string }> = {
  sea: { icon: 'boat', label: 'Maritime', color: '#0284C7' },
  truck: { icon: 'car', label: 'Route', color: '#F59E0B' },
  air: { icon: 'airplane', label: 'Air', color: '#8B5CF6' },
  train: { icon: 'train', label: 'Train', color: '#10B981' },
  warehouse: { icon: 'home', label: 'Entrepôt', color: Theme.colors.text.secondary },
};

const SIZE_CONFIG = {
  sm: { container: 24, icon: 12 },
  md: { container: 36, icon: 18 },
  lg: { container: 48, icon: 24 },
};

export const TimelineTransportIcon: React.FC<TimelineTransportIconProps> = ({
  mode,
  size = 'md',
  showLabel = false,
  isActive = false,
}) => {
  const config = MODE_CONFIG[mode];
  const sizeConfig = SIZE_CONFIG[size];
  
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.iconContainer,
          {
            width: sizeConfig.container,
            height: sizeConfig.container,
            borderRadius: sizeConfig.container / 2,
            backgroundColor: isActive ? config.color : `${config.color}20`,
          },
        ]}
      >
        <Ionicons
          name={config.icon}
          size={sizeConfig.icon}
          color={isActive ? '#FFF' : config.color}
        />
      </View>
      {showLabel && (
        <Text style={[styles.label, { color: config.color }]}>
          {config.label}
        </Text>
      )}
    </View>
  );
};

export const getTransportMode = (type: string): TransportMode => {
  const normalized = type.toLowerCase();
  if (normalized.includes('sea') || normalized.includes('boat') || normalized.includes('ship')) return 'sea';
  if (normalized.includes('truck') || normalized.includes('road') || normalized.includes('car')) return 'truck';
  if (normalized.includes('air') || normalized.includes('plane') || normalized.includes('fly')) return 'air';
  if (normalized.includes('train') || normalized.includes('rail')) return 'train';
  return 'warehouse';
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 4,
  },
});
