import React, { useMemo } from "react";
import { View, Pressable, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Fonts } from "@src/constants/Fonts";
import { Theme } from "@src/constants/Theme";
import { useAppTheme } from "@src/providers/ThemeProvider";

import { OutstandingClient } from "../../types";

interface TopClientsListProps {
  clients: OutstandingClient[];
}

const formatCurrency = (amount: number): string =>
  new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "XAF",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);

const MEDAL_META = [
  { color: "#F59E0B", bg: "#FEF3C7", icon: "medal" },
  { color: "#94A3B8", bg: "#E2E8F0", icon: "medal-outline" },
  { color: "#B45309", bg: "#FED7AA", icon: "medal-outline" },
] as const;

const getInitials = (name: string): string =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() || "")
    .join("") || "?";

export const TopClientsList: React.FC<TopClientsListProps> = ({ clients }) => {
  const navigation = useNavigation();
  const { colors, isDark } = useAppTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          backgroundColor: colors.background.card,
          borderRadius: 18,
          borderWidth: 1,
          borderColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)",
          padding: 14,
          ...Theme.shadows.sm,
        },
        header: {
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          marginBottom: 12,
        },
        iconWrap: {
          width: 34,
          height: 34,
          borderRadius: 11,
          backgroundColor: isDark ? "rgba(245,158,11,0.18)" : "#FEF3C7",
          justifyContent: "center",
          alignItems: "center",
        },
        titleWrap: {
          flex: 1,
        },
        title: {
          fontSize: 13,
          fontFamily: Fonts.bold,
          color: colors.text.primary,
          letterSpacing: -0.2,
        },
        subtitle: {
          fontSize: 10,
          fontFamily: Fonts.regular,
          color: colors.text.secondary,
          marginTop: 1,
        },
        row: {
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          paddingVertical: 10,
          borderBottomWidth: 1,
          borderBottomColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
        },
        rowLast: {
          borderBottomWidth: 0,
        },
        rankWrap: {
          width: 32,
          height: 32,
          borderRadius: 10,
          justifyContent: "center",
          alignItems: "center",
        },
        rankText: {
          fontSize: 12,
          fontFamily: Fonts.bold,
          color: colors.text.secondary,
        },
        avatar: {
          width: 36,
          height: 36,
          borderRadius: 11,
          backgroundColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)",
          justifyContent: "center",
          alignItems: "center",
        },
        avatarText: {
          fontSize: 12,
          fontFamily: Fonts.bold,
          color: colors.text.primary,
        },
        info: {
          flex: 1,
        },
        name: {
          fontSize: 13,
          fontFamily: Fonts.bold,
          color: colors.text.primary,
        },
        meta: {
          flexDirection: "row",
          alignItems: "center",
          gap: 6,
          marginTop: 2,
        },
        metaText: {
          fontSize: 10,
          fontFamily: Fonts.regular,
          color: colors.text.secondary,
        },
        metaDot: {
          width: 3,
          height: 3,
          borderRadius: 1.5,
          backgroundColor: colors.text.secondary,
          opacity: 0.5,
        },
        amount: {
          fontSize: 13,
          fontFamily: Fonts.bold,
          color: "#EF4444",
        },
        empty: {
          alignItems: "center",
          paddingVertical: 24,
        },
        emptyIconWrap: {
          width: 48,
          height: 48,
          borderRadius: 16,
          backgroundColor: isDark ? "rgba(16,185,129,0.15)" : "#D1FAE5",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 10,
        },
        emptyText: {
          fontSize: 13,
          fontFamily: Fonts.bold,
          color: colors.text.primary,
        },
        emptySubtext: {
          fontSize: 11,
          fontFamily: Fonts.regular,
          color: colors.text.secondary,
          marginTop: 4,
        },
      }),
    [colors, isDark]
  );

  if (!clients || clients.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.iconWrap}>
            <MaterialCommunityIcons name="trophy" size={18} color="#F59E0B" />
          </View>
          <View style={styles.titleWrap}>
            <Text style={styles.title}>Top clients impayés</Text>
            <Text style={styles.subtitle}>Classement</Text>
          </View>
        </View>
        <View style={styles.empty}>
          <View style={styles.emptyIconWrap}>
            <MaterialCommunityIcons name="check-decagram" size={24} color="#10B981" />
          </View>
          <Text style={styles.emptyText}>Aucun impayé</Text>
          <Text style={styles.emptySubtext}>Tous les clients sont à jour</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconWrap}>
          <MaterialCommunityIcons name="trophy" size={18} color="#F59E0B" />
        </View>
        <View style={styles.titleWrap}>
          <Text style={styles.title}>Top clients impayés</Text>
          <Text style={styles.subtitle}>{clients.length} clients</Text>
        </View>
      </View>

      {clients.map((item, index) => {
        const medal = index < 3 ? MEDAL_META[index] : null;
        const isLast = index === clients.length - 1;
        return (
          <Pressable
            key={item.clientId}
            onPress={() =>
              navigation.navigate("ClientDetails", { id: item.clientId })
            }
            style={({ pressed }) => [
              styles.row,
              isLast && styles.rowLast,
              pressed && { opacity: 0.6 },
            ]}
          >
            <View
              style={[
                styles.rankWrap,
                medal && { backgroundColor: isDark ? `${medal.color}22` : medal.bg },
              ]}
            >
              {medal ? (
                <MaterialCommunityIcons
                  name={medal.icon as any}
                  size={18}
                  color={medal.color}
                />
              ) : (
                <Text style={styles.rankText}>{index + 1}</Text>
              )}
            </View>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{getInitials(item.clientName)}</Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.name} numberOfLines={1}>
                {item.clientName}
              </Text>
              <View style={styles.meta}>
                <Text style={styles.metaText}>{item.goodsCount} colis</Text>
                {item.phoneNumber ? (
                  <>
                    <View style={styles.metaDot} />
                    <Text style={styles.metaText} numberOfLines={1}>
                      {item.phoneNumber}
                    </Text>
                  </>
                ) : null}
              </View>
            </View>
            <Text style={styles.amount}>{formatCurrency(item.totalOwed)}</Text>
          </Pressable>
        );
      })}
    </View>
  );
};

export default TopClientsList;
