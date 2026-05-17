import React from "react";
import { View } from "react-native";
import { Text, Menu, Button } from "react-native-paper";

import { EmptyState } from "@src/shared/ui/EmptyState";
import { ShimmerBlock } from "@src/shared/ui/ShimmerBlock";
import { ExportEntity, ExportLog } from "../../types";
import { ENTITY_CONFIG } from "../../constants";
import { ExportListItem } from "../ExportListItem";
import { styles } from "./RecentExportsSection.styles";

interface RecentExportsSectionProps {
  exports: ExportLog[];
  isLoading: boolean;
  entityFilter: ExportEntity | null;
  filterMenuVisible: boolean;
  onFilterMenuDismiss: () => void;
  onFilterMenuOpen: () => void;
  onEntityFilterChange: (entity: ExportEntity | null) => void;
  onDownload: (exportLog: ExportLog) => void;
  isDownloading: boolean;
}

const Skeleton = () => (
  <>
    <ShimmerBlock width="40%" height={18} borderRadius={4} style={styles.skeletonTitle} />
    {Array.from({ length: 3 }).map((_, i) => (
      <ShimmerBlock key={i} width="100%" height={120} borderRadius={12} style={styles.skeletonCard} />
    ))}
  </>
);

export const RecentExportsSection: React.FC<RecentExportsSectionProps> = ({
  exports,
  isLoading,
  entityFilter,
  filterMenuVisible,
  onFilterMenuDismiss,
  onFilterMenuOpen,
  onEntityFilterChange,
  onDownload,
  isDownloading,
}) => {
  if (isLoading) {
    return (
      <View style={styles.section}>
        <Skeleton />
      </View>
    );
  }

  const entities = Object.entries(ENTITY_CONFIG) as [ExportEntity, typeof ENTITY_CONFIG[ExportEntity]][];

  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <Text variant="titleSmall" style={styles.title}>Recent Exports</Text>
        <Menu
          visible={filterMenuVisible}
          onDismiss={onFilterMenuDismiss}
          anchor={
            <Button icon="filter-variant" onPress={onFilterMenuOpen} compact mode="outlined" style={styles.filterButton} labelStyle={styles.filterLabel}>
              {entityFilter ? ENTITY_CONFIG[entityFilter]?.label : "All"}
            </Button>
          }
        >
          <Menu.Item onPress={() => onEntityFilterChange(null)} title="All Entities" />
          {entities.map(([entity, config]) => (
            <Menu.Item key={entity} onPress={() => onEntityFilterChange(entity)} title={config.label} />
          ))}
        </Menu>
      </View>

      {exports.length === 0 ? (
        <EmptyState icon="file-export-outline" title="No exports yet" message="Use Quick Export above to generate your first data export" />
      ) : (
        <View style={styles.list}>
          {exports.map((item) => (
            <ExportListItem key={item._id} item={item} onDownload={onDownload} isDownloading={isDownloading} />
          ))}
        </View>
      )}
    </View>
  );
};
