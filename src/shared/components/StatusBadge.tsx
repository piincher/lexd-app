// Shared UI - StatusBadge Component
// Pure presentational component for displaying goods status

import React from 'react';
import { Chip } from 'react-native-paper';
import { GoodsStatus } from '../types';

interface StatusBadgeProps {
  status: GoodsStatus;
}

const STATUS_CONFIG: Record<GoodsStatus, { label: string; color: string; bgColor: string }> = {
  RECEIVED_AT_WAREHOUSE: { label: 'En Entrepôt', color: '#2196F3', bgColor: '#E3F2FD' },
  ASSIGNED_TO_CONTAINER: { label: 'Assigné', color: '#FF9800', bgColor: '#FFF3E0' },
  LOADED_IN_CONTAINER: { label: 'Chargé', color: '#9C27B0', bgColor: '#F3E5F5' },
  IN_TRANSIT: { label: 'En Transit', color: '#3F51B5', bgColor: '#E8EAF6' },
  ARRIVED_DESTINATION: { label: 'Arrivé', color: '#009688', bgColor: '#E0F2F1' },
  READY_FOR_PICKUP: { label: 'Prêt', color: '#4CAF50', bgColor: '#E8F5E9' },
  DELIVERED: { label: 'Livré', color: '#757575', bgColor: '#F5F5F5' },
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const config = STATUS_CONFIG[status] || { 
    label: status, 
    color: '#666666', 
    bgColor: '#F5F5F5' 
  };
  
  return (
    <Chip 
      style={{ 
        backgroundColor: config.bgColor,
        height: 28,
      }} 
      textStyle={{ 
        color: config.color,
        fontSize: 12,
      }}
      compact
    >
      {config.label}
    </Chip>
  );
};

StatusBadge.displayName = 'StatusBadge';
