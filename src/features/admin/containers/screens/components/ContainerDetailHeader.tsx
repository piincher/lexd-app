import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Theme } from '@src/constants/Theme';
import { NotificationBell } from '@src/shared/ui/NotificationBell';
import { useNavigation } from '@react-navigation/native';
import {
  ContainerStatus,
  SHIPPING_MODE_ICONS,
  SHIPPING_MODE_LABELS,
} from '../../types';
import {  createStyles  } from '../ContainerDetailScreen.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { ContainerStatusMenu } from './ContainerStatusMenu';

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
  isUpdatingStatus?: boolean;
  onBack: () => void;
  consignee?: ConsigneeInfo;
}

type HeaderStatusIcon = keyof typeof Ionicons.glyphMap;

const TIMELINE_STEPS: { status: ContainerStatus; label: string; icon: HeaderStatusIcon }[] = [
  { status: 'BOOKED', label: 'Réservé', icon: 'bookmark' },
  { status: 'EMPTY_TO_WAREHOUSE', label: 'Vide vers Entrepôt', icon: 'cube-outline' },
  { status: 'LOADING', label: 'Chargement', icon: 'hammer' },
  { status: 'LOADED', label: 'Chargé', icon: 'cube' },
  { status: 'GATE_IN_FULL', label: 'Entré au Port', icon: 'enter-outline' },
  { status: 'LOADED_ON_VESSEL', label: 'Chargé à Bord', icon: 'boat' },
  { status: 'IN_TRANSIT', label: 'Transit', icon: 'airplane' },
  { status: 'ARRIVED', label: 'Arrivé', icon: 'flag' },
  { status: 'DISCHARGED', label: 'Déchargé', icon: 'archive-outline' },
  { status: 'READY_FOR_PICKUP', label: 'Retrait', icon: 'checkmark-done' },
  { status: 'DELIVERED', label: 'Livré', icon: 'checkmark-done' },
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
  isUpdatingStatus = false,
  onBack,
  consignee,
}) => {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const navigation = useNavigation();
  const mappedShippingMode = shippingMode ? SHIPPING_MODE_MAPPING[shippingMode] : undefined;
  const shippingModeIcon = mappedShippingMode
    ? SHIPPING_MODE_ICONS[mappedShippingMode] as HeaderStatusIcon
    : undefined;

  return (
    <LinearGradient
      colors={[Theme.primary[600], Theme.primary[800]]}
      style={styles.header}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.headerTop}>
        <TouchableOpacity style={styles.backIconButton} onPress={onBack}>
          <Ionicons name="arrow-back" size={24} color={colors.text.inverse} />
        </TouchableOpacity>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <ContainerStatusMenu
            status={status}
            statusColor={statusColor}
            statusLabel={statusLabel}
            visible={statusMenuVisible}
            steps={TIMELINE_STEPS}
            isUpdatingStatus={isUpdatingStatus}
            onSetVisible={setStatusMenuVisible}
            onUpdateStatus={onUpdateStatus}
          />
          <NotificationBell
            onPress={() => navigation.navigate('Notifications' as never)}
            size={22}
            color={colors.text.inverse}
          />
        </View>
      </View>

      <Animated.View entering={FadeInUp.delay(100)} style={styles.headerContent}>
        <View style={styles.containerNumberContainer}>
          <Ionicons name="cube" size={32} color={colors.text.inverse} />
          <Text style={styles.containerNumber}>{containerNumber || ''}</Text>
        </View>

        {mappedShippingMode && (
          <View style={styles.shippingLineContainer}>
            <Ionicons
              name={shippingModeIcon}
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
