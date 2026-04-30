import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Theme } from "@src/constants/Theme";
import { SearchResultItem } from "../../types/searchResults";
import { useSearchHighlight } from "../../hooks/useSearchHighlight";
import { searchResultItemStyles as styles } from "./SearchResultItem.styles";

interface GoodsResultItemProps {
  item: SearchResultItem;
  onPress: (item: SearchResultItem) => void;
  highlightQuery: string;
}

export const GoodsResultItem: React.FC<GoodsResultItemProps> = ({
  item,
  onPress,
  highlightQuery,
}) => {
  const highlightText = useSearchHighlight(highlightQuery);
  const isPaid = item.paymentStatus === "PAID";
  const statusColors: Record<string, string> = {
    RECEIVED_AT_WAREHOUSE: "#6366F1",
    PACKED: "#7C4DFF",
    ASSIGNED_TO_CONTAINER: "#8B5CF6",
    LOADED_IN_CONTAINER: "#EC4899",
    IN_TRANSIT: "#F59E0B",
    ARRIVED_DESTINATION: "#10B981",
    READY_FOR_PICKUP: "#14B8A6",
    DELIVERED: "#22C55E",
  };
  const statusColor = statusColors[item.status] || Theme.neutral[400];

  return (
    <TouchableOpacity
      style={styles.resultItem}
      onPress={() => onPress(item)}
    >
      <View style={styles.resultIconContainer}>
        <LinearGradient
          colors={[statusColor + "30", statusColor + "10"]}
          style={styles.resultIconBg}
        >
          <Ionicons name="cube" size={24} color={statusColor} />
        </LinearGradient>
      </View>
      <View style={styles.resultContent}>
        <View style={styles.resultHeader}>
          <Text style={styles.resultTitle}>
            {highlightText(item.goodsId)}
          </Text>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: isPaid ? "#22C55E20" : "#EF444420" },
            ]}
          >
            <Text
              style={[
                styles.statusText,
                { color: isPaid ? "#22C55E" : "#EF4444" },
              ]}
            >
              {isPaid ? "Payé" : "Non payé"}
            </Text>
          </View>
        </View>
        <Text style={styles.resultSubtitle} numberOfLines={1}>
          {item.description
            ? highlightText(item.description)
            : "Aucune description"}
        </Text>
        <View style={styles.resultMeta}>
          <View style={styles.metaItem}>
            <Ionicons name="location" size={12} color={Theme.neutral[400]} />
            <Text style={styles.metaText}>
              {highlightText(item.warehouseLocation || "-")}
            </Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="cube" size={12} color={Theme.neutral[400]} />
            <Text style={styles.metaText}>
              {item.actualCBM?.toFixed(2)} CBM
            </Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="cash" size={12} color={Theme.neutral[400]} />
            <Text style={styles.metaText}>
              {item.totalCost?.toLocaleString()} FCFA
            </Text>
          </View>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={20} color={Theme.neutral[400]} />
    </TouchableOpacity>
  );
};


