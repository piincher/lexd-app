import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { SearchResultItem } from "../../types/searchResults";
import { useSearchHighlight } from "../../hooks/useSearchHighlight";
import { createStyles } from "./SearchResultItem.styles";

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
  const { colors, isDark } = useAppTheme();
  const baseStyles = React.useMemo(() => createStyles(colors, isDark), [colors, isDark]);
  const highlightText = useSearchHighlight(highlightQuery);
  const statusColors: Record<string, string> = {
    BOOKED: colors.status.info,
    EMPTY_TO_WAREHOUSE: colors.primary.main,
    LOADING: colors.accent.rose,
    LOADED: colors.status.warning,
    IN_TRANSIT: colors.accent.sky,
    ARRIVED: colors.status.success,
    READY_FOR_PICKUP: colors.accent.mint,
  };
  const statusColor = statusColors[item.status] || colors.neutral[400];
  const utilizationPercent = item.utilizationPercent || 0;

  const styles = React.useMemo(() => StyleSheet.create({
    secondaryText: {
      fontSize: 12,
      color: colors.neutral[500],
    },
    utilizationBadge: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
      backgroundColor: colors.neutral[100],
      borderRadius: 4,
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
      color: colors.neutral[600],
    },
  }), [colors]);

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
            <Ionicons name="cube" size={12} color={colors.neutral[400]} />
            <Text style={baseStyles.metaText}>
              {item.goodsCount || 0} marchandises
            </Text>
          </View>
          <View style={baseStyles.metaItem}>
            <Ionicons
              name="trending-up"
              size={12}
              color={colors.neutral[400]}
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
                    utilizationPercent > 90 ? colors.status.error : colors.status.success,
                },
              ]}
            />
            <Text style={styles.utilizationText}>
              {utilizationPercent}%
            </Text>
          </View>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={20} color={colors.neutral[400]} />
    </TouchableOpacity>
  );
};
