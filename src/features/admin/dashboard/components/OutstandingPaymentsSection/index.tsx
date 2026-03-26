import React from "react";
import { View, ActivityIndicator, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import { useOutstandingPayments } from "../../hooks";
import { OutstandingPaymentsCard } from "../OutstandingPaymentsCard";
import { AgingChart } from "../AgingChart";
import { TopClientsList } from "../TopClientsList";
import { styles } from "./OutstandingPaymentsSection.styles";

export const OutstandingPaymentsSection: React.FC = () => {
  const navigation = useNavigation();
  const { data, isLoading, error, refetch } = useOutstandingPayments();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1a5f2a" />
        <Text style={styles.loadingText}>Chargement des impayés...</Text>
      </View>
    );
  }

  if (error || !data) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="alert-circle" size={48} color="#EF4444" />
        <Text style={styles.errorText}>Erreur de chargement</Text>
        <TouchableOpacity onPress={refetch} style={styles.retryButton}>
          <Text style={styles.retryText}>Réessayer</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <OutstandingPaymentsCard
        totalOutstanding={data.totalOutstanding}
        counts={data.counts}
        onPress={() => navigation.navigate("OutstandingPaymentsList")}
      />
      
      <View style={styles.row}>
        <View style={styles.chartContainer}>
          <AgingChart aging={data.aging} />
        </View>
        <View style={styles.listContainer}>
          <TopClientsList clients={data.topClients} />
        </View>
      </View>
    </View>
  );
};
