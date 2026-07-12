import React, { useMemo } from 'react';
import { ActivityIndicator, Text, View, StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Button } from '@src/shared/ui/Button';
import { EmptyState } from '@src/shared/ui/EmptyState';
import { AirwayBillManifestGoodsCard } from './AirwayBillManifestGoodsCard';
import { AirwayBillManifestSummary } from './AirwayBillManifestSummary';
import type {
  AirwayBillGoods,
  AirwayBillGoodsManifest,
  AirwayBillManifestClient,
  AirwayBillManifestGoods,
} from '../../types';

interface Props {
  goodsList: AirwayBillGoods[];
  onAssignPress: () => void;
  manifest?: AirwayBillGoodsManifest;
  loading?: boolean;
  error?: unknown;
  onDownloadPDF?: () => void;
  isDownloadingPDF?: boolean;
}

type Row =
  | { type: 'client'; client: AirwayBillManifestClient }
  | { type: 'unbagged' }
  | { type: 'goods'; goods: AirwayBillManifestGoods };

const rowsFromManifest = (manifest?: AirwayBillGoodsManifest): Row[] => {
  if (!manifest) return [];
  const rows: Row[] = [];
  for (const client of manifest.clients) {
    rows.push({ type: 'client', client });
    client.goods.forEach((goods) => rows.push({ type: 'goods', goods }));
  }
  if (manifest.unbaggedGoods.length) {
    rows.push({ type: 'unbagged' });
    manifest.unbaggedGoods.forEach((goods) => rows.push({ type: 'goods', goods }));
  }
  return rows;
};

const keyExtractor = (item: Row, index: number) =>
  item.type === 'goods' ? `goods-${item.goods._id}` : `${item.type}-${index}`;

export const AirwayBillGoodsSection: React.FC<Props> = ({
  goodsList,
  onAssignPress,
  manifest,
  loading,
  error,
  onDownloadPDF,
  isDownloadingPDF,
}) => {
  const { colors } = useAppTheme();
  const rows = useMemo(() => rowsFromManifest(manifest), [manifest]);
  const hasGoods = (manifest?.summary.totalGoods || goodsList.length) > 0;

  if (loading && !manifest) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color={colors.primary.main} />
        <Text style={[styles.message, { color: colors.text.secondary }]}>Chargement du manifeste...</Text>
      </View>
    );
  }

  if (!hasGoods) {
    return (
      <EmptyState
        icon="cube-outline"
        title="Aucune marchandise assignée"
        message="Assignez des marchandises à ce AWB, puis regroupez-les dans des sacs."
        actionLabel="Assigner des marchandises"
        onAction={onAssignPress}
      />
    );
  }

  if (error && !manifest) {
    return (
      <View style={styles.center}>
        <MaterialCommunityIcons name="cloud-alert-outline" size={38} color={colors.status.warning} />
        <Text style={[styles.errorTitle, { color: colors.text.primary }]}>Chargement impossible</Text>
        <Text style={[styles.message, { color: colors.text.secondary }]}>
          Le manifeste détaillé n&apos;a pas pu être récupéré. Réessayez avec le rafraîchissement.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {manifest && <AirwayBillManifestSummary summary={manifest.summary} />}
      <View style={styles.actions}>
        <Button
          title="Télécharger PDF"
          icon="download-outline"
          onPress={onDownloadPDF || (() => undefined)}
          disabled={!manifest?.summary.totalGoods || !onDownloadPDF}
          loading={isDownloadingPDF}
          fullWidth
        />
        <Button title="+ Assigner plus de marchandises" onPress={onAssignPress} variant="outline" fullWidth />
      </View>
      <FlashList
        data={rows}
        keyExtractor={keyExtractor}
        nestedScrollEnabled
        style={styles.list}
        renderItem={({ item }) => {
          if (item.type === 'client') {
            return (
              <Text style={[styles.groupTitle, { color: colors.text.primary }]}>
                {item.client.name} · {item.client.phoneNumber || 'Téléphone inconnu'} · {item.client.shippingClientId || 'Code inconnu'}
              </Text>
            );
          }
          if (item.type === 'unbagged') {
            return (
              <View style={[styles.warningBox, { backgroundColor: `${colors.status.warning}18` }]}>
                <MaterialCommunityIcons name="alert-outline" size={18} color={colors.status.warning} />
                <Text style={[styles.warningText, { color: colors.status.warning }]}>
                  Marchandises non assignées à un sac cargo
                </Text>
              </View>
            );
          }
          return <AirwayBillManifestGoodsCard goods={item.goods} />;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { gap: 14 },
  actions: { gap: 10 },
  list: { maxHeight: 680 },
  center: { alignItems: 'center', justifyContent: 'center', paddingVertical: 36, gap: 10 },
  message: { fontSize: 13, textAlign: 'center', lineHeight: 18 },
  errorTitle: { fontSize: 16, fontWeight: '800' },
  groupTitle: { fontSize: 14, fontWeight: '900', marginTop: 8, marginBottom: 8 },
  warningBox: { flexDirection: 'row', alignItems: 'center', gap: 8, borderRadius: 12, padding: 12, marginBottom: 10 },
  warningText: { fontSize: 13, fontWeight: '800' },
});

