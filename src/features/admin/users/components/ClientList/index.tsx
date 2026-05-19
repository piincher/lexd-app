import React, { useCallback } from "react";
import { RefreshControl, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { userData } from "@src/shared/types/user";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { useSectionedClients, SectionItem } from "../../hooks/useSectionedClients";
import { SwipeableClientCard } from "../SwipeableClientCard";
import { SectionHeader } from "../SectionHeader";
import { EmptyState } from "../EmptyState";
import { ErrorState } from "../ErrorState";
import { LoadMoreButton } from "../LoadMoreButton";
import { ClientListSkeleton } from "../ClientListSkeleton";
import { styles } from "./ClientList.styles";

const ESTIMATED_CLIENT_HEIGHT = 100;
const ESTIMATED_HEADER_HEIGHT = 40;

interface ClientListProps {
  clients: userData[];
  pendingId: string | null;
  searchQuery: string;
  hasMore: boolean;
  isFetching: boolean;
  isRefetching: boolean;
  error: Error | null;
  selectedIds: Set<string>;
  selectionMode: boolean;
  onToggleBlock: (id: string) => void;
  onDelete: (id: string) => void;
  onNavigate: (id: string) => void;
  onSelect: (id: string) => void;
  onPreview: (client: userData) => void;
  onLoadMore: () => void;
  onRefresh: () => void;
  onClearSearch: () => void;
}

export const ClientList: React.FC<ClientListProps> = React.memo(({
  clients, pendingId, searchQuery, hasMore, isFetching, isRefetching, error,
  selectedIds, selectionMode, onToggleBlock, onDelete, onNavigate, onSelect, onPreview,
  onLoadMore, onRefresh, onClearSearch,
}) => {
  const { colors } = useAppTheme();
  const sections = useSectionedClients(clients);

  const renderItem = useCallback(({ item }: { item: SectionItem }) => {
    if (item.type === "header") return <SectionHeader letter={item.letter} count={item.count} />;
    const client = item.data;
    return (
      <SwipeableClientCard
        client={client} index={0} isLoading={pendingId === client._id}
        isSelected={selectedIds.has(client._id)} selectionMode={selectionMode}
        searchQuery={searchQuery}
        onToggleBlock={onToggleBlock} onDelete={onDelete} onNavigate={onNavigate}
        onSelect={onSelect} onPreview={onPreview}
      />
    );
  }, [pendingId, selectedIds, selectionMode, searchQuery, onToggleBlock, onDelete, onNavigate, onSelect, onPreview]);

  const keyExtractor = useCallback((item: SectionItem) =>
    item.type === "header" ? `header-${item.letter}` : item.data._id, []);

  const getItemType = useCallback((item: SectionItem) => item.type, []);

  if (isFetching && clients.length === 0 && !isRefetching) return <ClientListSkeleton />;
  if (error && clients.length === 0) return <ErrorState onRetry={onRefresh} />;

  return (
    <View style={styles.flex}>
      <FlashList
        data={sections} renderItem={renderItem} keyExtractor={keyExtractor}
        getItemType={getItemType} estimatedItemSize={ESTIMATED_CLIENT_HEIGHT}
        contentContainerStyle={styles.listContainer} showsVerticalScrollIndicator={false}
        onEndReached={onLoadMore} onEndReachedThreshold={0.5}
        {...({ refreshControl: (
          <RefreshControl refreshing={isRefetching} onRefresh={onRefresh}
            tintColor={colors.primary.main} colors={[colors.primary.main]} />
        ) } as any)}
        ListEmptyComponent={<EmptyState searchQuery={searchQuery} onClear={onClearSearch} />}
        ListFooterComponent={hasMore ? <LoadMoreButton onPress={onLoadMore} isLoading={isFetching} /> : null}
      />
    </View>
  );
});

ClientList.displayName = "ClientList";
