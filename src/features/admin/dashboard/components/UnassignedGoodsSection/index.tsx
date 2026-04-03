import React from "react";
import { View, ActivityIndicator, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import { useUnassignedGoods } from "../../hooks";
import { UnassignedGoodsAlert } from "../UnassignedGoodsAlert";
import { styles } from "./UnassignedGoodsSection.styles";

export const UnassignedGoodsSection: React.FC = () => {
  const navigation = useNavigation();
  const { totalCount, sortedGoods, isLoading, error, handleRefresh } = useUnassignedGoods();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="small" color="#F59E0B" />
        <Text style={styles.loadingText}>Chargement...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="alert-circle" size={24} color="#EF4444" />
        <Text style={styles.errorText}>Erreur</Text>
        <TouchableOpacity onPress={handleRefresh}>
          <Text style={styles.retryText}>Réessayer</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const byShippingMode = {
    AIR: sortedGoods.filter((g) => g.shippingMode === 'AIR').length,
    SEA: sortedGoods.filter((g) => g.shippingMode !== 'AIR').length,
  };

  const byAge = {
    '0-3': sortedGoods.filter((g) => g.daysWaiting <= 3).length,
    '4-7': sortedGoods.filter((g) => g.daysWaiting >= 4 && g.daysWaiting <= 7).length,
    '8+': sortedGoods.filter((g) => g.daysWaiting >= 8).length,
  };

  return (
    <View style={styles.container}>
      <UnassignedGoodsAlert
        total={totalCount}
        byShippingMode={byShippingMode}
        byAge={byAge}
        onPress={() => navigation.navigate("UnassignedGoods")}
      />
    </View>
  );
};
