import React, { useMemo } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { Text } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Fonts } from "@src/constants/Fonts";
import { Theme } from "@src/constants/Theme";
import { useAppTheme } from "@src/providers/ThemeProvider";

interface KPICardsProps {
  stats: {
    totalGoods: number;
    pendingContainers: number;
    smsBalance: number;
  };
}

const formatNumber = (n: number) => {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return n.toString();
};

export const KPICards: React.FC<KPICardsProps> = ({ stats }) => {
  const navigation = useNavigation<any>();
  const { colors, isDark } = useAppTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          gap: 12,
          marginBottom: 20,
        },
        heroCard: {
          borderRadius: 20,
          overflow: "hidden",
          ...Theme.shadows.md,
        },
        heroGradient: {
          padding: 18,
          minHeight: 120,
          justifyContent: "space-between",
        },
        heroDecor: {
          position: "absolute",
          top: -20,
          right: -20,
          width: 140,
          height: 140,
          borderRadius: 70,
          backgroundColor: "rgba(255,255,255,0.08)",
        },
        heroTop: {
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
        },
        heroIconWrap: {
          width: 44,
          height: 44,
          borderRadius: 14,
          backgroundColor: "rgba(255,255,255,0.22)",
          justifyContent: "center",
          alignItems: "center",
          borderWidth: 1,
          borderColor: "rgba(255,255,255,0.25)",
        },
        heroTrend: {
          flexDirection: "row",
          alignItems: "center",
          gap: 3,
          paddingHorizontal: 8,
          paddingVertical: 3,
          borderRadius: 999,
          backgroundColor: "rgba(255,255,255,0.2)",
        },
        heroTrendText: {
          color: "#FFF",
          fontSize: 11,
          fontFamily: Fonts.bold,
        },
        heroValue: {
          fontSize: 34,
          fontFamily: Fonts.bold,
          color: "#FFF",
          letterSpacing: -1,
        },
        heroLabel: {
          fontSize: 13,
          fontFamily: Fonts.regular,
          color: "rgba(255,255,255,0.88)",
          marginTop: 2,
        },
        row: {
          flexDirection: "row",
          gap: 12,
        },
        smallCard: {
          flex: 1,
          borderRadius: 18,
          padding: 14,
          backgroundColor: colors.background.card,
          borderWidth: 1,
          borderColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)",
          ...Theme.shadows.sm,
        },
        smallIconWrap: {
          width: 38,
          height: 38,
          borderRadius: 12,
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 12,
        },
        smallValue: {
          fontSize: 22,
          fontFamily: Fonts.bold,
          color: colors.text.primary,
          letterSpacing: -0.5,
        },
        smallLabel: {
          fontSize: 12,
          fontFamily: Fonts.regular,
          color: colors.text.secondary,
          marginTop: 2,
        },
        progressTrack: {
          marginTop: 10,
          height: 4,
          borderRadius: 2,
          backgroundColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
          overflow: "hidden",
        },
        progressFill: {
          height: "100%",
          borderRadius: 2,
        },
      }),
    [colors, isDark]
  );

  const smsPct = Math.min(
    100,
    Math.max(0, stats.smsBalance > 0 ? Math.min(100, stats.smsBalance / 10) : 0)
  );
  const smsColor =
    smsPct >= 50 ? "#22C55E" : smsPct >= 20 ? "#F59E0B" : "#EF4444";

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => navigation.navigate("UnassignedGoods")}
        style={({ pressed }) => [
          styles.heroCard,
          pressed && { opacity: 0.92, transform: [{ scale: 0.99 }] },
        ]}
      >
        <LinearGradient
          colors={["#3B82F6", "#2563EB", "#1D4ED8"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroGradient}
        >
          <View style={styles.heroDecor} />
          <View style={styles.heroTop}>
            <View style={styles.heroIconWrap}>
              <MaterialCommunityIcons name="package-variant" size={22} color="#FFF" />
            </View>
            <View style={styles.heroTrend}>
              <MaterialCommunityIcons name="arrow-up" size={11} color="#FFF" />
              <Text style={styles.heroTrendText}>En stock</Text>
            </View>
          </View>
          <View>
            <Text style={styles.heroValue}>{formatNumber(stats.totalGoods)}</Text>
            <Text style={styles.heroLabel}>Marchandises en entrepôt</Text>
          </View>
        </LinearGradient>
      </Pressable>

      <View style={styles.row}>
        <Pressable
          onPress={() => navigation.navigate("ContainerList" as never)}
          style={({ pressed }) => [
            styles.smallCard,
            pressed && { opacity: 0.92 },
          ]}
        >
          <View
            style={[
              styles.smallIconWrap,
              { backgroundColor: isDark ? "rgba(249,115,22,0.15)" : "#FFF7ED" },
            ]}
          >
            <MaterialCommunityIcons name="ferry" size={20} color="#F97316" />
          </View>
          <Text style={styles.smallValue}>{formatNumber(stats.pendingContainers)}</Text>
          <Text style={styles.smallLabel}>Conteneurs actifs</Text>
          <View style={styles.progressTrack}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${Math.min(100, stats.pendingContainers * 10)}%`,
                  backgroundColor: "#F97316",
                },
              ]}
            />
          </View>
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate("SendSms" as never)}
          style={({ pressed }) => [
            styles.smallCard,
            pressed && { opacity: 0.92 },
          ]}
        >
          <View
            style={[
              styles.smallIconWrap,
              { backgroundColor: isDark ? "rgba(168,85,247,0.15)" : "#FAF5FF" },
            ]}
          >
            <MaterialCommunityIcons name="message-badge" size={20} color="#A855F7" />
          </View>
          <Text style={styles.smallValue}>{formatNumber(stats.smsBalance)}</Text>
          <Text style={styles.smallLabel}>Crédits SMS</Text>
          <View style={styles.progressTrack}>
            <View
              style={[
                styles.progressFill,
                { width: `${smsPct}%`, backgroundColor: smsColor },
              ]}
            />
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default KPICards;
