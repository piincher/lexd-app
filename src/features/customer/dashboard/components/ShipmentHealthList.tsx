import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import {
  CUSTOMER_AIR_STATUS_LABELS,
  CUSTOMER_CONTAINER_STATUS_LABELS,
} from '@src/shared/lib/customerStatus';
import type { ShipmentHealthItem } from '@src/shared/types/dashboard';

interface Props {
  shipments: ShipmentHealthItem[];
  onShipmentPress: (shipment: ShipmentHealthItem) => void;
  onViewAll: () => void;
}

const formatEta = (date?: string | null) =>
  date ? new Date(date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }) : 'À confirmer';

const getStatusLabel = (status: string, isAir: boolean) =>
  (isAir ? CUSTOMER_AIR_STATUS_LABELS[status] : CUSTOMER_CONTAINER_STATUS_LABELS[status]) || status;

export const ShipmentHealthList: React.FC<Props> = ({
  shipments,
  onShipmentPress,
  onViewAll,
}) => {
  const { colors } = useAppTheme();
  const styles = StyleSheet.create({
    wrapper: { paddingHorizontal: 16, marginTop: 16 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
    title: { color: colors.text.primary, fontSize: 17, fontWeight: '900' },
    viewAll: { color: colors.primary.main, fontSize: 13, fontWeight: '800' },
    empty: {
      borderRadius: 14,
      padding: 16,
      backgroundColor: colors.background.card,
      borderWidth: 1,
      borderColor: colors.border,
    },
    emptyText: { color: colors.text.secondary, fontSize: 13, lineHeight: 19 },
    card: {
      borderRadius: 14,
      padding: 14,
      backgroundColor: colors.background.card,
      borderWidth: 1,
      borderColor: colors.border,
      marginBottom: 8,
    },
    row: { flexDirection: 'row', alignItems: 'center', gap: 10 },
    icon: {
      width: 40,
      height: 40,
      borderRadius: 13,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.background.paper,
    },
    body: { flex: 1 },
    ref: { color: colors.text.primary, fontSize: 14, fontWeight: '900' },
    meta: { color: colors.text.secondary, fontSize: 12, fontWeight: '600', marginTop: 2 },
    badge: { color: colors.status.success, fontSize: 11, fontWeight: '800', marginTop: 6 },
  });

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <Text style={styles.title}>Santé des expéditions</Text>
        <Pressable onPress={onViewAll}>
          <Text style={styles.viewAll}>Tout voir</Text>
        </Pressable>
      </View>
      {shipments.length === 0 ? (
        <Pressable style={styles.empty} onPress={onViewAll}>
          <Text style={styles.emptyText}>
            Aucune expédition active. Vos marchandises apparaîtront ici dès qu&apos;elles seront assignées à un envoi.
          </Text>
          <Text style={styles.viewAll}>Voir mes expéditions</Text>
        </Pressable>
      ) : (
        shipments.slice(0, 4).map((shipment) => {
          const isAir = shipment.trackingType === 'AIRWAY_BILL' || shipment.shippingMode === 'AIR';
          return (
            <Pressable key={shipment.id} style={styles.card} onPress={() => onShipmentPress(shipment)}>
              <View style={styles.row}>
                <View style={styles.icon}>
                  <Ionicons name={isAir ? 'airplane' : 'boat'} size={20} color={colors.primary.main} />
                </View>
                <View style={styles.body}>
                  <Text style={styles.ref} numberOfLines={1}>{shipment.reference}</Text>
                  <Text style={styles.meta}>
                    {getStatusLabel(shipment.status, isAir)} • ETA {formatEta(shipment.eta)} • {shipment.goodsCount} colis
                  </Text>
                  {shipment.needsAttention && (
                    <Text style={styles.badge}>{shipment.readyGoodsCount} colis prêts</Text>
                  )}
                </View>
                <Ionicons name="chevron-forward" size={18} color={colors.text.disabled} />
              </View>
            </Pressable>
          );
        })
      )}
    </View>
  );
};

export default ShipmentHealthList;
