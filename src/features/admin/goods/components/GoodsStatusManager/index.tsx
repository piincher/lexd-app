/**
 * GoodsStatusManager - Status management component
 * SRP: Display current status and allow status updates
 */

import React, { useState } from 'react';
import { Alert, View } from 'react-native';
import { Card, Text, Button, Menu, Chip } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from './GoodsStatusManager.styles';

// Local StatusBadge component to avoid any import issues
const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const { colors } = useAppTheme();
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

const STATUS_OPTIONS = [
  { value: 'RECEIVED_AT_WAREHOUSE', label: 'Recu au depot' },
  { value: 'PACKED', label: 'Colis préparé' },
  { value: 'ASSIGNED_TO_CONTAINER', label: 'Assigne au conteneur' },
  { value: 'LOADED_IN_CONTAINER', label: 'Charge dans conteneur' },
  { value: 'IN_TRANSIT', label: 'En transit' },
  { value: 'ARRIVED_DESTINATION', label: 'Arrive a destination' },
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
  const { colors, isDark } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors, isDark), [colors, isDark]);

  return (
    <Card style={styles.container}>
      <Card.Content>
        <View style={styles.header}>
          <MaterialCommunityIcons name="tag" size={20} color={colors.primary[600]} />
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
                  Alert.alert(
                    'Confirmer le changement de statut',
                    `Passer au statut "${option.label}" ?`,
                    [
                      { text: 'Annuler', style: 'cancel' },
                      { text: 'Confirmer', onPress: () => { onStatusUpdate(option.value); setMenuVisible(false); } },
                    ]
                  );
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
