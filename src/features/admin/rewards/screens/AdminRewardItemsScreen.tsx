import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Input } from '@src/shared/ui/Input';
import { Badge } from '@src/shared/ui/Badge';
import { ConfirmDialog } from '@src/shared/ui/ConfirmDialog';
import { useAdminRewardItems } from '../hooks/useAdminRewards';
import type { RewardItem } from '../api/adminRewardApi';
import AdminRewardItemFormScreen from './AdminRewardItemFormScreen';
import { createStyles } from './AdminRewardItemsScreen.styles';

const AdminRewardItemsScreen: React.FC = () => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);
  const { query, remove } = useAdminRewardItems();
  const [search, setSearch] = useState('');
  const [editingItem, setEditingItem] = useState<RewardItem | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const items = (query.data || []).filter((i) =>
    i.name.toLowerCase().includes(search.toLowerCase())
  );

  const openCreate = useCallback(() => { setEditingItem(null); setShowForm(true); }, []);
  const openEdit = useCallback((item: RewardItem) => { setEditingItem(item); setShowForm(true); }, []);
  const closeForm = useCallback(() => { setShowForm(false); setEditingItem(null); }, []);

  const handleDelete = useCallback((id: string) => {
    remove.mutate(id, {
      onSuccess: () => setDeleteId(null),
      onError: (err: Error) => Alert.alert('Erreur', err.message || 'Suppression impossible'),
    });
  }, [remove]);

  const renderItem = ({ item }: { item: RewardItem }) => (
    <TouchableOpacity style={styles.card} onPress={() => openEdit(item)} activeOpacity={0.8}>
      {item.imageUrl ? (
        <Image source={{ uri: item.imageUrl }} style={styles.image} />
      ) : (
        <View style={styles.imagePlaceholder}>
          <Ionicons name="gift-outline" size={24} color={colors.text.disabled} />
        </View>
      )}
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.meta}>{item.pointsRequired} pts · Stock: {item.stock}</Text>
        <View style={styles.row}>
          <Badge label={item.status === 'ACTIVE' ? 'Actif' : 'Inactif'} variant={item.status === 'ACTIVE' ? 'success' : 'neutral'} size="small" />
          <Badge label={item.pickupMethod === 'PICKUP' ? 'Retrait' : 'Livraison'} variant="info" size="small" />
        </View>
      </View>
      <TouchableOpacity onPress={() => setDeleteId(item.id)} activeOpacity={0.7}>
        <Ionicons name="trash-outline" size={20} color={colors.status.error} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Articles de récompense</Text>
          <Text style={styles.headerSubtitle}>{items.length} article{items.length !== 1 ? 's' : ''}</Text>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <Input
          placeholder="Rechercher..."
          value={search}
          onChangeText={setSearch}
          leftIcon="search"
          fullWidth
          containerStyle={{ marginBottom: 0 }}
        />
      </View>

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
              <MaterialCommunityIcons name="gift-off-outline" size={48} color={colors.text.disabled} />
              <Text style={styles.emptyText}>Aucun article trouvé</Text>
            </View>
          }
        />
      )}

      <TouchableOpacity style={styles.fab} onPress={openCreate} activeOpacity={0.8}>
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
