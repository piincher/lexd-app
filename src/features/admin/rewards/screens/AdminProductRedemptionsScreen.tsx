import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, Alert, TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Input } from '@src/shared/ui/Input';
import { Badge } from '@src/shared/ui/Badge';
import { useAdminProductRedemptions } from '../hooks/useAdminRewards';
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
  const { query, approve, reject, ready, collect } = useAdminProductRedemptions(status, search, page);

  const items = query.data?.items || [];
  const pagination = query.data?.pagination || { page: 1, limit: 20, total: 0, pages: 1 };

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

  const handleCollect = useCallback((id: string) => {
    Alert.alert('Collecté', 'Confirmer la collecte ?', [
      { text: 'Annuler', style: 'cancel' },
      { text: 'Confirmer', onPress: () => collect.mutate(id) },
    ]);
  }, [collect]);

  const submitReject = useCallback(() => {
    if (!rejectModal?.reason.trim()) { Alert.alert('Erreur', 'Veuillez indiquer un motif.'); return; }
    reject.mutate({ id: rejectModal.id, reason: rejectModal.reason }, {
      onSuccess: () => setRejectModal(null),
    });
  }, [rejectModal, reject]);

  const renderItem = ({ item }: { item: ProductRedemption }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.cardUser}>
          <Text style={styles.cardUserName}>{item.user?.name || 'Inconnu'}</Text>
          <Text style={styles.cardUserPhone}>{item.user?.phoneNumber || item.phoneVerification}</Text>
        </View>
        <Badge label={statusLabel(item.status)} variant={statusVariant(item.status)} size="small" />
      </View>
      <View style={styles.cardMeta}>
        <Text style={styles.cardMetaText}>{item.requestedPoints} pts</Text>
        <Text style={styles.cardMetaText}>Qty: {item.quantity}</Text>
        <Text style={styles.cardMetaText}>{new Date(item.createdAt).toLocaleDateString('fr-FR')}</Text>
      </View>
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
        {item.status === 'READY_FOR_PICKUP' && (
          <TouchableOpacity style={[styles.actionButton, styles.actionButtonPrimary]} onPress={() => handleCollect(item.id)} activeOpacity={0.8}>
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
      </View>

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
    </SafeAreaView>
  );
};

export default AdminProductRedemptionsScreen;
