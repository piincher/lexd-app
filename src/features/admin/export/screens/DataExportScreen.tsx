// DataExportScreen - Main screen for data export and backup management

import React from "react";
import { View, StyleSheet, ScrollView, RefreshControl } from "react-native";
import { SegmentedButtons } from "react-native-paper";

import { useDataExportScreen } from "../hooks/useDataExportScreen";
import { DataExportHeader } from "../components/DataExportHeader";
import { ExportStatsCard } from "../components/ExportStatsCard";
import { QuickExportButtons } from "../components/QuickExportButtons";
import { RecentExportsSection } from "../components/RecentExportsSection";
import { ExportDataModal } from "../components/ExportDataModal";
import { BackupManager } from "../components/BackupManager";
import { ENTITY_CONFIG } from "../constants";
import { Theme } from "@src/constants/Theme";

export const DataExportScreen: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    filterMenuVisible,
    setFilterMenuVisible,
    entityFilter,
    exportModalVisible,
    setExportModalVisible,
    selectedEntity,
    exportsQuery,
    exportStats,
    downloadExport,
    handleQuickExport,
    handleDownload,
    handleEntityFilterChange,
  } = useDataExportScreen();

  return (
    <View style={styles.container}>
      <DataExportHeader />

      <SegmentedButtons
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as "exports" | "backups")}
        buttons={[
          { value: "exports", label: "Exports" },
          { value: "backups", label: "Backups" },
        ]}
        style={styles.tabSwitcher}
      />

      {activeTab === "exports" ? (
        <>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={exportsQuery.isRefetching}
                onRefresh={exportsQuery.refetch}
              />
            }
          >
            <ExportStatsCard stats={exportStats.data} />
            <QuickExportButtons onQuickExport={handleQuickExport} />
            <RecentExportsSection
              exports={(exportsQuery.data?.data || []) as import("../types").ExportLog[]}
              isLoading={exportsQuery.isLoading}
              entityFilter={entityFilter}
              filterMenuVisible={filterMenuVisible}
              onFilterMenuDismiss={() => setFilterMenuVisible(false)}
              onFilterMenuOpen={() => setFilterMenuVisible(true)}
              onEntityFilterChange={handleEntityFilterChange}
              onDownload={handleDownload}
              isDownloading={downloadExport.isPending}
            />
          </ScrollView>

          <ExportDataModal
            visible={exportModalVisible}
            onDismiss={() => setExportModalVisible(false)}
            entity={selectedEntity}
            entityLabel={ENTITY_CONFIG[selectedEntity]?.label || selectedEntity}
          />
        </>
      ) : (
        <BackupManager isSuperAdmin={true} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background.paper,
  },
  tabSwitcher: {
    margin: 16,
    marginTop: 8,
  },
});

export default DataExportScreen;
