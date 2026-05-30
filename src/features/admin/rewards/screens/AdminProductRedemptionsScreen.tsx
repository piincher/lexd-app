import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, Alert, TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Input } from '@src/shared/ui/Input';
import { Badge } from '@src/shared/ui/Badge';
import { useAdminProductRedemptions, useAdminRedemptionAnalytics } from '../hooks/useAdminRewards';
import { getAdminProductRedemptions } from '../api/adminRewardApi';
import { exportRedemptionsCsv } from '../lib/redemptionCsv';
import { RedemptionAnalyticsBar } from '../components/RedemptionAnalyticsBar';
import type { ProductRedemption, RedemptionStatusFilter } from '../types';
import { createStyles } from './AdminProductRedemptionsScreen.styles';

const FILTERS: { key: RedemptionStatusFilter; label: string }[] = [
  { key: 'all', label: 'Tous' },
  { key: 'PENDING', label: 'En attente' },
  { key: 'APPROVED', label: 'Approuvé' },
  { key: 'READY_FOR_PICKUP', label: 'Prêt' },
  { key: 'COLLECTED', label: 'Collecté' },
  { key: 'REJECTED', label: 'Rejeté' },
  { key: 'CANCELLED', label: 'Annulé' },
];

const statusVariant = (status: string) => {
  switch (status) {
    case 'PENDING': return 'warning';
    case 'APPROVED': return 'success';
    case 'READY_FOR_PICKUP': return 'info';
    case 'COLLECTED': return 'primary';
    case 'REJECTED': return 'error';
    case 'CANCELLED': return 'neutral';
    default: return 'default';
  }
};

const statusLabel = (status: string) => {
  switch (status) {
    case 'PENDING': return 'En attente';
    case 'APPROVED': return 'Approuvé';
    case 'READY_FOR_PICKUP': return 'Prêt';
    case 'COLLECTED': return 'Collecté';
    case 'REJECTED': return 'Rejeté';
    case 'CANCELLED': return 'Annulé';
    default: return status;
  }
};

const AdminProductRedemptionsScreen: React.FC = () => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);
  const [status, setStatus] = useState<RedemptionStatusFilter>('all');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [rejectModal, setRejectModal] = useState<{ id: string; reason: string } | null>(null);
  const [collectModal, setCollectModal] = useState<{ id: string; code: string; expected: string | null } | null>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [exporting, setExporting] = useState(false);
  const { query, approve, reject, ready, collect, bulkApprove } = useAdminProductRedemptions(status, search, page);

  const items = query.data?.items || [];
  const pagination = query.data?.pagination || { page: 1, limit: 20, total: 0, pages: 1 };

  const toggleSelect = useCallback((id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }, []);

  const handleBulkApprove = useCallback(() => {
    const ids = Array.from(selected);
    if (ids.length === 0) return;
    Alert.alert('Approuver', `Approuver ${ids.length} demande(s) ?`, [
      { text: 'Annuler', style: 'cancel' },
      {
        text: 'Approuver',
        onPress: () => bulkApprove.mutate({ ids }, { onSuccess: () => setSelected(new Set()) }),
      },
    ]);
  }, [selected, bulkApprove]);

  const handleExport = useCallback(async () => {
    setExporting(true);
    try {
      // Export the current filtered view (up to 100 rows), not just the page.
      const data = await getAdminProductRedemptions(status === 'all' ? undefined : status, search || undefined, 1, 100);
      const ok = await exportRedemptionsCsv(data.items);
      if (!ok) Alert.alert('Export', 'Aucune donnée à exporter.');
    } catch (err) {
      Alert.alert('Export', err instanceof Error ? err.message : 'Export impossible');
    } finally {
      setExporting(false);
    }
  }, [status, search]);

  const handleStatusChange = useCallback((key: RedemptionStatusFilter) => {
    setStatus(key);
    setPage(1);
  }, []);

  const handleSearchChange = useCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, []);

  const handleApprove = useCallback((id: string) => {
    Alert.alert('Approuver', 'Confirmer l\'approbation ?', [
      { text: 'Annuler', style: 'cancel' },
      { text: 'Approuver', onPress: () => approve.mutate(id) },
    ]);
  }, [approve]);

  const handleReady = useCallback((id: string) => {
    Alert.alert('Prêt pour retrait', 'Marquer comme prêt ?', [
      { text: 'Annuler', style: 'cancel' },
      { text: 'Confirmer', onPress: () => ready.mutate(id) },
    ]);
  }, [ready]);

  const handleCollect = useCallback((item: ProductRedemption) => {
    // Prompt for the pickup code so the backend can verify the right person collects.
    setCollectModal({ id: item.id, code: '', expected: item.pickupCode });
  }, []);

  const submitCollect = useCallback(() => {
    if (!collectModal) return;
    const code = collectModal.code.trim();
    collect.mutate(
      { id: collectModal.id, pickupCode: code || undefined },
      { onSuccess: () => setCollectModal(null) }
    );
  }, [collectModal, collect]);

  const submitReject = useCallback(() => {
    if (!rejectModal?.reason.trim()) { Alert.alert('Erreur', 'Veuillez indiquer un motif.'); return; }
    reject.mutate({ id: rejectModal.id, reason: rejectModal.reason }, {
      onSuccess: () => setRejectModal(null),
    });
  }, [rejectModal, reject]);

  const renderItem = ({ item }: { item: ProductRedemption }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        {item.status === 'PENDING' && (
          <TouchableOpacity onPress={() => toggleSelect(item.id)} activeOpacity={0.7} style={{ marginRight: 4 }}>
            <Ionicons
              name={selected.has(item.id) ? 'checkbox' : 'square-outline'}
              size={22}
              color={selected.has(item.id) ? colors.primary.main : colors.text.disabled}
            />
          </TouchableOpacity>
        )}
        <View style={styles.cardUser}>
          <Text style={styles.cardUserName}>{item.user?.name || 'Inconnu'}</Text>
          <Text style={styles.cardUserPhone}>{item.user?.phoneNumber || item.phoneVerification}</Text>
        </View>
        <Badge label={statusLabel(item.status)} variant={statusVariant(item.status)} size="small" />
      </View>
      {item.rewardItem?.name ? (
        <Text style={{ fontSize: 14, fontWeight: '700', color: colors.text.primary }} numberOfLines={1}>
          {item.rewardItem.name}
        </Text>
      ) : null}
      <View style={styles.cardMeta}>
        <Text style={styles.cardMetaText}>{item.requestedPoints} pts</Text>
        <Text style={styles.cardMetaText}>Qté: {item.quantity}</Text>
        <Text style={styles.cardMetaText}>{new Date(item.createdAt).toLocaleDateString('fr-FR')}</Text>
      </View>
      {item.pickupCode && (item.status === 'APPROVED' || item.status === 'READY_FOR_PICKUP') ? (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          <Ionicons name="key-outline" size={14} color={colors.accent.goldDark} />
          <Text style={{ fontSize: 13, fontWeight: '800', letterSpacing: 2, color: colors.accent.goldDark }}>
            {item.pickupCode}
          </Text>
        </View>
      ) : null}
      {item.customerRemarks ? (
        <View style={styles.cardRemarks}>
          <Text style={styles.cardRemarksLabel}>Remarques client</Text>
          <Text style={styles.cardRemarksText}>{item.customerRemarks}</Text>
        </View>
      ) : null}
      <View style={styles.actionsRow}>
        {item.status === 'PENDING' && (
          <>
            <TouchableOpacity style={[styles.actionButton, styles.actionButtonPrimary]} onPress={() => handleApprove(item.id)} activeOpacity={0.8}>
              <Text style={styles.actionButtonText}>Approuver</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, styles.actionButtonDanger]} onPress={() => setRejectModal({ id: item.id, reason: '' })} activeOpacity={0.8}>
              <Text style={[styles.actionButtonText, styles.actionButtonTextDanger]}>Rejeter</Text>
            </TouchableOpacity>
          </>
        )}
        {item.status === 'APPROVED' && (
          <TouchableOpacity style={[styles.actionButton, styles.actionButtonSuccess]} onPress={() => handleReady(item.id)} activeOpacity={0.8}>
            <Text style={[styles.actionButtonText, styles.actionButtonTextSuccess]}>Prêt pour retrait</Text>
          </TouchableOpacity>
        )}
        {(item.status === 'READY_FOR_PICKUP' || item.status === 'APPROVED') && (
          <TouchableOpacity style={[styles.actionButton, styles.actionButtonPrimary]} onPress={() => handleCollect(item)} activeOpacity={0.8}>
            <Text style={styles.actionButtonText}>Marquer collecté</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Demandes de rédemption</Text>
          <Text style={styles.headerSubtitle}>{pagination.total} au total</Text>
        </View>
        <TouchableOpacity
          onPress={handleExport}
          disabled={exporting}
          style={{ width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.neutral[100] }}
          activeOpacity={0.7}
        >
          {exporting
            ? <MaterialCommunityIcons name="loading" size={22} color={colors.primary.main} />
            : <Ionicons name="download-outline" size={22} color={colors.primary.main} />}
        </TouchableOpacity>
      </View>

      <RedemptionAnalyticsBar />

      <View style={styles.searchContainer}>
        <Input placeholder="Rechercher..." value={search} onChangeText={handleSearchChange} leftIcon="search" fullWidth containerStyle={{ marginBottom: 0 }} />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
        {FILTERS.map((f) => (
          <TouchableOpacity key={f.key} style={[styles.filterChip, status === f.key && styles.filterChipActive]} onPress={() => handleStatusChange(f.key)} activeOpacity={0.8}>
            <Text style={[styles.filterChipText, status === f.key && styles.filterChipTextActive]}>{f.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {query.isLoading ? (
        <View style={styles.loader}>
          <MaterialCommunityIcons name="loading" size={32} color={colors.primary.main} />
          <Text style={styles.loaderText}>Chargement...</Text>
        </View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={renderItem}
          ListEmptyComponent={
            <View style={styles.empty}>
              <MaterialCommunityIcons name="inbox-remove-outline" size={48} color={colors.text.disabled} />
              <Text style={styles.emptyText}>Aucune demande</Text>
            </View>
          }
          ListFooterComponent={
            pagination.pages > 1 ? (
              <View style={styles.pagination}>
                <TouchableOpacity style={[styles.pageButton, page <= 1 && styles.pageButtonDisabled]} onPress={() => setPage((p) => Math.max(1, p - 1))} disabled={page <= 1} activeOpacity={0.7}>
                  <Ionicons name="chevron-back" size={18} color={page <= 1 ? colors.text.disabled : colors.text.primary} />
                </TouchableOpacity>
                <Text style={styles.pageText}>Page {page} / {pagination.pages}</Text>
                <TouchableOpacity style={[styles.pageButton, page >= pagination.pages && styles.pageButtonDisabled]} onPress={() => setPage((p) => Math.min(pagination.pages, p + 1))} disabled={page >= pagination.pages} activeOpacity={0.7}>
                  <Ionicons name="chevron-forward" size={18} color={page >= pagination.pages ? colors.text.disabled : colors.text.primary} />
                </TouchableOpacity>
              </View>
            ) : null
          }
        />
      )}

      {selected.size > 0 && (
        <View style={{ position: 'absolute', left: 16, right: 16, bottom: 24, flexDirection: 'row', gap: 10, alignItems: 'center' }}>
          <TouchableOpacity
            onPress={() => setSelected(new Set())}
            style={{ width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background.card, borderWidth: 1, borderColor: colors.border }}
            activeOpacity={0.8}
          >
            <Ionicons name="close" size={22} color={colors.text.primary} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleBulkApprove}
            disabled={bulkApprove.isPending}
            style={{ flex: 1, height: 48, borderRadius: 24, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: colors.primary.main, opacity: bulkApprove.isPending ? 0.6 : 1 }}
            activeOpacity={0.85}
          >
            <Ionicons name="checkmark-done" size={20} color={colors.text.inverse} />
            <Text style={{ color: colors.text.inverse, fontWeight: '800', fontSize: 15 }}>
              {bulkApprove.isPending ? 'Approbation…' : `Approuver ${selected.size} demande${selected.size > 1 ? 's' : ''}`}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <Modal visible={!!rejectModal} transparent animationType="fade" onRequestClose={() => setRejectModal(null)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Motif du rejet</Text>
            <TextInput
              style={styles.modalInput}
              value={rejectModal?.reason || ''}
              onChangeText={(t) => setRejectModal((prev) => prev ? { ...prev, reason: t } : null)}
              placeholder="Indiquez un motif..."
              multiline
              autoFocus
            />
            <View style={styles.modalActions}>
              <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.neutral[200] }]} onPress={() => setRejectModal(null)} activeOpacity={0.8}>
                <Text style={[styles.actionButtonText, { color: colors.text.primary }]}>Annuler</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.actionButton, styles.actionButtonDanger]} onPress={submitReject} disabled={reject.isPending} activeOpacity={0.8}>
                <Text style={[styles.actionButtonText, styles.actionButtonTextDanger]}>{reject.isPending ? 'Rejet...' : 'Rejeter'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal visible={!!collectModal} transparent animationType="fade" onRequestClose={() => setCollectModal(null)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Vérifier le code de retrait</Text>
            <Text style={{ fontSize: 13, color: colors.text.secondary, marginBottom: 10 }}>
              Demandez au client son code de retrait et saisissez-le pour confirmer la remise.
            </Text>
            <TextInput
              style={[styles.modalInput, { textAlign: 'center', letterSpacing: 6, fontSize: 22, fontWeight: '800' }]}
              value={collectModal?.code || ''}
              onChangeText={(t) => setCollectModal((prev) => prev ? { ...prev, code: t.toUpperCase() } : null)}
              placeholder="------"
              autoCapitalize="characters"
              autoCorrect={false}
              maxLength={8}
              autoFocus
            />
            <View style={styles.modalActions}>
              <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.neutral[200] }]} onPress={() => setCollectModal(null)} activeOpacity={0.8}>
                <Text style={[styles.actionButtonText, { color: colors.text.primary }]}>Annuler</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.actionButton, styles.actionButtonPrimary]} onPress={submitCollect} disabled={collect.isPending} activeOpacity={0.8}>
                <Text style={styles.actionButtonText}>{collect.isPending ? 'Vérification…' : 'Confirmer la remise'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default AdminProductRedemptionsScreen;
