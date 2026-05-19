/**
 * GoodsHeader - Header with gradient and actions
 * SRP: Display header with goods ID, status, and action menu
 */

import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text, Menu, Chip, Divider } from 'react-native-paper';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Theme } from '@src/constants/Theme';
import { createStyles } from './GoodsHeader.styles';

// Local StatusBadge component to avoid any import issues
const StatusBadge: React.FC<{ status: string; colors: any }> = ({ status, colors }) => {
  const STATUS_CONFIG: Record<string, { label: string; color: string; bgColor: string }> = {
    RECEIVED_AT_WAREHOUSE: { label: 'En Entrepot', color: colors.status.info, bgColor: colors.background.paper },
    PACKED: { label: 'Colis préparé', color: colors.primary.main, bgColor: colors.background.paper },
    ASSIGNED_TO_CONTAINER: { label: 'Assigne', color: colors.status.warning, bgColor: colors.background.paper },
    LOADED_IN_CONTAINER: { label: 'Charge', color: colors.status.warning, bgColor: colors.background.paper },
    IN_TRANSIT: { label: 'En Transit', color: colors.status.info, bgColor: colors.background.paper },
    ARRIVED_DESTINATION: { label: 'Arrive', color: colors.status.success, bgColor: colors.background.paper },
    READY_FOR_PICKUP: { label: 'Pret', color: colors.status.success, bgColor: colors.background.paper },
    DELIVERED: { label: 'Livre', color: colors.text.disabled, bgColor: colors.background.paper },
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
  const { colors } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors), [colors]);

  return (
    <LinearGradient colors={Theme.gradients.primary} style={styles.container}>
      <View style={styles.topRow}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
          <Ionicons name="arrow-back" size={24} color={colors.text.inverse} />
        </TouchableOpacity>

        <Menu
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          anchor={
            <TouchableOpacity onPress={() => setMenuVisible(true)} style={styles.iconButton}>
              <Ionicons name="ellipsis-vertical" size={24} color={colors.text.inverse} />
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
          <Divider />
          <Menu.Item
            onPress={() => {
              setMenuVisible(false);
              onDelete();
            }}
            title="Supprimer"
            titleStyle={{ color: colors.status.error }}
          />
        </Menu>
      </View>

      <View style={styles.content}>
        <View style={styles.idBadge}>
          <MaterialCommunityIcons name="package-variant" size={20} color={colors.text.inverse} style={styles.badgeIcon} />
          <Text style={styles.idText}>{goodsId}</Text>
        </View>
        <View style={styles.statusWrapper}>
          <StatusBadge status={status} colors={colors} />
        </View>
      </View>
    </LinearGradient>
  );
};
