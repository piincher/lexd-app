import React from "react";
import { View, ActivityIndicator, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import { useUnassignedGoods } from "../../hooks";
import { UnassignedGoodsAlert } from "../UnassignedGoodsAlert";
import { styles } from "./UnassignedGoodsSection.styles";

export const UnassignedGoodsSection: React.FC = () => {
  const navigation = useNavigation();
  const { data, isLoading, error, refetch } = useUnassignedGoods();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="small" color="#F59E0B" />
        <Text style={styles.loadingText}>Chargement...</Text>
      </View>
    );
  }

  if (error || !data) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="alert-circle" size={24} color="#EF4444" />
        <Text style={styles.errorText}>Erreur</Text>
        <TouchableOpacity onPress={refetch}>
          <Text style={styles.retryText}>Réessayer</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <UnassignedGoodsAlert
        total={data.total}
        byShippingMode={data.byShippingMode}
        byAge={data.byAge}
        onPress={() => navigation.navigate("UnassignedGoods")}
      />
    </View>
  );
};
