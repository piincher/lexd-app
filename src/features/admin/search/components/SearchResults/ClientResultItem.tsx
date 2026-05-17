import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { Theme } from "@src/constants/Theme";
import { SearchResultItem } from "../../types/searchResults";
import { useSearchHighlight } from "../../hooks/useSearchHighlight";

interface ClientResultItemProps {
  item: SearchResultItem;
  onPress: (item: SearchResultItem) => void;
  highlightQuery: string;
}

export const ClientResultItem: React.FC<ClientResultItemProps> = ({
  item,
  onPress,
  highlightQuery,
}) => {
  const { colors } = useAppTheme();
  const highlightText = useSearchHighlight(highlightQuery);
  const fullName =
    `${item.firstName || ""} ${item.lastName || ""}`.trim() || "Nom inconnu";

  return (
    <TouchableOpacity
      style={styles.resultItem}
      onPress={() => onPress(item)}
    >
      <View style={styles.resultIconContainer}>
        <LinearGradient
          colors={[Theme.primary[100], Theme.primary[50]]}
          style={styles.resultIconBg}
        >
          <Ionicons name="person" size={24} color={Theme.primary[500]} />
        </LinearGradient>
      </View>
      <View style={styles.resultContent}>
        <View style={styles.resultHeader}>
          <Text style={styles.resultTitle}>
            {highlightText(fullName)}
          </Text>
          {item.isActive ? (
            <View
              style={[styles.statusBadge, { backgroundColor: colors.status.success + "20" }]}
            >
              <Text style={[styles.statusText, { color: colors.status.success }]}>
                Actif
              </Text>
            </View>
          ) : (
            <View
              style={[styles.statusBadge, { backgroundColor: colors.status.error + "20" }]}
            >
              <Text style={[styles.statusText, { color: colors.status.error }]}>
                Inactif
              </Text>
            </View>
          )}
        </View>
        <Text style={styles.resultSubtitle}>
          {highlightText(item.phoneNumber || "")}
        </Text>
        <View style={styles.resultMeta}>
          <View style={styles.metaItem}>
            <Ionicons name="wallet" size={12} color={Theme.neutral[400]} />
            <Text style={styles.metaText}>
              {item.balance?.toLocaleString()} FCFA
            </Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="gift" size={12} color={Theme.neutral[400]} />
            <Text style={styles.metaText}>
              {item.rewardPoints || 0} points
            </Text>
          </View>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={20} color={Theme.neutral[400]} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  resultItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Theme.spacing.lg,
    paddingVertical: Theme.spacing.md,
    backgroundColor: Theme.colors.background.card,
  },
  resultIconContainer: {
    marginRight: Theme.spacing.md,
  },
  resultIconBg: {
    width: 48,
    height: 48,
    borderRadius: Theme.radius.lg,
    justifyContent: "center",
    alignItems: "center",
  },
  resultContent: {
    flex: 1,
  },
  resultHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  resultTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: Theme.neutral[800],
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: Theme.radius.sm,
  },
  statusText: {
    fontSize: 10,
    fontWeight: "700",
  },
  resultSubtitle: {
    fontSize: 13,
    color: Theme.neutral[600],
    marginBottom: 6,
  },
  resultMeta: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: Theme.spacing.md,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    color: Theme.neutral[500],
  },
});
