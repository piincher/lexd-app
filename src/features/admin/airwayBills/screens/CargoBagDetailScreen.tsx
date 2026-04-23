/**
 * CargoBagDetailScreen - Detail view of a cargo bag with assigned goods
 */

import React, { useCallback } from 'react';
import { View, Text, ScrollView, RefreshControl, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlashList } from '@shopify/flash-list';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Badge } from '@src/shared/ui/Badge';
import { Button } from '@src/shared/ui/Button';
import { EmptyState } from '@src/shared/ui/EmptyState';
import { Card } from '@src/shared/ui/Card';
import { useCargoBagDetailScreen } from './hooks/useCargoBagDetailScreen';

const STATUS_CONFIG: Record<string, { label: string; color: string }> = {
  PACKED: { label: 'Emballé', color: Theme.colors.text.secondary },
  CHECKED_IN: { label: 'Enregistré', color: '#3B82F6' },
  LOADED: { label: 'Chargé', color: '#D4AF37' },
  IN_TRANSIT: { label: 'En transit', color: '#3B82F6' },
  ARRIVED: { label: 'Arrivé', color: '#16A34A' },
  CLEARED: { label: 'Dédouané', color: '#4ECDC4' },
};

export const CargoBagDetailScreen: React.FC = () => {
  const { colors } = useAppTheme();
  const {
    cargoBag,
    goodsList,
    isLoading,
    isRefreshing,
    handleRefresh,
    handleBack,
    statusLabels,
    handleChangeStatus,
    removeMode,
    selectedRemoveIds,
    handleToggleRemoveMode,
    handleToggleRemoveSelection,
    handleConfirmRemove,
    handleAddGoods,
    isRemoving,
    isUpdatingStatus,
  } = useCargoBagDetailScreen();

  if (isLoading || !cargoBag) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background.default }]}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack}>
            <Ionicons name="arrow-back" size={24} color={colors.neutral[800]} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: colors.text.primary }]}>Détail du sac</Text>
          <View style={{ width: 24 }} />
        </View>
        <View style={styles.centered}>
          <Text style={{ color: colors.text.secondary }}>Chargement...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const statusConfig = STATUS_CONFIG[cargoBag.status];
  const isEmpty = goodsList.length === 0;

  const renderGoodsItem = useCallback(
    ({ item }: { item: any }) => {
      const isSelected = selectedRemoveIds.includes(item._id);
      return (
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => removeMode && handleToggleRemoveSelection(item._id)}
          disabled={!removeMode}
        >
          <Card style={[styles.goodsCard, ...(isSelected ? [{ borderColor: colors.status.error, borderWidth: 2 }] : [])]} padding="medium">
            <View style={styles.goodsRow}>
              {removeMode && (
                <View style={[styles.checkbox, isSelected && { backgroundColor: colors.status.error }]}>
                  {isSelected && <Ionicons name="checkmark" size={14} color="#fff" />}
                </View>
              )}
              <MaterialCommunityIcons name="cube-outline" size={20} color={colors.primary.main} />
              <View style={styles.goodsInfo}>
                <Text style={[styles.goodsId, { color: colors.text.primary }]}>{item.goodsId}</Text>
                {item.description && (
                  <Text style={[styles.goodsDesc, { color: colors.text.secondary }]} numberOfLines={1}>
                    {item.description}
                  </Text>
                )}
                <Text style={[styles.goodsMeta, { color: colors.text.muted }]}>
                  {item.quantity} colis · {item.weight?.toFixed?.(1) || item.weight} kg
                </Text>
              </View>
              <Badge
                label={item.status || 'N/A'}
                variant="default"
                backgroundColor={`${colors.neutral[300]}22`}
                textColor={colors.text.secondary}
              />
            </View>
          </Card>
        </TouchableOpacity>
      );
    },
    [removeMode, selectedRemoveIds, colors, handleToggleRemoveSelection]
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.default }]} edges={['bottom']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <Ionicons name="arrow-back" size={24} color={colors.neutral[800]} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text.primary }]} numberOfLines={1}>
          {cargoBag.bagNumber}
        </Text>
        <TouchableOpacity onPress={handleToggleRemoveMode} disabled={isEmpty}>
          <Ionicons
            name={removeMode ? 'close' : 'remove-circle-outline'}
            size={24}
            color={isEmpty ? colors.text.disabled : colors.status.error}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} tintColor={colors.primary.main} />
        }
      >
        {/* Bag Info Card */}
        <Card style={[styles.bagCard, { borderLeftColor: statusConfig.color }]} padding="large">
          <View style={styles.bagHeaderRow}>
            <View style={styles.bagInfo}>
              <MaterialCommunityIcons name="bag-personal-outline" size={22} color={colors.primary.main} />
              <Text style={[styles.bagNumber, { color: colors.text.primary }]}>{cargoBag.bagNumber}</Text>
            </View>
            <Badge
              label={statusLabels[cargoBag.status]}
              variant="custom"
              backgroundColor={`${statusConfig.color}18`}
              textColor={statusConfig.color}
            />
          </View>

          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.text.primary }]}>{cargoBag.totalPackages}</Text>
              <Text style={[styles.statLabel, { color: colors.text.secondary }]}>Colis</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.text.primary }]}>
                {cargoBag.totalWeight?.toFixed?.(1) || cargoBag.totalWeight} kg
              </Text>
              <Text style={[styles.statLabel, { color: colors.text.secondary }]}>Poids</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.text.primary }]}>{cargoBag.goodsCount}</Text>
              <Text style={[styles.statLabel, { color: colors.text.secondary }]}>Articles</Text>
            </View>
          </View>

          {cargoBag.notes && (
            <View style={styles.notesRow}>
              <MaterialCommunityIcons name="text-box-outline" size={14} color={colors.text.muted} />
              <Text style={[styles.notesText, { color: colors.text.secondary }]}>{cargoBag.notes}</Text>
            </View>
          )}
        </Card>

        {/* Goods Section */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
            Marchandises ({goodsList.length})
          </Text>
        </View>

        {isEmpty ? (
          <EmptyState
            icon="cube-outline"
            title="Aucune marchandise"
            message="Ce sac ne contient encore aucune marchandise."
            actionLabel="Ajouter des marchandises"
            onAction={handleAddGoods}
          />
        ) : (
          <FlashList
            data={goodsList}
            keyExtractor={(item) => item._id}
            renderItem={renderGoodsItem}
            estimatedItemSize={80}
            scrollEnabled={false}
          />
        )}

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Footer Actions */}
      <View style={[styles.footer, { backgroundColor: colors.background.default, borderTopColor: colors.border }]}>
        {removeMode ? (
          <Button
            title={`Retirer (${selectedRemoveIds.length})`}
            onPress={handleConfirmRemove}
            variant="danger"
            fullWidth
            loading={isRemoving}
            disabled={selectedRemoveIds.length === 0 || isRemoving}
          />
        ) : (
          <>
            <Button
              title="+ Ajouter des marchandises"
              onPress={handleAddGoods}
              variant="primary"
              fullWidth
            />
            {!isEmpty && (
              <Button
                title="Retirer des marchandises"
                onPress={handleToggleRemoveMode}
                variant="outline"
                fullWidth
              />
            )}
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: { fontSize: 18, fontWeight: '700', flex: 1, marginHorizontal: 12 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  scrollContent: { padding: 16, paddingBottom: 60 },
  bagCard: { marginBottom: 16, borderLeftWidth: 4 },
  bagHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  bagInfo: { flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1 },
  bagNumber: { fontSize: 18, fontWeight: '800' },
  statsGrid: { flexDirection: 'row', gap: 16 },
  statItem: { flex: 1, alignItems: 'center', paddingVertical: 10, borderRadius: 10 },
  statValue: { fontSize: 16, fontWeight: '800' },
  statLabel: { fontSize: 12, fontWeight: '500', marginTop: 2 },
  notesRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(150,150,150,0.1)',
  },
  notesText: { fontSize: 13, fontWeight: '500', flex: 1, lineHeight: 18 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 16, fontWeight: '700' },
  goodsCard: { marginBottom: 8 },
  goodsRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  goodsInfo: { flex: 1 },
  goodsId: { fontSize: 14, fontWeight: '700' },
  goodsDesc: { fontSize: 13, marginTop: 2 },
  goodsMeta: { fontSize: 12, marginTop: 2, fontWeight: '500' },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    gap: 10,
    borderTopWidth: 1,
  },
});

export default CargoBagDetailScreen;
