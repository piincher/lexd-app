import React from "react";
import { RefreshControl } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { UnassignedGoodsItem } from "../../hooks/useUnassignedGoods";
import { UnassignedGoodsCard } from "../UnassignedGoodsCard";
import { UnassignedGoodsEmpty } from "../UnassignedGoodsEmpty";
import { styles } from "./UnassignedGoodsList.styles";

interface UnassignedGoodsListProps {
  data: UnassignedGoodsItem[];
  isLoading: boolean;
  onRefresh: () => void;
  onItemPress: (goodsId: string) => void;
  /** Optional — renders above the first card (and above the empty state). The redesigned
   *  screen passes the bento triage panel here so it scrolls with the queue. */
  ListHeaderComponent?: React.ComponentProps<typeof FlashList>["ListHeaderComponent"];
}

export const UnassignedGoodsList: React.FC<UnassignedGoodsListProps> = ({
  data,
  isLoading,
  onRefresh,
  onItemPress,
  ListHeaderComponent,
}) => {
  return (
    <FlashList
      data={data}
      keyExtractor={(item) => item._id}
      contentContainerStyle={styles.list}
      ListHeaderComponent={ListHeaderComponent}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
      }
      renderItem={({ item }) => (
        <UnassignedGoodsCard
          item={item}
          onPress={() => onItemPress(item._id)}
        />
      )}
      ListEmptyComponent={<UnassignedGoodsEmpty />}
    />
  );
};
