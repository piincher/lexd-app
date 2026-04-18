import React, { useMemo } from "react";
import { View, Pressable, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Fonts } from "@src/constants/Fonts";
import { Theme } from "@src/constants/Theme";
import { useAppTheme } from "@src/providers/ThemeProvider";

import { useOutstandingPayments } from "../../hooks";
import { OutstandingPaymentsCard } from "../OutstandingPaymentsCard";
import { AgingChart } from "../AgingChart";
import { TopClientsList } from "../TopClientsList";

export const OutstandingPaymentsSection: React.FC = () => {
  const navigation = useNavigation();
  const { colors, isDark } = useAppTheme();
  const { data, isLoading, error, refetch } = useOutstandingPayments();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          marginBottom: 16,
        },
        stack: {
          gap: 12,
          marginTop: 12,
        },
        skeletonHero: {
          height: 200,
          borderRadius: 20,
          backgroundColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)",
        },
        skeletonBlock: {
          height: 180,
          borderRadius: 18,
          backgroundColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)",
          marginTop: 12,
        },
        errorCard: {
          backgroundColor: colors.background.card,
          borderRadius: 18,
          borderWidth: 1,
          borderColor: isDark ? "rgba(239,68,68,0.3)" : "#FECACA",
          padding: 20,
          alignItems: "center",
          ...Theme.shadows.sm,
        },
        errorIconWrap: {
          width: 52,
          height: 52,
          borderRadius: 16,
          backgroundColor: isDark ? "rgba(239,68,68,0.18)" : "#FEE2E2",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 12,
        },
        errorTitle: {
          fontSize: 14,
          fontFamily: Fonts.bold,
          color: colors.text.primary,
        },
        errorSubtitle: {
          fontSize: 12,
          fontFamily: Fonts.regular,
          color: colors.text.secondary,
          marginTop: 4,
          textAlign: "center",
        },
        retryButton: {
          flexDirection: "row",
          alignItems: "center",
          gap: 6,
          marginTop: 14,
          paddingHorizontal: 16,
          paddingVertical: 10,
          borderRadius: 10,
          backgroundColor: isDark ? "rgba(239,68,68,0.18)" : "#FEE2E2",
        },
        retryText: {
          fontSize: 12,
          fontFamily: Fonts.bold,
          color: "#EF4444",
        },
      }),
    [colors, isDark]
  );

  if (isLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.skeletonHero} />
        <View style={styles.skeletonBlock} />
        <View style={styles.skeletonBlock} />
      </View>
    );
  }

  if (error || !data) {
    return (
      <View style={styles.container}>
        <View style={styles.errorCard}>
          <View style={styles.errorIconWrap}>
            <MaterialCommunityIcons name="cloud-alert" size={26} color="#EF4444" />
          </View>
          <Text style={styles.errorTitle}>Erreur de chargement</Text>
          <Text style={styles.errorSubtitle}>
            Impossible de récupérer les impayés
          </Text>
          <Pressable
            onPress={refetch}
            style={({ pressed }) => [
              styles.retryButton,
              pressed && { opacity: 0.7 },
            ]}
          >
            <MaterialCommunityIcons name="refresh" size={14} color="#EF4444" />
            <Text style={styles.retryText}>Réessayer</Text>
          </Pressable>
        </View>
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
      <View style={styles.stack}>
        <AgingChart aging={data.aging} />
        <TopClientsList clients={data.topClients} />
      </View>
    </View>
  );
};
