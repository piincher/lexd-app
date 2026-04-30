import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Menu } from 'react-native-paper';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Theme } from '@src/constants/Theme';
import { NotificationBell } from '@src/shared/ui/NotificationBell';
import { useNavigation } from '@react-navigation/native';
import {
  ContainerStatus,
  CONTAINER_STATUS_COLORS,
  SHIPPING_MODE_ICONS,
  SHIPPING_MODE_LABELS,
} from '../../types';
import {  createStyles  } from '../ContainerDetailScreen.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface ConsigneeInfo {
  name?: string;
  phone?: string;
  warehouseAddress?: string;
}

interface ContainerDetailHeaderProps {
  containerNumber?: string;
  shippingMode?: 'air' | 'sea' | 'land';
  status: ContainerStatus;
  statusColor: string;
  statusLabel: string;
  statusMenuVisible: boolean;
  setStatusMenuVisible: (visible: boolean) => void;
  onUpdateStatus: (status: ContainerStatus) => void;
  onBack: () => void;
  consignee?: ConsigneeInfo;
}

const TIMELINE_STEPS: { status: ContainerStatus; label: string; icon: string }[] = [
  { status: 'BOOKED', label: 'Réservé', icon: 'bookmark' },
  { status: 'EMPTY_TO_WAREHOUSE', label: 'Vide vers Entrepôt', icon: 'cube-outline' },
  { status: 'LOADING', label: 'Chargement', icon: 'hammer' },
  { status: 'LOADED', label: 'Chargé', icon: 'cube' },
  { status: 'IN_TRANSIT', label: 'Transit', icon: 'airplane' },
  { status: 'ARRIVED', label: 'Arrivé', icon: 'flag' },
  { status: 'READY_FOR_PICKUP', label: 'Retrait', icon: 'checkmark-done' },
];

const SHIPPING_MODE_MAPPING: Record<string, 'SEA' | 'AIR'> = {
  sea: 'SEA',
  air: 'AIR',
  land: 'SEA',
};

export const ContainerDetailHeader: React.FC<ContainerDetailHeaderProps> = ({
  containerNumber,
  shippingMode,
  status,
  statusColor,
  statusLabel,
  statusMenuVisible,
  setStatusMenuVisible,
  onUpdateStatus,
  onBack,
  consignee,
}) => {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const navigation = useNavigation();
  const handleUpdateStatus = (newStatus: ContainerStatus) => {
    setStatusMenuVisible(false);
    onUpdateStatus(newStatus);
  };

  const mappedShippingMode = shippingMode ? SHIPPING_MODE_MAPPING[shippingMode] : undefined;

  return (
    <LinearGradient
      colors={[Theme.primary[600], Theme.primary[800]]}
      style={styles.header}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.headerTop}>
        <TouchableOpacity style={styles.backIconButton} onPress={onBack}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Menu
            visible={statusMenuVisible}
            onDismiss={() => setStatusMenuVisible(false)}
            anchor={
              <TouchableOpacity
                style={[styles.statusBadge, { backgroundColor: statusColor }]}
                onPress={() => setStatusMenuVisible(true)}
              >
                <Text style={styles.statusText}>{statusLabel}</Text>
                <Ionicons name="chevron-down" size={16} color="#FFF" />
              </TouchableOpacity>
            }
          >
            {TIMELINE_STEPS.map((step) => (
              <Menu.Item
                key={step.status}
                onPress={() => handleUpdateStatus(step.status)}
                title={step.label}
                leadingIcon={() => (
                  <Ionicons
                    name={step.icon as any}
                    size={20}
                    color={CONTAINER_STATUS_COLORS[step.status]}
                  />
                )}
                style={status === step.status ? styles.menuItemActive : undefined}
              />
            ))}
          </Menu>
          <NotificationBell
            onPress={() => navigation.navigate('Notifications' as never)}
            size={22}
            color="#FFF"
          />
        </View>
      </View>

      <Animated.View entering={FadeInUp.delay(100)} style={styles.headerContent}>
        <View style={styles.containerNumberContainer}>
          <Ionicons name="cube" size={32} color="#FFF" />
          <Text style={styles.containerNumber}>{containerNumber || ''}</Text>
        </View>

        {mappedShippingMode && (
          <View style={styles.shippingLineContainer}>
            <Ionicons
              name={SHIPPING_MODE_ICONS[mappedShippingMode] as any}
              size={16}
              color="rgba(255,255,255,0.8)"
            />
            <Text style={styles.shippingLineText}>
              {SHIPPING_MODE_LABELS[mappedShippingMode]}
            </Text>
          </View>
        )}
        {consignee?.phone && mappedShippingMode === 'AIR' && (
          <View style={styles.consigneeContainer}>
            <Ionicons name="call-outline" size={14} color="rgba(255,255,255,0.8)" />
            <Text style={styles.consigneeText}>
              {consignee.name} — {consignee.phone}
            </Text>
          </View>
        )}
      </Animated.View>
    </LinearGradient>
  );
};
