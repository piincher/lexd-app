import React from "react";
import { View } from "react-native";
import {
  Text,
  Button,
  Menu,
  ActivityIndicator,
} from "react-native-paper";
import { FlashList } from "@shopify/flash-list";

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
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text variant="titleMedium" style={styles.sectionTitle}>
          Recent Exports
        </Text>
        <Menu
          visible={filterMenuVisible}
          onDismiss={onFilterMenuDismiss}
          anchor={
            <Button icon="filter" onPress={onFilterMenuOpen} compact>
              {entityFilter || "All"}
            </Button>
          }
        >
          <Menu.Item
            onPress={() => onEntityFilterChange(null)}
            title="All Entities"
          />
          {Object.keys(ENTITY_CONFIG).map((entity) => (
            <Menu.Item
              key={entity}
              onPress={() => onEntityFilterChange(entity as ExportEntity)}
              title={ENTITY_CONFIG[entity as ExportEntity].label}
            />
          ))}
        </Menu>
      </View>

      {isLoading ? (
        <ActivityIndicator style={styles.loader} />
      ) : exports.length === 0 ? (
        <View style={styles.empty}>
          <Text variant="bodyLarge">No exports yet</Text>
          <Text variant="bodySmall" style={styles.emptySubtext}>
            Use Quick Export to get started
          </Text>
        </View>
      ) : (
        <FlashList
          data={exports}
          renderItem={({ item }) => (
            <ExportListItem
              item={item}
              onDownload={onDownload}
              isDownloading={isDownloading}
            />
          )}
          keyExtractor={(item) => item._id}
          scrollEnabled={false}
          contentContainerStyle={styles.exportsList}
        />
      )}
    </View>
  );
};
