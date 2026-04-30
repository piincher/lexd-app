import React, { useMemo } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text, Menu, Chip, Divider } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
import { NotificationBell } from '@src/shared/ui/NotificationBell';
import { useNavigation } from '@react-navigation/native';
import {  createStyles  } from '../GoodsDetailScreen.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Goods } from '../../../types';

// Local StatusBadge component to avoid any import issues
const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const { colors } = useAppTheme();
  const STATUS_CONFIG: Record<string, { label: string; color: string; bgColor: string }> = {
    RECEIVED_AT_WAREHOUSE: { label: 'En Entrepot', color: '#2196F3', bgColor: '#E3F2FD' },
    PACKED: { label: 'Colis préparé', color: '#7C4DFF', bgColor: '#EDE7F6' },
    ASSIGNED_TO_CONTAINER: { label: 'Assigne', color: '#FF9800', bgColor: '#FFF3E0' },
    LOADED_IN_CONTAINER: { label: 'Charge', color: '#9C27B0', bgColor: '#F3E5F5' },
    IN_TRANSIT: { label: 'En Transit', color: '#3F51B5', bgColor: '#E8EAF6' },
    ARRIVED_DESTINATION: { label: 'Arrive', color: '#009688', bgColor: '#E0F2F1' },
    READY_FOR_PICKUP: { label: 'Pret', color: '#4CAF50', bgColor: '#E8F5E9' },
    DELIVERED: { label: 'Livre', color: '#757575', bgColor: '#F5F5F5' },
  };

  const config = STATUS_CONFIG[status] || { label: status, color: colors.text.muted, bgColor: colors.background.paper };

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

interface GoodsDetailHeaderProps {
  goods: Goods;
  container: any;
  hasContainers: boolean;
  hasAirwayBills: boolean;
  menuVisible: boolean;
  onMenuToggle: (visible: boolean) => void;
  onStatusUpdate: (status: string) => void;
  onAssignPress: () => void;
  onUnassignPress: () => void;
  canUnassign: boolean;
  onDelete: () => void;
  onBack: () => void;
}

export const GoodsDetailHeader: React.FC<GoodsDetailHeaderProps> = ({
  goods,
  hasContainers,
  hasAirwayBills,
  menuVisible,
  onMenuToggle,
  onStatusUpdate,
  onAssignPress,
  onUnassignPress,
  canUnassign,
  onDelete,
  onBack,
}) => {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const isAir = goods.shippingMode === 'AIR';
  const navigation = useNavigation();
  return (
    <LinearGradient colors={Theme.gradients.primary} style={styles.header}>
      <View style={styles.headerTop}>
        <TouchableOpacity onPress={onBack} style={styles.iconButton}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Menu
            visible={menuVisible}
            onDismiss={() => onMenuToggle(false)}
            anchor={
              <TouchableOpacity onPress={() => onMenuToggle(true)} style={styles.iconButton}>
                <Ionicons name="ellipsis-vertical" size={24} color="#FFF" />
              </TouchableOpacity>
            }
          >
            {goods.status === 'RECEIVED_AT_WAREHOUSE' && (
              <Menu.Item
                onPress={onAssignPress}
                title={isAir ? "Assigner à la lettre de transport" : "Assigner au conteneur"}
                disabled={isAir ? !hasAirwayBills : !hasContainers}
              />
            )}
            {canUnassign && (
              <Menu.Item
                onPress={onUnassignPress}
                title="Retirer de la lettre de transport"
                titleStyle={{ color: Theme.status.error }}
              />
            )}
            <Menu.Item onPress={() => onStatusUpdate('READY_FOR_PICKUP')} title="Pret pour retrait" />
            <Divider />
            <Menu.Item onPress={onDelete} title="Supprimer" titleStyle={{ color: Theme.status.error }} />
          </Menu>
          <NotificationBell
            onPress={() => navigation.navigate('Notifications' as never)}
            size={22}
            color="#FFF"
          />
        </View>
      </View>

    <View style={styles.headerContent}>
      <View style={styles.goodsIdBadge}>
        <MaterialCommunityIcons name="package-variant" size={20} color="#FFF" style={styles.badgeIcon} />
        <Text style={styles.goodsIdText}>{goods.goodsId}</Text>
      </View>
      <View style={styles.statusWrapper}>
        <StatusBadge status={goods.status} />
      </View>
    </View>
  </LinearGradient>
  );
};
