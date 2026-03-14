/**
 * GoodsHeader - Header with gradient and actions
 * SRP: Display header with goods ID, status, and action menu
 */

import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text, Menu, Chip } from 'react-native-paper';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { Theme } from '@src/constants/Theme';
import { styles } from './GoodsHeader.styles';

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

interface GoodsHeaderProps {
  goodsId: string;
  status: string;
  canAssign: boolean;
  hasContainers: boolean;
  onAssignPress: () => void;
  onStatusUpdate: (status: string) => void;
  onDelete: () => void;
}

export const GoodsHeader: React.FC<GoodsHeaderProps> = ({
  goodsId,
  status,
  canAssign,
  hasContainers,
  onAssignPress,
  onStatusUpdate,
  onDelete,
}) => {
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <LinearGradient colors={Theme.gradients.primary} style={styles.container}>
      <View style={styles.topRow}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>

        <Menu
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          anchor={
            <TouchableOpacity onPress={() => setMenuVisible(true)} style={styles.iconButton}>
              <Ionicons name="ellipsis-vertical" size={24} color="#FFF" />
            </TouchableOpacity>
          }
        >
          {canAssign && (
            <Menu.Item
              onPress={() => {
                setMenuVisible(false);
                onAssignPress();
              }}
              title="Assigner au conteneur"
              disabled={!hasContainers}
            />
          )}
          <Menu.Item
            onPress={() => {
              setMenuVisible(false);
              onStatusUpdate('READY_FOR_PICKUP');
            }}
            title="Pret pour retrait"
          />
          <Menu.Divider />
          <Menu.Item
            onPress={() => {
              setMenuVisible(false);
              onDelete();
            }}
            title="Supprimer"
            titleStyle={{ color: Theme.status.error }}
          />
        </Menu>
      </View>

      <View style={styles.content}>
        <View style={styles.idBadge}>
          <MaterialCommunityIcons name="package-variant" size={20} color="#FFF" style={styles.badgeIcon} />
          <Text style={styles.idText}>{goodsId}</Text>
        </View>
        <View style={styles.statusWrapper}>
          <StatusBadge status={status} />
        </View>
      </View>
    </LinearGradient>
  );
};
