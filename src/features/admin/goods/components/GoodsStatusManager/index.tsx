/**
 * GoodsStatusManager - Status management component
 * SRP: Display current status and allow status updates
 */

import React, { useState } from 'react';
import { View } from 'react-native';
import { Card, Text, Button, Menu, Chip } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
import { styles } from './GoodsStatusManager.styles';

// Local StatusBadge component to avoid any import issues
const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const STATUS_CONFIG: Record<string, { label: string; color: string; bgColor: string }> = {
    RECEIVED_AT_WAREHOUSE: { label: 'En Entrepot', color: '#2196F3', bgColor: '#E3F2FD' },
    ASSIGNED_TO_CONTAINER: { label: 'Assigne', color: '#FF9800', bgColor: '#FFF3E0' },
    LOADED_IN_CONTAINER: { label: 'Charge', color: '#9C27B0', bgColor: '#F3E5F5' },
    IN_TRANSIT: { label: 'En Transit', color: '#3F51B5', bgColor: '#E8EAF6' },
    ARRIVED_DESTINATION: { label: 'Arrive', color: '#009688', bgColor: '#E0F2F1' },
    READY_FOR_PICKUP: { label: 'Pret', color: '#4CAF50', bgColor: '#E8F5E9' },
    DELIVERED: { label: 'Livre', color: '#757575', bgColor: '#F5F5F5' },
  };

  const config = STATUS_CONFIG[status] || { label: status, color: '#666666', bgColor: '#F5F5F5' };

  return (
    <Chip
      style={{ backgroundColor: config.bgColor, height: 28 }}
      textStyle={{ color: config.color, fontSize: 12 }}
      compact
    >
      {config.label}
    </Chip>
  );
};

const STATUS_OPTIONS = [
  { value: 'RECEIVED_AT_WAREHOUSE', label: 'Recu au depot' },
  { value: 'LOADED_IN_CONTAINER', label: 'Charge dans conteneur' },
  { value: 'IN_TRANSIT', label: 'En transit' },
  { value: 'ARRIVED_AT_DESTINATION', label: 'Arrive a destination' },
  { value: 'READY_FOR_PICKUP', label: 'Pret pour retrait' },
  { value: 'DELIVERED', label: 'Livre' },
];

interface GoodsStatusManagerProps {
  currentStatus: string;
  onStatusUpdate: (status: string) => void;
  isUpdating?: boolean;
}

export const GoodsStatusManager: React.FC<GoodsStatusManagerProps> = ({
  currentStatus,
  onStatusUpdate,
  isUpdating,
}) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const getStatusLabel = (status: string) => {
    return STATUS_OPTIONS.find((opt) => opt.value === status)?.label || status;
  };

  return (
    <Card style={styles.container}>
      <Card.Content>
        <View style={styles.header}>
          <MaterialCommunityIcons name="tag" size={20} color={Theme.primary[600]} />
          <Text style={styles.title}>Statut</Text>
        </View>

        <View style={styles.statusRow}>
          <StatusBadge status={currentStatus} />
          <Menu
            visible={menuVisible}
            onDismiss={() => setMenuVisible(false)}
            anchor={
              <Button
                mode="outlined"
                onPress={() => setMenuVisible(true)}
                loading={isUpdating}
                style={styles.changeButton}
              >
                Changer
              </Button>
            }
          >
            {STATUS_OPTIONS.map((option) => (
              <Menu.Item
                key={option.value}
                onPress={() => {
                  onStatusUpdate(option.value);
                  setMenuVisible(false);
                }}
                title={option.label}
                disabled={option.value === currentStatus}
              />
            ))}
          </Menu>
        </View>
      </Card.Content>
    </Card>
  );
};
