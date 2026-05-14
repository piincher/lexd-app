import React, { useMemo } from "react";
import { View, Pressable, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Fonts } from "@src/constants/Fonts";
import { Theme } from "@src/constants/Theme";
import { useAppTheme } from "@src/providers/ThemeProvider";

import { useUnassignedGoods } from "../../hooks";
import { UnassignedGoodsAlert } from "../UnassignedGoodsAlert";

export const UnassignedGoodsSection: React.FC = () => {
  const navigation = useNavigation();
  const { colors, isDark } = useAppTheme();
  const { totalCount, sortedGoods, isLoading, error, handleRefresh } =
    useUnassignedGoods();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          marginBottom: 16,
        },
        skeleton: {
          height: 220,
          borderRadius: 20,
          backgroundColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)",
        },
        errorCard: {
          backgroundColor: colors.background.card,
          borderRadius: 18,
          borderWidth: 1,
          borderColor: isDark ? "rgba(239,68,68,0.3)" : colors.feedback.errorBg,
          padding: 20,
          alignItems: "center",
          ...Theme.shadows.sm,
        },
        errorIconWrap: {
          width: 52,
          height: 52,
          borderRadius: 16,
          backgroundColor: isDark ? "rgba(239,68,68,0.18)" : colors.feedback.errorBg,
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
          backgroundColor: isDark ? "rgba(239,68,68,0.18)" : colors.feedback.errorBg,
        },
        retryText: {
          fontSize: 12,
          fontFamily: Fonts.bold,
          color: colors.status.error,
        },
      }),
    [colors, isDark]
  );

  if (isLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.skeleton} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <View style={styles.errorCard}>
          <View style={styles.errorIconWrap}>
            <MaterialCommunityIcons name="cloud-alert" size={26} color={colors.status.error} />
          </View>
          <Text style={styles.errorTitle}>Erreur de chargement</Text>
          <Text style={styles.errorSubtitle}>
            Impossible de récupérer les marchandises
          </Text>
          <Pressable
            onPress={handleRefresh}
            style={({ pressed }) => [
              styles.retryButton,
              pressed && { opacity: 0.7 },
            ]}
          >
            <MaterialCommunityIcons name="refresh" size={14} color={colors.status.error} />
            <Text style={styles.retryText}>Réessayer</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  const byShippingMode = {
    AIR: sortedGoods.filter((g) => g.shippingMode === "AIR").length,
    SEA: sortedGoods.filter((g) => g.shippingMode !== "AIR").length,
  };

  const byAge = {
    "0-3": sortedGoods.filter((g) => g.daysWaiting <= 3).length,
    "4-7": sortedGoods.filter((g) => g.daysWaiting >= 4 && g.daysWaiting <= 7)
      .length,
    "8+": sortedGoods.filter((g) => g.daysWaiting >= 8).length,
  };

  return (
    <View style={styles.container}>
      <UnassignedGoodsAlert
        total={totalCount}
        byShippingMode={byShippingMode}
        byAge={byAge}
        onPress={() =>
          navigation.navigate(totalCount > 0 ? "UnassignedGoods" : "AdminGoodsList")
        }
      />
    </View>
  );
};
