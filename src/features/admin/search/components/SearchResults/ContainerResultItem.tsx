import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Theme } from "@src/constants/Theme";
import { SearchResultItem } from "../../types/searchResults";
import { useSearchHighlight } from "../../hooks/useSearchHighlight";
import { searchResultItemStyles as baseStyles } from "./SearchResultItem.styles";

interface ContainerResultItemProps {
  item: SearchResultItem;
  onPress: (item: SearchResultItem) => void;
  highlightQuery: string;
}

export const ContainerResultItem: React.FC<ContainerResultItemProps> = ({
  item,
  onPress,
  highlightQuery,
}) => {
  const highlightText = useSearchHighlight(highlightQuery);
  const statusColors: Record<string, string> = {
    BOOKED: "#6366F1",
    EMPTY_TO_WAREHOUSE: "#8B5CF6",
    LOADING: "#EC4899",
    LOADED: "#F59E0B",
    IN_TRANSIT: "#3B82F6",
    ARRIVED: "#10B981",
    READY_FOR_PICKUP: "#14B8A6",
  };
  const statusColor = statusColors[item.status] || Theme.neutral[400];
  const utilizationPercent = item.utilizationPercent || 0;

  return (
    <TouchableOpacity
      style={baseStyles.resultItem}
      onPress={() => onPress(item)}
    >
      <View style={baseStyles.resultIconContainer}>
        <LinearGradient
          colors={[statusColor + "30", statusColor + "10"]}
          style={baseStyles.resultIconBg}
        >
          <Ionicons
            name={item.shippingMode === "AIR" ? "airplane" : "boat"}
            size={24}
            color={statusColor}
          />
        </LinearGradient>
      </View>
      <View style={baseStyles.resultContent}>
        <View style={baseStyles.resultHeader}>
          <Text style={baseStyles.resultTitle}>
            {highlightText(item.virtualContainerNumber)}
          </Text>
          {item.actualContainerNumber && (
            <Text style={styles.secondaryText}>
              {highlightText(item.actualContainerNumber)}
            </Text>
          )}
        </View>
        <Text style={baseStyles.resultSubtitle}>
          {item.route?.name || "Route non spécifiée"}
        </Text>
        <View style={baseStyles.resultMeta}>
          <View style={baseStyles.metaItem}>
            <Ionicons name="cube" size={12} color={Theme.neutral[400]} />
            <Text style={baseStyles.metaText}>
              {item.goodsCount || 0} marchandises
            </Text>
          </View>
          <View style={baseStyles.metaItem}>
            <Ionicons
              name="trending-up"
              size={12}
              color={Theme.neutral[400]}
            />
            <Text style={baseStyles.metaText}>
              {item.totalCBM?.toFixed(1)} / {item.capacityCBM} CBM
            </Text>
          </View>
          <View style={styles.utilizationBadge}>
            <View
              style={[
                styles.utilizationBar,
                {
                  width: `${Math.min(utilizationPercent, 100)}%`,
                  backgroundColor:
                    utilizationPercent > 90 ? "#EF4444" : "#10B981",
                },
              ]}
            />
            <Text style={styles.utilizationText}>
              {utilizationPercent}%
            </Text>
          </View>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={20} color={Theme.neutral[400]} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  secondaryText: {
    fontSize: 12,
    color: Theme.neutral[500],
  },
  utilizationBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: Theme.neutral[100],
    borderRadius: Theme.radius.sm,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  utilizationBar: {
    height: 4,
    borderRadius: 2,
    minWidth: 4,
  },
  utilizationText: {
    fontSize: 10,
    fontWeight: "600",
    color: Theme.neutral[600],
  },
});
