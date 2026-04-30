import React from "react";
import { View, RefreshControl, StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { FlashList } from "@shopify/flash-list";
import { Theme } from "@src/constants/Theme";
import { SearchResultItem, SearchResultsProps } from "../../types/searchResults";
import { GoodsResultItem } from "./GoodsResultItem";
import { ContainerResultItem } from "./ContainerResultItem";
import { ClientResultItem } from "./ClientResultItem";

type EntitySearchResultsProps = Pick<
  SearchResultsProps,
  | "entity"
  | "results"
  | "onItemPress"
  | "onRefresh"
  | "onLoadMore"
  | "pagination"
  | "isLoading"
  | "highlightQuery"
>;

export const EntitySearchResults: React.FC<EntitySearchResultsProps> = ({
  entity,
  results,
  onItemPress,
  onRefresh,
  onLoadMore,
  pagination,
  isLoading,
  highlightQuery = "",
}) => {
  const handlePress = (item: SearchResultItem) => onItemPress(item, entity);

  const renderItem = ({ item }: { item: SearchResultItem }) => {
    if (entity === "goods") {
      return (
        <GoodsResultItem
          item={item}
          onPress={handlePress}
          highlightQuery={highlightQuery}
        />
      );
    }
    if (entity === "containers") {
      return (
        <ContainerResultItem
          item={item}
          onPress={handlePress}
          highlightQuery={highlightQuery}
        />
      );
    }
    return (
      <ClientResultItem
        item={item}
        onPress={handlePress}
        highlightQuery={highlightQuery}
      />
    );
  };

  return (
    <FlashList
      data={results.data || []}
      renderItem={renderItem}
      keyExtractor={(item) => item._id}
      refreshControl={
        onRefresh ? (
          <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
        ) : undefined
      }
      onEndReached={onLoadMore}
      onEndReachedThreshold={0.5}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      contentContainerStyle={styles.listContent}
      ListFooterComponent={
        pagination?.hasNext ? (
          <View style={styles.loadMoreContainer}>
            <ActivityIndicator size="small" color={Theme.primary[500]} />
          </View>
        ) : null
      }
    />
  );
};

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: Theme.spacing.xl,
  },
  separator: {
    height: 1,
    backgroundColor: Theme.neutral[100],
    marginLeft: 72,
  },
  loadMoreContainer: {
    paddingVertical: Theme.spacing.lg,
    alignItems: "center",
  },
});
