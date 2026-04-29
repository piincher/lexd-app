import React from "react";
import { View, Pressable } from "react-native";
import { Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { OutstandingClient } from "../../../types";
import { useTopClientsListStyles } from "../TopClientsList.styles";

interface TopClientsListItemProps {
  item: OutstandingClient;
  index: number;
  isLast: boolean;
  onPress: (clientId: string) => void;
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

export const TopClientsListItem: React.FC<TopClientsListItemProps> = ({
  item,
  index,
  isLast,
  onPress,
}) => {
  const styles = useTopClientsListStyles();
  const { isDark } = useAppTheme();

  const medal = index < 3 ? MEDAL_META[index] : null;

  return (
    <Pressable
      onPress={() => onPress(item.clientId)}
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
};
