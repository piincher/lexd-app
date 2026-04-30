import React from "react";
import { RefreshControl, StyleSheet } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { Theme } from "@src/constants/Theme";
import { SearchResultItem, SearchResultsProps } from "../../types/searchResults";
import { SearchResultSection } from "./SearchResultSection";
import { GoodsResultItem } from "./GoodsResultItem";
import { ContainerResultItem } from "./ContainerResultItem";
import { ClientResultItem } from "./ClientResultItem";

type GlobalSearchResultsProps = Pick<
  SearchResultsProps,
  | "results"
  | "onItemPress"
  | "onRefresh"
  | "onLoadMore"
  | "isLoading"
  | "highlightQuery"
>;

export const GlobalSearchResults: React.FC<GlobalSearchResultsProps> = ({
  results,
  onItemPress,
  onRefresh,
  onLoadMore,
  isLoading,
  highlightQuery = "",
}) => {
  const handleGoodsPress = (item: SearchResultItem) =>
    onItemPress(item, "goods");
  const handleContainerPress = (item: SearchResultItem) =>
    onItemPress(item, "container");
  const handleClientPress = (item: SearchResultItem) =>
    onItemPress(item, "client");

  return (
    <FlashList
      data={[{ key: "content" }]}
      renderItem={() => (
        <>
          <SearchResultSection
            title="Marchandises"
            icon="cube"
            items={results.goods || []}
            renderItem={({ item }) => (
              <GoodsResultItem
                item={item}
                onPress={handleGoodsPress}
                highlightQuery={highlightQuery}
              />
            )}
            total={0}
          />
          <SearchResultSection
            title="Containers"
            icon="airplane"
            items={results.containers || []}
            renderItem={({ item }) => (
              <ContainerResultItem
                item={item}
                onPress={handleContainerPress}
                highlightQuery={highlightQuery}
              />
            )}
            total={0}
          />
          <SearchResultSection
            title="Clients"
            icon="people"
            items={results.clients || []}
            renderItem={({ item }) => (
              <ClientResultItem
                item={item}
                onPress={handleClientPress}
                highlightQuery={highlightQuery}
              />
            )}
            total={0}
          />
        </>
      )}
      refreshControl={
        onRefresh ? (
          <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
        ) : undefined
      }
      onEndReached={onLoadMore}
      onEndReachedThreshold={0.5}
      contentContainerStyle={styles.listContent}
    />
  );
};

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: Theme.spacing.xl,
  },
});
