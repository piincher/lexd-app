import React, { useCallback } from "react";
import { FlashList } from "@shopify/flash-list";
import { userData } from "@src/shared/types/user";
import { ClientCard } from "../ClientCard";
import { EmptyState } from "../EmptyState";
import { LoadMoreButton } from "../LoadMoreButton";
import { styles } from "./ClientList.styles";

interface ClientListProps {
  clients: userData[];
  pendingId: string | null;
  searchQuery: string;
  hasMore: boolean;
  isFetching: boolean;
  onToggleBlock: (id: string) => void;
  onDelete: (id: string) => void;
  onLoadMore: () => void;
  onClearSearch: () => void;
}

export const ClientList: React.FC<ClientListProps> = ({
  clients,
  pendingId,
  searchQuery,
  hasMore,
  isFetching,
  onToggleBlock,
  onDelete,
  onLoadMore,
  onClearSearch,
}) => {
  const renderItem = useCallback(({ item, index }: { item: userData; index: number }) => (
    <ClientCard
      client={item}
      onToggleBlock={onToggleBlock}
      onDelete={onDelete}
      index={index}
      isLoading={pendingId === item._id}
    />
  ), [onToggleBlock, onDelete, pendingId]);

  return (
    <FlashList
      data={clients}
      renderItem={renderItem}
      keyExtractor={(item) => item._id}
      contentContainerStyle={styles.listContainer}
      showsVerticalScrollIndicator={false}
      onEndReached={onLoadMore}
      onEndReachedThreshold={0.5}
      ListEmptyComponent={
        <EmptyState searchQuery={searchQuery} onClear={onClearSearch} />
      }
      ListFooterComponent={
        hasMore ? <LoadMoreButton onPress={onLoadMore} isLoading={isFetching} /> : null
      }
    />
  );
};

export default ClientList;
