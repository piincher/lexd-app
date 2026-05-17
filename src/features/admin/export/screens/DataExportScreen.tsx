// DataExportScreen - Main screen for data export and backup management

import React from "react";
import { View, ScrollView, RefreshControl } from "react-native";
import { SegmentedButtons } from "react-native-paper";

import { Screen } from "@src/shared/ui/Screen";
import { useDataExportScreenUI } from "./hooks/useDataExportScreenUI";
import { ExportStatsCard } from "../components/ExportStatsCard";
import { QuickExportButtons } from "../components/QuickExportButtons";
import { RecentExportsSection } from "../components/RecentExportsSection";
import { ExportDataModal } from "../components/ExportDataModal";
import { BackupManager } from "../components/BackupManager";
import { ENTITY_CONFIG } from "../constants";
import { styles } from "./DataExportScreen.styles";

export const DataExportScreen: React.FC = () => {
  const {
    activeTab,
    filterMenuVisible,
    entityFilter,
    exportModalVisible,
    selectedEntity,
    exportsQuery,
    exportStats,
    downloadExport,
    handleQuickExport,
    handleDownload,
    handleEntityFilterChange,
    exports,
    handlers,
  } = useDataExportScreenUI();

  return (
    <Screen
      header={{ title: "Data Export & Backup", showBack: true }}
      scrollable={false}
      contentStyle={{ flex: 1, padding: 0 }}
    >
      <SegmentedButtons
        value={activeTab}
        onValueChange={handlers.handleTabChange}
        buttons={[
          { value: "exports", label: "Exports" },
          { value: "backups", label: "Backups" },
        ]}
        style={styles.tabSwitcher}
      />

      {activeTab === "exports" ? (
        <ScrollView
          style={styles.tabContent}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={exportsQuery.isRefetching}
              onRefresh={handlers.handleRefresh}
            />
          }
        >
          <ExportStatsCard stats={exportStats} />
          <QuickExportButtons onQuickExport={handleQuickExport} />
          <RecentExportsSection
            exports={exports}
            isLoading={exportsQuery.isLoading}
            entityFilter={entityFilter}
            filterMenuVisible={filterMenuVisible}
            onFilterMenuDismiss={handlers.handleFilterMenuDismiss}
            onFilterMenuOpen={handlers.handleFilterMenuOpen}
            onEntityFilterChange={handleEntityFilterChange}
            onDownload={handleDownload}
            isDownloading={downloadExport.isPending}
          />
        </ScrollView>
      ) : (
        <View style={styles.tabContent}>
          <BackupManager isSuperAdmin={true} />
        </View>
      )}

      <ExportDataModal
        visible={exportModalVisible}
        onDismiss={handlers.handleExportModalDismiss}
        entity={selectedEntity}
        entityLabel={ENTITY_CONFIG[selectedEntity]?.label || selectedEntity}
      />
    </Screen>
  );
};

export default DataExportScreen;
