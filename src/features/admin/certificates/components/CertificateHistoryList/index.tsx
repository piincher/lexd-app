import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import { CertificateRecord } from "../../api";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { CertificateCard } from "../CertificateCard";
import { createStyles } from "./CertificateHistoryList.styles";

interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface CertificateHistoryListProps {
  data: CertificateRecord[];
  isRefetching: boolean;
  onRefresh: () => void;
  pagination: PaginationInfo;
  currentPage: number;
  onPrevPage: () => void;
  onNextPage: () => void;
  activeFilter: string;
  onResetFilter: () => void;
  onDownload: (certificateId: string) => void;
  isDownloading: boolean;
  onPressCertificate: (certificate: CertificateRecord) => void;
}

export const CertificateHistoryList: React.FC<CertificateHistoryListProps> = ({
  data,
  isRefetching,
  onRefresh,
  pagination,
  currentPage,
  onPrevPage,
  onNextPage,
  activeFilter,
  onResetFilter,
  onDownload,
  isDownloading,
  onPressCertificate,
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors, isDark), [colors, isDark]);
  const renderItem = ({ item }: { item: CertificateRecord }) => (
    <CertificateCard
      certificate={item}
      onDownload={onDownload}
      isDownloading={isDownloading}
      onPress={() => onPressCertificate(item)}
    />
  );

  return (
    <FlashList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item._id}
      contentContainerStyle={styles.listContainer}
      showsVerticalScrollIndicator={false}
      refreshing={isRefetching}
      onRefresh={onRefresh}
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <MaterialIcons name="verified" size={64} color={colors.neutral[300]} />
          <Text style={styles.emptyTitle}>Aucun certificat trouvé</Text>
          <Text style={styles.emptySubtitle}>
            {activeFilter !== "all"
              ? "Essayez de modifier vos filtres"
              : "Les certificats apparaîtront ici une fois émis"}
          </Text>
          {activeFilter !== "all" && (
            <TouchableOpacity
              style={styles.resetFilterButton}
              onPress={onResetFilter}
              activeOpacity={0.7}
            >
              <Text style={styles.resetFilterText}>Réinitialiser les filtres</Text>
            </TouchableOpacity>
          )}
        </View>
      }
      ListFooterComponent={
        pagination.totalPages > 1 ? (
          <View style={styles.paginationContainer}>
            <TouchableOpacity
              style={[styles.paginationButton, currentPage <= 1 && styles.paginationButtonDisabled]}
              onPress={onPrevPage}
              disabled={currentPage <= 1}
              activeOpacity={0.7}
            >
              <Ionicons
                name="chevron-back"
                size={20}
                color={currentPage <= 1 ? colors.text.disabled : colors.text.primary}
              />
            </TouchableOpacity>
            <Text style={styles.paginationText}>
              Page {pagination.page} / {pagination.totalPages}
            </Text>
            <TouchableOpacity
              style={[
                styles.paginationButton,
                currentPage >= pagination.totalPages && styles.paginationButtonDisabled,
              ]}
              onPress={onNextPage}
              disabled={currentPage >= pagination.totalPages}
              activeOpacity={0.7}
            >
              <Ionicons
                name="chevron-forward"
                size={20}
                color={currentPage >= pagination.totalPages ? colors.text.disabled : colors.text.primary}
              />
            </TouchableOpacity>
          </View>
        ) : null
      }
    />
  );
};
