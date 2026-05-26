import React, { useMemo } from 'react';
import { View, Pressable } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createContainerStackStyles } from './ContainerStack.styles';

type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

interface ContainerInfo {
  id: string;
  trackingType?: 'CONTAINER' | 'AIRWAY_BILL';
  airwayBillId?: string;
  virtualContainerNumber: string;
  status: string;
  airwayBillStatus?: string;
  shippingMode?: string;
  shippingLine?: string;
  flightNumber?: string;
  goodsCount?: number;
  goodsPreview?: { goodsId?: string; description?: string; quantity?: number }[];
  timeline?: { departedAt?: string; arrivedAt?: string; estimatedArrival?: string };
}

interface Props {
  containers: ContainerInfo[];
  onContainerPress?: (shipment: ContainerInfo) => void;
}

const getStatusMap = (colors: any): Record<string, { label: string; color: string; icon: IoniconName }> => ({
  LOADING: { label: 'Chargement', color: colors.status.warning, icon: 'cube-outline' },
  LOADED: { label: 'Container chargé', color: colors.status.info, icon: 'cube' },
  GATE_IN_FULL: { label: 'Au port', color: colors.status.info, icon: 'business' },
  LOADED_ON_VESSEL: { label: 'Sur bateau', color: colors.status.info, icon: 'boat' },
  IN_TRANSIT: { label: 'Vers Bamako', color: colors.primary.main, icon: 'airplane' },
  ARRIVED: { label: 'Arrivé', color: colors.status.success, icon: 'flag' },
  DISCHARGED: { label: 'Déchargé', color: colors.status.success, icon: 'archive' },
  READY_FOR_PICKUP: { label: 'Prêt', color: colors.status.success, icon: 'checkmark-circle' },
  DELIVERED: { label: 'Livré', color: colors.status.success, icon: 'home' },
});

const fmtDate = (s?: string) => (s ? new Date(s).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }) : '');

export const ContainerStack: React.FC<Props> = ({ containers, onContainerPress }) => {
  const { colors, isDark } = useAppTheme();
  const styles = createContainerStackStyles(colors, isDark);
  const statusMap = useMemo(() => getStatusMap(colors), [colors]);

  const active = containers.filter((c) => c.status !== 'DELIVERED' && c.status !== 'COMPLETED');
  if (active.length === 0) return null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Expéditions actives</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{active.length}</Text>
        </View>
      </View>

      <View style={styles.stack}>
        {active.slice(0, 3).map((c) => {
          const cfg = statusMap[c.status] || statusMap.LOADING;
          const isAir =
            c.trackingType === 'AIRWAY_BILL' ||
            c.shippingMode?.toLowerCase() === 'air' ||
            c.shippingMode?.toLowerCase() === 'aerien';
          const preview = c.goodsPreview?.map((item) => item.description || item.goodsId).filter(Boolean).slice(0, 2).join(', ');
          const shipmentLabel = isAir ? 'Aérien' : 'Maritime';
          const carrierLabel = [c.shippingLine, c.flightNumber].filter(Boolean).join(' • ');
          return (
            <Pressable
              key={c.airwayBillId || c.id}
              style={styles.card}
              onPress={() => onContainerPress?.(c)}
            >
              <View style={[styles.accent, { backgroundColor: cfg.color }]} />
              <View style={styles.content}>
                <View style={styles.topRow}>
                  <View style={styles.left}>
                    <View style={[styles.modeCircle, { backgroundColor: `${cfg.color}10` }]}>
                      <Ionicons name={isAir ? 'airplane' : 'boat'} size={20} color={cfg.color} />
                    </View>
                    <View>
                      <Text style={styles.number}>{c.virtualContainerNumber || 'N/A'}</Text>
                      <Text style={styles.sub}>
                        {shipmentLabel}
                        {carrierLabel ? ` • ${carrierLabel}` : ''}
                        {c.goodsCount ? ` • ${c.goodsCount} colis` : ''}
                      </Text>
                    </View>
                  </View>
                  <View style={[styles.pill, { backgroundColor: `${cfg.color}10` }]}>
                    <Ionicons name={cfg.icon} size={12} color={cfg.color} />
                    <Text style={[styles.pillText, { color: cfg.color }]}>{cfg.label}</Text>
                  </View>
                </View>
                {(c.timeline?.departedAt || c.timeline?.arrivedAt) && (
                  <View style={styles.timeline}>
                    {c.timeline.departedAt && (
                      <View style={styles.tlItem}>
                        <Ionicons name="arrow-up-circle-outline" size={12} color={colors.text.disabled} />
                        <Text style={styles.tlText}>Départ {fmtDate(c.timeline.departedAt)}</Text>
                      </View>
                    )}
                    {c.timeline.arrivedAt && (
                      <View style={styles.tlItem}>
                        <Ionicons name="arrow-down-circle-outline" size={12} color={colors.text.disabled} />
                        <Text style={styles.tlText}>Arrivée {fmtDate(c.timeline.arrivedAt)}</Text>
                      </View>
                    )}
                  </View>
                )}
                {!!preview && <Text style={styles.goodsPreview} numberOfLines={1}>{preview}</Text>}
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

export default ContainerStack;
