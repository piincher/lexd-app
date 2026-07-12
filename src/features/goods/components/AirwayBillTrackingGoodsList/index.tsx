import React, { useMemo } from 'react';
import { View, Text } from 'react-native';
import { Card, Button } from 'react-native-paper';
import type { AirwayBillGoodsItem } from '../../api/types';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { GoodsImage } from '@src/shared/ui/GoodsImage';
import { Badge } from '@src/shared/ui/Badge';
import { useDownloadAirwayBillGoodsPDF } from '@src/shared/hooks/useDownloadAirwayBillGoodsPDF';
import { CUSTOMER_GOODS_STATUS_LABELS } from '@src/shared/lib/customerStatus';
import {
  normalizePaymentStatus,
  PAYMENT_STATUS_LABELS,
  PAYMENT_STATUS_COLOR_KEYS,
} from '@src/shared/constants/paymentStatus';
import { formatAmount, formatCurrency } from '@src/shared/lib/currency';
import { formatCBM, formatDate, formatStatusLabel } from '@src/shared/lib/formatters';
import { createStyles } from './AirwayBillTrackingGoodsList.styles';

interface Props {
  airwayBillId?: string;
  awbNumber?: string;
  goodsIds?: (string | AirwayBillGoodsItem)[];
}

const getClientInfo = (client: AirwayBillGoodsItem['clientId']) => {
  if (!client || typeof client === 'string') {
    return { name: 'Non identifié', code: '-', phone: '-' };
  }
  const name = [client.firstName, client.lastName].filter(Boolean).join(' ').trim() || 'N/A';
  return {
    name,
    code: client.shippingClientId || '-',
    phone: client.phoneNumber || '-',
  };
};

const getPaymentVariant = (status?: string) => {
  const normalized = normalizePaymentStatus(status);
  const colorKey = PAYMENT_STATUS_COLOR_KEYS[normalized];
  const variantMap: Record<typeof colorKey, 'success' | 'warning' | 'error'> = {
    success: 'success',
    warning: 'warning',
    error: 'error',
  };
  return variantMap[colorKey] || 'neutral';
};

const GoodsItem: React.FC<{ goods: AirwayBillGoodsItem }> = ({ goods }) => {
  const { colors, isDark } = useAppTheme();
  const styles = useMemo(() => createStyles(colors, isDark), [colors, isDark]);
  const client = useMemo(() => getClientInfo(goods.clientId), [goods.clientId]);

  return (
    <View style={styles.goodsItem}>
      <GoodsImage uri={goods.photos?.[0]} width={64} height={64} borderRadius={10} placeholderSize="small" />
      <View style={styles.goodsBody}>
        <View style={styles.goodsHeader}>
          <Text style={styles.goodsText}>{goods.goodsId}</Text>
          <View style={styles.badges}>
            {goods.status && (
              <Badge label={CUSTOMER_GOODS_STATUS_LABELS[goods.status] || formatStatusLabel(goods.status)} variant="info" size="small" />
            )}
            {goods.paymentStatus && (
              <Badge
                label={PAYMENT_STATUS_LABELS[normalizePaymentStatus(goods.paymentStatus)]}
                variant={getPaymentVariant(goods.paymentStatus)}
                size="small"
              />
            )}
          </View>
        </View>

        {!!goods.description && (
          <Text style={styles.description} numberOfLines={1}>
            {goods.description}
          </Text>
        )}

        <Text style={styles.clientText} numberOfLines={1}>
          {client.name}
          {client.code !== '-' && ` · ${client.code}`}
          {client.phone !== '-' && ` · ${client.phone}`}
        </Text>

        <View style={styles.metaRow}>
          <Text style={styles.metaText}>{goods.warehouseLocation || '-'}</Text>
          <Text style={styles.metaText}>
            {goods.dimensions
              ? `${goods.dimensions.length}×${goods.dimensions.width}×${goods.dimensions.height} cm`
              : formatCBM(goods.actualCBM)}
          </Text>
          <Text style={styles.metaText}>{formatAmount(goods.weight)} kg</Text>
          <Text style={styles.metaText}>{goods.quantity ?? 1} colis</Text>
        </View>

        {(goods.totalCost !== undefined || goods.balanceDue !== undefined) && (
          <View style={styles.financialRow}>
            <Text style={styles.financialLabel}>Total:</Text>
            <Text style={styles.financialValue}>{formatCurrency(goods.totalCost)}</Text>
            {goods.balanceDue ? (
              <>
                <Text style={styles.financialLabel}>· Solde:</Text>
                <Text style={[styles.financialValue, styles.dangerText]}>{formatCurrency(goods.balanceDue)}</Text>
              </>
            ) : (
              <Text style={styles.paidText}> · Payé</Text>
            )}
          </View>
        )}

        {goods.receivedAt && <Text style={styles.receivedText}>Reçu le {formatDate(goods.receivedAt)}</Text>}
      </View>
    </View>
  );
};

export const AirwayBillTrackingGoodsList: React.FC<Props> = ({ airwayBillId, awbNumber, goodsIds }) => {
  const items = goodsIds || [];
  const { colors, isDark } = useAppTheme();
  const styles = useMemo(() => createStyles(colors, isDark), [colors, isDark]);
  const { mutateAsync, isPending } = useDownloadAirwayBillGoodsPDF();

  const handleDownloadPDF = async () => {
    if (!airwayBillId || !awbNumber) return;
    const date = new Date().toISOString().split('T')[0];
    const filename = `AWB-${awbNumber}-mes-colis-${date}.pdf`;
    await mutateAsync({ airwayBillId, filename });
  };

  return (
    <>
      <View style={styles.titleRow}>
        <Text style={styles.sectionTitle}>Vos colis ({items.length})</Text>
        {airwayBillId && items.length > 0 && (
          <Button
            mode="outlined"
            onPress={handleDownloadPDF}
            loading={isPending}
            disabled={isPending}
            compact
            icon="file-pdf-box"
            textColor={colors.primary[500]}
          >
            PDF
          </Button>
        )}
      </View>
      <Card style={styles.card}>
        <Card.Content>
          {items.map((goods) => (
            <GoodsItem
              key={typeof goods === 'string' ? goods : goods._id}
              goods={typeof goods === 'string' ? ({ _id: goods, goodsId: goods } as AirwayBillGoodsItem) : goods}
            />
          ))}
          {items.length === 0 && <Text style={styles.emptyText}>Aucun colis</Text>}
        </Card.Content>
      </Card>
    </>
  );
};

export default AirwayBillTrackingGoodsList;
