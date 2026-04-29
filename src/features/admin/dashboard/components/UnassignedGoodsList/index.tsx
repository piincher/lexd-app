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
}

export const UnassignedGoodsList: React.FC<UnassignedGoodsListProps> = ({
  data,
  isLoading,
  onRefresh,
  onItemPress,
}) => {
  return (
    <FlashList
      data={data}
      keyExtractor={(item) => item._id}
      contentContainerStyle={styles.list}
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
