import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView } from 'moti';
import { useReducedMotion } from 'react-native-reanimated';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Theme } from '@src/constants/Theme';
import { Input } from '@src/shared/ui/Input';
import { ConfirmDialog } from '@src/shared/ui/ConfirmDialog';
import {
  RewardThumb,
  PointsPill,
  StockMeter,
  StatusPill,
  PickupPill,
} from '../components/RewardVisuals';
import { useAdminRewardItems } from '../hooks/useAdminRewards';
import type { RewardItem } from '../api/adminRewardApi';
import AdminRewardItemFormScreen from './AdminRewardItemFormScreen';
import { createStyles } from './AdminRewardItemsScreen.styles';

const AdminRewardItemsScreen: React.FC = () => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);
  const reducedMotion = useReducedMotion();
  const { query, remove, clone } = useAdminRewardItems();
  const [search, setSearch] = useState('');
  const [editingItem, setEditingItem] = useState<RewardItem | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const allItems = query.data ?? [];
  const items = allItems.filter((i) =>
    i.name.toLowerCase().includes(search.toLowerCase())
  );

  // Honest stats — computed from the FULL list, not the filtered view.
  const totalCount = allItems.length;
  const activeCount = allItems.filter((i) => i.status === 'ACTIVE').length;
  const stockTotal = allItems.reduce((sum, i) => sum + (i.stock ?? 0), 0);

  const openCreate = useCallback(() => { setEditingItem(null); setShowForm(true); }, []);
  const openEdit = useCallback((item: RewardItem) => { setEditingItem(item); setShowForm(true); }, []);
  const closeForm = useCallback(() => { setShowForm(false); setEditingItem(null); }, []);

  const handleDelete = useCallback((id: string) => {
    remove.mutate(id, {
      onSuccess: () => setDeleteId(null),
      onError: (err: Error) => Alert.alert('Erreur', err.message || 'Suppression impossible'),
    });
  }, [remove]);

  // Clone copies every field server-side (INACTIVE), then we open the copy so the
  // operator can tweak name/points/stock and activate — no re-typing from scratch.
  const handleClone = useCallback((item: RewardItem) => {
    if (clone.isPending) return;
    clone.mutate(item.id, { onSuccess: (newItem) => openEdit(newItem) });
  }, [clone, openEdit]);

  const renderItem = ({ item, index }: { item: RewardItem; index: number }) => {
    const card = (
      <TouchableOpacity style={styles.card} onPress={() => openEdit(item)} activeOpacity={0.85}>
        <RewardThumb uri={item.imageUrl} size={64} />
        <View style={styles.cardBody}>
          <View style={styles.cardHeadRow}>
            <View style={styles.cardTitleCol}>
              {!!item.category && <Text style={styles.overline}>{item.category}</Text>}
              <Text style={styles.name} numberOfLines={2}>{item.name}</Text>
            </View>
            <View style={styles.cardActions}>
              <TouchableOpacity
                style={styles.cardActionBtn}
                onPress={() => handleClone(item)}
                activeOpacity={0.85}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                accessibilityLabel="Dupliquer l'article"
              >
                <Ionicons name="copy-outline" size={18} color={colors.primary.main} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.trashBtn}
                onPress={() => setDeleteId(item.id)}
                activeOpacity={0.85}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                accessibilityLabel="Supprimer l'article"
              >
                <Ionicons name="trash-outline" size={18} color={colors.status.error} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.pointsRow}>
            <PointsPill points={item.pointsRequired} />
          </View>

          <StockMeter stock={item.stock} />

          <View style={styles.chipRow}>
            <StatusPill active={item.status === 'ACTIVE'} />
            <PickupPill method={item.pickupMethod} />
          </View>
        </View>
      </TouchableOpacity>
    );

    if (reducedMotion) {
      return <View>{card}</View>;
    }

    return (
      <MotiView
        from={{ opacity: 0, translateY: 8 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ delay: Math.min(index, 6) * 40 }}
      >
        {card}
      </MotiView>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <LinearGradient
        colors={Theme.gradients.gold}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.hero}
      >
        <Text style={styles.heroOverline}>CATALOGUE</Text>
        <Text style={styles.heroTitle}>Articles de récompense</Text>
        <View style={styles.statRow}>
          <View style={styles.statChip}>
            <Text style={styles.statValue}>{totalCount}</Text>
            <Text style={styles.statLabel}>Articles</Text>
          </View>
          <View style={styles.statChip}>
            <Text style={styles.statValue}>{activeCount}</Text>
            <Text style={styles.statLabel}>Actifs</Text>
          </View>
          <View style={styles.statChip}>
            <Text style={styles.statValue}>{stockTotal}</Text>
            <Text style={styles.statLabel}>Stock total</Text>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.searchBand}>
        <View style={styles.searchCard}>
          <Input
            placeholder="Rechercher..."
            value={search}
            onChangeText={setSearch}
            leftIcon="search"
            fullWidth
            containerStyle={{ marginBottom: 0 }}
          />
        </View>
      </View>

      {query.isLoading ? (
        <View style={styles.stateWrap}>
          <View style={styles.stateIconRing}>
            <MaterialCommunityIcons name="loading" size={34} color={colors.primary.main} />
          </View>
          <Text style={styles.stateTitle}>Chargement…</Text>
        </View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.stateWrap}>
              <View style={styles.stateIconRing}>
                <MaterialCommunityIcons name="gift-off-outline" size={40} color={colors.text.disabled} />
              </View>
              <Text style={styles.stateTitle}>Aucun article trouvé</Text>
              <Text style={styles.stateSubtitle}>Ajoutez un article de récompense pour démarrer le catalogue.</Text>
            </View>
          }
        />
      )}

      <TouchableOpacity style={styles.fab} onPress={openCreate} activeOpacity={0.85}>
        <Ionicons name="add" size={28} color={colors.text.inverse} />
      </TouchableOpacity>

      <Modal visible={showForm} animationType="slide" presentationStyle="pageSheet">
        <AdminRewardItemFormScreen item={editingItem} onClose={closeForm} />
      </Modal>

      <ConfirmDialog
        visible={!!deleteId}
        title="Supprimer l'article"
        message="Cette action est irréversible."
        confirmText="Supprimer"
        cancelText="Annuler"
        variant="danger"
        loading={remove.isPending}
        onConfirm={() => deleteId && handleDelete(deleteId)}
        onCancel={() => setDeleteId(null)}
      />
    </SafeAreaView>
  );
};

export default AdminRewardItemsScreen;
