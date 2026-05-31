import React, { useMemo } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Image } from 'expo-image';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { normalizePhotos } from '@src/shared/lib';
import { createStyles } from './OrderGoodsSection.styles';

type IconName = React.ComponentProps<typeof MaterialCommunityIcons>['name'];
type GoodsTotals = { cbm: number; weight: number; value: number };

interface GoodsLocation {
  virtualContainerNumber?: string;
  containerNumber?: string;
  awbNumber?: string;
  bagNumber?: string;
}

export interface OrderDetailGoods {
  _id?: string;
  id?: string;
  goodsId?: string;
  trackingCode?: string;
  description?: string;
  status?: string;
  paymentStatus?: string;
  warehouseLocation?: string;
  actualCBM?: number;
  cbm?: number;
  weight?: number;
  quantity?: number;
  totalCost?: number;
  amountPaid?: number;
  isVoid?: boolean;
  containerId?: GoodsLocation | null;
  airwayBillId?: GoodsLocation | null;
  cargoBagId?: GoodsLocation | null;
}

interface OrderGoodsSectionProps {
  goods: unknown[];
  onOpenGoods: (goodsId: string) => void;
}

const money = (value?: number) => `${(value || 0).toLocaleString('fr-FR')} FCFA`;
const metric = (value?: number, suffix = '') => (value ? `${value.toLocaleString('fr-FR')}${suffix}` : '--');
const isVoidGoods = (item: OrderDetailGoods) => item.isVoid || item.status === 'VOID';

export const OrderGoodsSection: React.FC<OrderGoodsSectionProps> = ({ goods, onOpenGoods }) => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);
  const typedGoods = goods as OrderDetailGoods[];

  const totals = useMemo(() => typedGoods.reduce<GoodsTotals>((acc, item) => {
    if (!isVoidGoods(item)) {
      acc.cbm += Number(item.actualCBM || item.cbm || 0);
      acc.weight += Number(item.weight || 0);
      acc.value += Number(item.totalCost || 0);
    }
    return acc;
  }, { cbm: 0, weight: 0, value: 0 }), [typedGoods]);

  if (!typedGoods.length) return null;

  const renderMeta = (icon: IconName, label?: string | number) => label ? (
    <View style={styles.metaPill}>
      <MaterialCommunityIcons name={icon} size={12} color={colors.text.secondary} />
      <Text style={styles.metaText}>{label}</Text>
    </View>
  ) : null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Marchandises liées</Text>
          <Text style={styles.subtitle}>Touchez une ligne pour ouvrir le détail.</Text>
        </View>
        <Text style={styles.countBadge}>{typedGoods.length} colis</Text>
      </View>

      <View style={styles.totalsRow}>
        <View style={styles.totalCell}><Text style={styles.totalLabel}>CBM actif</Text><Text style={styles.totalValue}>{metric(totals.cbm, ' m³')}</Text></View>
        <View style={styles.totalCell}><Text style={styles.totalLabel}>Poids</Text><Text style={styles.totalValue}>{metric(totals.weight, ' kg')}</Text></View>
        <View style={styles.totalCell}><Text style={styles.totalLabel}>Valeur</Text><Text style={styles.totalValue}>{money(totals.value)}</Text></View>
      </View>

      {typedGoods.map((item) => {
        const goodsKey = item._id || item.id || item.goodsId || '';
        const thumb = normalizePhotos(item as unknown as Record<string, unknown>)[0];
        const statusColor = isVoidGoods(item) ? colors.status.error : colors.primary.main;
        const containerLabel = item.containerId?.virtualContainerNumber || item.containerId?.containerNumber;
        const airLabel = item.airwayBillId?.awbNumber || item.cargoBagId?.bagNumber;

        return (
          <TouchableOpacity key={goodsKey} style={styles.item} activeOpacity={0.75} onPress={() => goodsKey && onOpenGoods(goodsKey)}>
            {thumb ? <Image source={{ uri: thumb }} style={styles.thumb} contentFit="cover" /> : (
              <View style={styles.thumbPlaceholder}>
                <MaterialCommunityIcons name="package-variant" size={22} color={colors.text.disabled} />
              </View>
            )}
            <View style={styles.itemBody}>
              <View style={styles.itemTop}>
                <Text style={styles.goodsCode} numberOfLines={1}>{item.goodsId || item.trackingCode || goodsKey}</Text>
                <View style={[styles.statusPill, { backgroundColor: statusColor + '15' }]}>
                  <Text style={[styles.statusText, { color: statusColor }]}>{item.status || 'ACTIVE'}</Text>
                </View>
              </View>
              <Text style={styles.description} numberOfLines={2}>{item.description || 'Aucune description'}</Text>
              <View style={styles.metaRow}>
                {renderMeta('cube-outline', metric(item.actualCBM || item.cbm, ' m³'))}
                {renderMeta('weight', metric(item.weight, ' kg'))}
                {renderMeta('map-marker', item.warehouseLocation)}
                {renderMeta('cash', money(item.totalCost))}
                {renderMeta('credit-card-check', item.paymentStatus)}
                {renderMeta('shipping-pallet', containerLabel)}
                {renderMeta('airplane', airLabel)}
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default OrderGoodsSection;
