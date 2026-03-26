/**
 * UnassignedGoodsScreen - Screen showing all unassigned goods
 * SRP: Layout composition ONLY (<100 lines)
 * Features: Grouped by shipping mode, sorted by receivedAt (oldest first), pull-to-refresh
 */

import React, { useState } from "react";
import { FlatList, RefreshControl, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { useUnassignedGoods } from "../hooks/useUnassignedGoods";
import { ShippingMode } from "@src/features/admin/containers/types";
import { Theme } from "@src/constants/Theme";
import { UnassignedGoodsHeader } from "../components/UnassignedGoodsHeader";
import { UnassignedGoodsSection } from "../components/UnassignedGoodsSection";
import { UnassignedGoodsEmptyState } from "../components/UnassignedGoodsEmptyState";
import { UnassignedGoodsLoadingState } from "../components/UnassignedGoodsLoadingState";

type AdminV2StackParamList = {
  UnassignedGoods: undefined;
  AssignGoods: { containerId: string };
  ContainerList: undefined;
};

type NavigationProp = NativeStackNavigationProp<AdminV2StackParamList>;

export const UnassignedGoodsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [filterMode, setFilterMode] = useState<ShippingMode | undefined>(undefined);
  const { groupedGoods, totalCount, oldestDays, isLoading, isRefetching, error, handleRefresh } = useUnassignedGoods(filterMode);

  if (isLoading) {
    return <UnassignedGoodsLoadingState />;
  }

  const handleAssignPress = () => {
    navigation.navigate("ContainerList");
  };

  const handleFilterChange = (mode: ShippingMode | undefined) => {
    setFilterMode(mode);
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <UnassignedGoodsHeader
        totalCount={totalCount}
        oldestDays={oldestDays}
        filterMode={filterMode}
        onFilterChange={handleFilterChange}
        onAssignPress={handleAssignPress}
        onBack={() => navigation.goBack()}
      />

      <FlatList
        data={groupedGoods}
        keyExtractor={(item) => item.mode}
        renderItem={({ item }) => (
          <UnassignedGoodsSection
            section={item}
            onGoodsPress={(goodsId: string) => {
              // Navigate to goods detail or assign flow
            }}
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={handleRefresh} tintColor={Theme.primary[500]} />
        }
        ListEmptyComponent={<UnassignedGoodsEmptyState filterMode={filterMode} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F7FC",
  },
  listContent: {
    padding: Theme.spacing.lg,
    paddingBottom: 100,
  },
});

export default UnassignedGoodsScreen;
