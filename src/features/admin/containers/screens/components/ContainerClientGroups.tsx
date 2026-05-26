import React, { useCallback } from 'react';
import { RefreshControl, StyleSheet, Text, View } from 'react-native';
import { FlashList, ListRenderItem } from '@shopify/flash-list';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import type { ContainerClientGroup } from '../hooks/containerAssistTypes';
import { ContainerClientGroupItem } from './ContainerClientGroupItem';

interface ContainerClientGroupsProps {
  groups: ContainerClientGroup[];
  header: React.ReactElement;
  isRefreshing: boolean;
  onRefresh: () => void;
  onRemoveGoods: (goodsId: string) => void;
  onMarkDelivered: (goodsId: string) => void;
}

export const ContainerClientGroups: React.FC<ContainerClientGroupsProps> = ({
  groups,
  header,
  isRefreshing,
  onRefresh,
  onRemoveGoods,
  onMarkDelivered,
}) => {
  const { colors } = useAppTheme();

  const renderItem = useCallback<ListRenderItem<ContainerClientGroup>>(
    ({ item, index }) => (
      <ContainerClientGroupItem
        group={item}
        index={index}
        onRemoveGoods={onRemoveGoods}
        onMarkDelivered={onMarkDelivered}
      />
    ),
    [onMarkDelivered, onRemoveGoods],
  );

  const keyExtractor = useCallback((item: ContainerClientGroup) => item.clientId, []);

  const empty = (
    <View style={[styles.empty, { backgroundColor: colors.background.card, borderColor: colors.border }]}>
      <Ionicons name="cube-outline" size={40} color={colors.primary[400]} />
      <Text style={[styles.emptyTitle, { color: colors.text.primary }]}>Aucune marchandise</Text>
      <Text style={[styles.emptyText, { color: colors.text.secondary }]}>
        Aucun colis ne correspond aux filtres actifs.
      </Text>
    </View>
  );

  return (
    <FlashList
      data={groups}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      ListHeaderComponent={header}
      ListEmptyComponent={empty}
      refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
      contentContainerStyle={styles.content}
    />
  );
};

const styles = StyleSheet.create({
  content: { paddingBottom: 24 },
  empty: { marginHorizontal: 16, marginBottom: 16, minHeight: 150, borderRadius: 8, borderWidth: 1, alignItems: 'center', justifyContent: 'center', padding: 18 },
  emptyTitle: { marginTop: 8, fontSize: 16, fontWeight: '800' },
  emptyText: { marginTop: 4, textAlign: 'center', fontSize: 13, fontWeight: '600' },
});

export default ContainerClientGroups;
