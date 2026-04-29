/**
 * CargoBagList - List component showing cargo bags for an AWB
 */

import React from 'react';
import { View, Text, RefreshControl, StyleSheet, TouchableOpacity } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { EmptyState } from '@src/shared/ui/EmptyState';
import { CargoBag } from '../../types';
import { CargoBagCard } from './CargoBagCard';

interface CargoBagListProps {
  cargoBags: CargoBag[];
  onBagPress?: (id: string) => void;
  onCreatePress: () => void;
  loading?: boolean;
  refreshing?: boolean;
  onRefresh?: () => void;
}

export const CargoBagList: React.FC<CargoBagListProps> = ({
  cargoBags,
  onBagPress,
  onCreatePress,
  loading = false,
  refreshing = false,
  onRefresh,
}) => {
  const { colors } = useAppTheme();

  const renderItem = ({ item }: { item: CargoBag }) => (
    <CargoBagCard item={item} onPress={(id) => onBagPress?.(id)} />
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background.default }]}>
      <FlashList
        data={cargoBags}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContent}
        refreshControl={
          onRefresh ? (
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary.main} />
          ) : undefined
        }
        ListEmptyComponent={
          <EmptyState
            icon="bag-personal-off-outline"
            title="Aucun sac de cargo"
            message="Ce AWB ne contient encore aucun sac de cargo."
            actionLabel="Créer un sac"
            onAction={onCreatePress}
            loading={loading}
          />
        }
        renderItem={renderItem}
        ListHeaderComponent={
          <View style={styles.headerRow}>
            <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
              Sacs de cargo ({cargoBags.length})
            </Text>
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={onCreatePress}
              style={[styles.createButton, { backgroundColor: colors.primary.main }]}
            >
              <Ionicons name="add" size={16} color="#fff" />
              <Text style={styles.createButtonText}>Sac</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  listContent: { paddingHorizontal: 16, paddingVertical: 12 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 16, fontWeight: '700' },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },
  createButtonText: { color: '#fff', fontSize: 13, fontWeight: '700' },
});

export default CargoBagList;
