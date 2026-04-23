/**
 * SearchResults - Grouped results display with highlighting
 * Shows results for Goods, Containers, and Clients
 */

import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
} from "react-native";
import { FlashList } from "@shopify/flash-list";
import { Text, ActivityIndicator } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Theme } from "@src/constants/Theme";

// Type definitions
interface SearchMatch {
  field: string;
  value: string;
}

interface SearchResultItem {
  _id: string;
  _matches?: SearchMatch[];
  [key: string]: any;
}

interface SearchResultsProps {
  entity: "goods" | "containers" | "clients" | "all";
  results: {
    goods?: SearchResultItem[];
    containers?: SearchResultItem[];
    clients?: SearchResultItem[];
    consignees?: SearchResultItem[];
    data?: SearchResultItem[];
  };
  isLoading: boolean;
  isError: boolean;
  error?: any;
  onItemPress: (item: SearchResultItem, entity: string) => void;
  onRefresh?: () => void;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  onLoadMore?: () => void;
  emptyMessage?: string;
  highlightQuery?: string;
}

export const SearchResults: React.FC<SearchResultsProps> = ({
  entity,
  results,
  isLoading,
  isError,
  error,
  onItemPress,
  onRefresh,
  pagination,
  onLoadMore,
  emptyMessage = "Aucun résultat trouvé",
  highlightQuery = "",
}) => {
  // Highlight matching text
  const highlightText = (text: string, query: string) => {
    if (!query || !text) return text;
    
    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <Text key={index} style={styles.highlight}>
          {part}
        </Text>
      ) : (
        part
      )
    );
  };

  // Render Goods Item
  const renderGoodsItem = ({ item }: { item: SearchResultItem }) => {
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
        onPress={() => onItemPress(item, "goods")}
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
              {highlightText(item.goodsId, highlightQuery)}
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
              ? highlightText(item.description, highlightQuery)
              : "Aucune description"}
          </Text>
          <View style={styles.resultMeta}>
            <View style={styles.metaItem}>
              <Ionicons name="location" size={12} color={Theme.neutral[400]} />
              <Text style={styles.metaText}>
                {highlightText(item.warehouseLocation || "-", highlightQuery)}
              </Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="cube" size={12} color={Theme.neutral[400]} />
              <Text style={styles.metaText}>{item.actualCBM?.toFixed(2)} CBM</Text>
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

  // Render Container Item
  const renderContainerItem = ({ item }: { item: SearchResultItem }) => {
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
        style={styles.resultItem}
        onPress={() => onItemPress(item, "container")}
      >
        <View style={styles.resultIconContainer}>
          <LinearGradient
            colors={[statusColor + "30", statusColor + "10"]}
            style={styles.resultIconBg}
          >
            <Ionicons
              name={item.shippingMode === "AIR" ? "airplane" : "boat"}
              size={24}
              color={statusColor}
            />
          </LinearGradient>
        </View>
        <View style={styles.resultContent}>
          <View style={styles.resultHeader}>
            <Text style={styles.resultTitle}>
              {highlightText(item.virtualContainerNumber, highlightQuery)}
            </Text>
            {item.actualContainerNumber && (
              <Text style={styles.secondaryText}>
                {highlightText(item.actualContainerNumber, highlightQuery)}
              </Text>
            )}
          </View>
          <Text style={styles.resultSubtitle}>
            {item.route?.name || "Route non spécifiée"}
          </Text>
          <View style={styles.resultMeta}>
            <View style={styles.metaItem}>
              <Ionicons name="cube" size={12} color={Theme.neutral[400]} />
              <Text style={styles.metaText}>
                {item.goodsCount || 0} marchandises
              </Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="trending-up" size={12} color={Theme.neutral[400]} />
              <Text style={styles.metaText}>
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
              <Text style={styles.utilizationText}>{utilizationPercent}%</Text>
            </View>
          </View>
        </View>
        <Ionicons name="chevron-forward" size={20} color={Theme.neutral[400]} />
      </TouchableOpacity>
    );
  };

  // Render Client Item
  const renderClientItem = ({ item }: { item: SearchResultItem }) => {
    const fullName = `${item.firstName || ""} ${item.lastName || ""}`.trim() || "Nom inconnu";

    return (
      <TouchableOpacity
        style={styles.resultItem}
        onPress={() => onItemPress(item, "client")}
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
              {highlightText(fullName, highlightQuery)}
            </Text>
            {item.isActive ? (
              <View style={[styles.statusBadge, { backgroundColor: "#22C55E20" }]}>
                <Text style={[styles.statusText, { color: "#22C55E" }]}>
                  Actif
                </Text>
              </View>
            ) : (
              <View style={[styles.statusBadge, { backgroundColor: "#EF444420" }]}>
                <Text style={[styles.statusText, { color: "#EF4444" }]}>
                  Inactif
                </Text>
              </View>
            )}
          </View>
          <Text style={styles.resultSubtitle}>
            {highlightText(item.phoneNumber || "", highlightQuery)}
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

  // Render Result Section
  const renderSection = (
    title: string,
    icon: string,
    items: SearchResultItem[],
    renderItem: ({ item }: { item: SearchResultItem }) => React.ReactElement,
    total: number
  ) => {
    if (!items || items.length === 0) return null;

    return (
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleContainer}>
            <Ionicons name={icon as any} size={18} color={Theme.primary[500]} />
            <Text style={styles.sectionTitle}>{title}</Text>
          </View>
          <Text style={styles.sectionCount}>
            {items.length} sur {total}
          </Text>
        </View>
        <FlashList
          data={items}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          scrollEnabled={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>
    );
  };

  // Loading State
  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={Theme.primary[500]} />
        <Text style={styles.loadingText}>Recherche en cours...</Text>
      </View>
    );
  }

  // Error State
  if (isError) {
    return (
      <View style={styles.centerContainer}>
        <LinearGradient
          colors={["#FEF2F2", "#FEE2E2"]}
          style={styles.errorIconContainer}
        >
          <Ionicons name="alert-circle" size={48} color="#EF4444" />
        </LinearGradient>
        <Text style={styles.errorTitle}>Erreur de recherche</Text>
        <Text style={styles.errorSubtitle}>
          {error?.message || "Une erreur est survenue lors de la recherche"}
        </Text>
        {onRefresh && (
          <TouchableOpacity style={styles.retryButton} onPress={onRefresh}>
            <Text style={styles.retryText}>Réessayer</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }

  // Empty State
  const hasResults =
    (results.goods && results.goods.length > 0) ||
    (results.containers && results.containers.length > 0) ||
    (results.clients && results.clients.length > 0) ||
    (results.data && results.data.length > 0);

  if (!hasResults) {
    return (
      <View style={styles.centerContainer}>
        <LinearGradient
          colors={["#F3F0FF", "#EDE9FE"]}
          style={styles.emptyIconContainer}
        >
          <Ionicons name="search-outline" size={64} color={Theme.primary[400]} />
        </LinearGradient>
        <Text style={styles.emptyTitle}>Aucun résultat</Text>
        <Text style={styles.emptySubtitle}>{emptyMessage}</Text>
      </View>
    );
  }

  // Global Search Results (Grouped)
  if (entity === "all") {
    return (
      <FlashList
        data={[{ key: "content" }]}
        renderItem={() => (
          <>
            {renderSection(
              "Marchandises",
              "cube",
              results.goods || [],
              renderGoodsItem,
              0
            )}
            {renderSection(
              "Containers",
              "airplane",
              results.containers || [],
              renderContainerItem,
              0
            )}
            {renderSection(
              "Clients",
              "people",
              results.clients || [],
              renderClientItem,
              0
            )}
          </>
        )}
        refreshControl={
          onRefresh ? (
            <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
          ) : undefined
        }
        onEndReached={onLoadMore}
        onEndReachedThreshold={0.5}
        contentContainerStyle={styles.listContent}
      />
    );
  }

  // Entity-specific Results
  const renderItem =
    entity === "goods"
      ? renderGoodsItem
      : entity === "containers"
      ? renderContainerItem
      : renderClientItem;

  return (
    <FlashList
      data={results.data || []}
      renderItem={renderItem}
      keyExtractor={(item) => item._id}
      refreshControl={
        onRefresh ? (
          <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
        ) : undefined
      }
      onEndReached={onLoadMore}
      onEndReachedThreshold={0.5}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      contentContainerStyle={styles.listContent}
      ListFooterComponent={
        pagination?.hasNext ? (
          <View style={styles.loadMoreContainer}>
            <ActivityIndicator size="small" color={Theme.primary[500]} />
          </View>
        ) : null
      }
    />
  );
};

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: Theme.spacing.xl,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: Theme.spacing["4xl"],
  },
  loadingText: {
    marginTop: Theme.spacing.lg,
    fontSize: 14,
    color: Theme.neutral[500],
  },
  errorIconContainer: {
    width: 80,
    height: 80,
    borderRadius: Theme.radius["2xl"],
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Theme.spacing.lg,
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: Theme.neutral[800],
    marginBottom: Theme.spacing.sm,
  },
  errorSubtitle: {
    fontSize: 14,
    color: Theme.neutral[500],
    textAlign: "center",
    marginBottom: Theme.spacing.lg,
  },
  retryButton: {
    paddingHorizontal: Theme.spacing.lg,
    paddingVertical: Theme.spacing.sm,
    backgroundColor: Theme.primary[500],
    borderRadius: Theme.radius.lg,
  },
  retryText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  emptyIconContainer: {
    width: 120,
    height: 120,
    borderRadius: Theme.radius["3xl"],
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Theme.spacing.lg,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: Theme.neutral[800],
    marginBottom: Theme.spacing.sm,
  },
  emptySubtitle: {
    fontSize: 14,
    color: Theme.neutral[500],
    textAlign: "center",
  },
  section: {
    marginBottom: Theme.spacing.xl,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: Theme.spacing.lg,
    paddingVertical: Theme.spacing.md,
  },
  sectionTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: Theme.spacing.sm,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: Theme.neutral[800],
  },
  sectionCount: {
    fontSize: 12,
    fontWeight: "600",
    color: Theme.neutral[500],
  },
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
  secondaryText: {
    fontSize: 12,
    color: Theme.neutral[500],
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
  separator: {
    height: 1,
    backgroundColor: Theme.neutral[100],
    marginLeft: 72,
  },
  highlight: {
    backgroundColor: Theme.primary[200],
    color: Theme.primary[800],
    fontWeight: "700",
  },
  loadMoreContainer: {
    paddingVertical: Theme.spacing.lg,
    alignItems: "center",
  },
});

export default SearchResults;
