/**
 * GoodsCardStatus - Gradient accent bar at the top of the card
 */

import React from 'react';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Theme } from '@src/constants/Theme';

interface GoodsCardStatusProps {
  status: string;
}

export const getStatusConfig = (status: string): {
  label: string;
  variant: 'primary' | 'success' | 'warning' | 'info' | 'neutral';
  gradient: readonly [string, string, ...string[]];
} => {
  const configs: Record<string, ReturnType<typeof getStatusConfig>> = {
    'RECEIVED_AT_WAREHOUSE': {
      label: 'En Entrepôt',
      variant: 'primary',
      gradient: Theme.gradients.primary,
    },
    'PACKED': {
      label: 'Préparé',
      variant: 'primary',
      gradient: ['#7C4DFF', '#9575CD', '#B39DDB'] as const,
    },
    'ASSIGNED_TO_CONTAINER': {
      label: 'En Container',
      variant: 'info',
      gradient: Theme.gradients.ocean,
    },
    'LOADED_IN_CONTAINER': {
      label: 'Chargé',
      variant: 'info',
      gradient: Theme.gradients.ocean,
    },
    'IN_TRANSIT': {
      label: 'En Transit',
      variant: 'warning',
      gradient: Theme.gradients.sunset,
    },
    'ARRIVED_DESTINATION': {
      label: 'Arrivé',
      variant: 'success',
      gradient: ['#10B981', '#34D399', '#6EE7B7'] as const,
    },
    'READY_FOR_PICKUP': {
      label: 'Prêt',
      variant: 'success',
      gradient: ['#10B981', '#34D399', '#6EE7B7'] as const,
    },
    'DELIVERED': {
      label: 'Livré',
      variant: 'neutral',
      gradient: ['#6B7280', '#9CA3AF', '#D1D5DB'] as const,
    },
  };
  return configs[status] || {
    label: status,
    variant: 'neutral',
    gradient: Theme.gradients.primary,
  };
};

export const GoodsCardStatus: React.FC<GoodsCardStatusProps> = ({ status }) => {
  const config = getStatusConfig(status);

  return (
    <LinearGradient
      colors={config.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.accentBar}
    />
  );
};

const styles = StyleSheet.create({
  accentBar: {
    height: 4,
    width: '100%',
  },
});
