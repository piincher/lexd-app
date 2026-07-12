import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Badge } from '@src/shared/ui/Badge';
import { Card } from '@src/shared/ui/Card';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { formatCurrency } from '@src/shared/lib/currency';
import type { AirwayBillManifestGoods } from '../../types';

interface Props {
  goods: AirwayBillManifestGoods;
}

const Info: React.FC<{ label: string; value?: string | number | null }> = ({ label, value }) => {
  const { colors } = useAppTheme();
  return (
    <View style={styles.info}>
      <Text style={[styles.infoLabel, { color: colors.text.muted }]}>{label}</Text>
      <Text style={[styles.infoValue, { color: colors.text.primary }]} numberOfLines={1}>
        {value || '—'}
      </Text>
    </View>
  );
};

export const AirwayBillManifestGoodsCard: React.FC<Props> = ({ goods }) => {
  const { colors } = useAppTheme();
  const exception = Boolean(goods.intakeException?.isException);
  const cardStyle = StyleSheet.flatten([
    styles.card,
    exception && { borderColor: colors.status.warning },
  ]);

  return (
    <Card style={cardStyle} padding="medium">
      <View style={styles.header}>
        <MaterialCommunityIcons name="cube-outline" size={20} color={colors.primary.main} />
        <View style={styles.titleBlock}>
          <Text style={[styles.goodsId, { color: colors.text.primary }]} numberOfLines={1}>
            {goods.goodsId}
          </Text>
          <Text style={[styles.description, { color: colors.text.secondary }]} numberOfLines={2}>
            {goods.description || 'Sans description'}
          </Text>
        </View>
        <Badge
          label={goods.paymentStatus}
          variant="default"
          backgroundColor={`${colors.primary.main}18`}
          textColor={colors.primary.main}
        />
      </View>

      <View style={[styles.owner, { backgroundColor: colors.background.elevated }]}>
        <MaterialCommunityIcons name="account-outline" size={17} color={colors.text.secondary} />
        <View style={styles.ownerText}>
          <Text style={[styles.ownerName, { color: colors.text.primary }]} numberOfLines={1}>
            {goods.client.name}
          </Text>
          <Text style={[styles.ownerMeta, { color: colors.text.secondary }]} numberOfLines={1}>
            {goods.client.phoneNumber || 'Téléphone inconnu'} · {goods.client.shippingClientId || 'Code inconnu'}
          </Text>
        </View>
      </View>

      <View style={styles.infoGrid}>
        <Info label="Qté" value={goods.quantity} />
        <Info label="Poids" value={`${goods.weight.toFixed(1)} kg`} />
        <Info label="Lieu" value={goods.warehouseLocation} />
        <Info label="Sac" value={goods.cargoBagNumber || 'Non assigné'} />
        <Info label="Statut" value={goods.status} />
        <Info label="Solde" value={formatCurrency(goods.balanceDue)} />
      </View>

      {exception && (
        <Text style={[styles.warning, { color: colors.status.warning }]}>
          ⚠ Exception réception: {(goods.intakeException?.reasons || []).join(', ') || 'à vérifier'}
        </Text>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  card: { marginBottom: 10, borderWidth: 1, borderColor: 'transparent' },
  header: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  titleBlock: { flex: 1 },
  goodsId: { fontSize: 15, fontWeight: '800' },
  description: { fontSize: 13, marginTop: 2, lineHeight: 18 },
  owner: { flexDirection: 'row', alignItems: 'center', gap: 8, borderRadius: 12, padding: 10, marginTop: 12 },
  ownerText: { flex: 1 },
  ownerName: { fontSize: 13, fontWeight: '800' },
  ownerMeta: { fontSize: 12, marginTop: 2, fontWeight: '600' },
  infoGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 12 },
  info: { width: '31%', minWidth: 88 },
  infoLabel: { fontSize: 10, fontWeight: '700', textTransform: 'uppercase' },
  infoValue: { fontSize: 12, fontWeight: '700', marginTop: 2 },
  warning: { fontSize: 12, fontWeight: '700', marginTop: 10 },
});

export default AirwayBillManifestGoodsCard;
