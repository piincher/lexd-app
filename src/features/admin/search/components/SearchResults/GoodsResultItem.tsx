import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { Theme } from "@src/constants/Theme";
import { SearchResultItem } from "../../types/searchResults";
import { useSearchHighlight } from "../../hooks/useSearchHighlight";
import { createStyles } from "./SearchResultItem.styles";

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
  const { colors, isDark } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors, isDark), [colors, isDark]);
  const highlightText = useSearchHighlight(highlightQuery);
  const isPaid = item.paymentStatus === "PAID";
  const statusColors: Record<string, string> = {
    RECEIVED_AT_WAREHOUSE: colors.status.info,
    PACKED: colors.primary.main,
    ASSIGNED_TO_CONTAINER: colors.accent.mint,
    LOADED_IN_CONTAINER: colors.accent.rose,
    IN_TRANSIT: colors.status.warning,
    ARRIVED_DESTINATION: colors.status.success,
    READY_FOR_PICKUP: colors.primary.dark,
    DELIVERED: colors.primary.light,
  };
  const statusColor = statusColors[item.status] || colors.neutral[400];

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
              { backgroundColor: isPaid ? colors.status.success + "20" : colors.status.error + "20" },
            ]}
          >
            <Text
              style={[
                styles.statusText,
                { color: isPaid ? colors.status.success : colors.status.error },
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
            <Ionicons name="location" size={12} color={colors.neutral[400]} />
            <Text style={styles.metaText}>
              {highlightText(item.warehouseLocation || "-")}
            </Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="cube" size={12} color={colors.neutral[400]} />
            <Text style={styles.metaText}>
              {item.actualCBM?.toFixed(2)} CBM
            </Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="cash" size={12} color={colors.neutral[400]} />
            <Text style={styles.metaText}>
              {item.totalCost?.toLocaleString()} FCFA
            </Text>
          </View>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={20} color={colors.neutral[400]} />
    </TouchableOpacity>
  );
};


