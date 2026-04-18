/**
 * DataExportScreen
 * 
 * Main screen for data export and backup management
 */

import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { FlashList } from "@shopify/flash-list";
import {
  Text,
  Card,
  Button,
  IconButton,
  Chip,
  ActivityIndicator,
  Divider,
  SegmentedButtons,
  Searchbar,
  Menu,
  FAB,
  Portal,
} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { format } from "date-fns/format";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";

import {
  useListExports,
  useDownloadExport,
  useGetExportStats,
} from "../hooks/useExport";
import { ExportDataModal } from "../components/ExportDataModal";
import { BackupManager } from "../components/BackupManager";
import { ExportEntity, ExportLog, ExportFormat } from "../types";

const ENTITY_CONFIG: Record<ExportEntity, { label: string; icon: string; color: string }> = {
  GOODS: { label: "Goods", icon: "package-variant", color: "#2196F3" },
  CONTAINERS: { label: "Containers", icon: "truck-container", color: "#4CAF50" },
  PAYMENTS: { label: "Payments", icon: "cash-multiple", color: "#FF9800" },
  CLIENTS: { label: "Clients", icon: "account-group", color: "#9C27B0" },
  USERS: { label: "Users", icon: "account", color: "#673AB7" },
  INVOICES: { label: "Invoices", icon: "file-document", color: "#00BCD4" },
  EXPENSES: { label: "Expenses", icon: "cash-minus", color: "#F44336" },
  ROUTES: { label: "Routes", icon: "routes", color: "#795548" },
  CONSIGNEES: { label: "Consignees", icon: "warehouse", color: "#607D8B" },
  TICKETS: { label: "Tickets", icon: "ticket", color: "#E91E63" },
  NOTIFICATIONS: { label: "Notifications", icon: "bell", color: "#3F51B5" },
};

const FORMAT_ICONS: Record<ExportFormat, string> = {
  CSV: "file-delimited",
  EXCEL: "file-excel",
  JSON: "code-json",
};

const STATUS_COLORS: Record<string, string> = {
  COMPLETED: "#4CAF50",
  PENDING: "#FF9800",
  PROCESSING: "#2196F3",
  FAILED: "#F44336",
  CANCELLED: "#9E9E9E",
};

type Tab = "exports" | "backups";

export const DataExportScreen: React.FC = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState<Tab>("exports");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterMenuVisible, setFilterMenuVisible] = useState(false);
  const [entityFilter, setEntityFilter] = useState<ExportEntity | null>(null);
  const [exportModalVisible, setExportModalVisible] = useState(false);
  const [selectedEntity, setSelectedEntity] = useState<ExportEntity>("GOODS");

  const exportsQuery = useListExports({
    entity: entityFilter || undefined,
    limit: 20,
  });
  const exportStats = useGetExportStats();
  const downloadExport = useDownloadExport();

  const exports = exportsQuery.data?.data || [];

  const handleQuickExport = (entity: ExportEntity) => {
    setSelectedEntity(entity);
    setExportModalVisible(true);
  };

  const handleDownload = (exportLog: ExportLog) => {
    downloadExport.mutate(exportLog.exportId);
  };

  const renderExportItem = ({ item }: { item: ExportLog }) => (
    <Card style={styles.exportCard}>
      <Card.Content>
        <View style={styles.exportHeader}>
          <View style={styles.exportInfo}>
            <Text variant="titleMedium" style={styles.exportId}>
              {item.exportId}
            </Text>
            <View style={styles.chipRow}>
              <Chip
                icon={ENTITY_CONFIG[item.entity]?.icon || "file-export"}
                style={styles.chip}
                compact
              >
                {ENTITY_CONFIG[item.entity]?.label || item.entity}
              </Chip>
              <Chip
                icon={FORMAT_ICONS[item.format] || "file"}
                style={styles.chip}
                compact
              >
                {item.format}
              </Chip>
              <Chip
                style={[
                  styles.statusChip,
                  { backgroundColor: STATUS_COLORS[item.metadata.status] || "#757575" },
                ]}
                textStyle={{ color: "white" }}
                compact
              >
                {item.metadata.status}
              </Chip>
            </View>
          </View>
          
          {item.metadata.status === "COMPLETED" && (
            <IconButton
              icon="download"
              onPress={() => handleDownload(item)}
              loading={downloadExport.isPending}
            />
          )}
        </View>

        <Divider style={styles.divider} />

        <View style={styles.exportDetails}>
          <View style={styles.detail}>
            <Text variant="bodySmall" style={styles.detailLabel}>
              Records
            </Text>
            <Text variant="bodyMedium">{item.metadata.recordCount.toLocaleString()}</Text>
          </View>
          <View style={styles.detail}>
            <Text variant="bodySmall" style={styles.detailLabel}>
              File Size
            </Text>
            <Text variant="bodyMedium">{item.formattedFileSize}</Text>
          </View>
          <View style={styles.detail}>
            <Text variant="bodySmall" style={styles.detailLabel}>
              Duration
            </Text>
            <Text variant="bodyMedium">
              {Math.round(item.metadata.durationMs / 1000)}s
            </Text>
          </View>
        </View>

        <View style={styles.exportFooter}>
          <Text variant="bodySmall" style={styles.dateText}>
            {formatDistanceToNow(new Date(item.createdAt))} ago
          </Text>
          <Text variant="bodySmall" style={styles.userText}>
            by {item.exportedBy.firstName} {item.exportedBy.lastName}
          </Text>
        </View>

        {item.scheduled?.isScheduled && (
          <View style={styles.scheduledBadge}>
            <Chip icon="calendar-clock" compact>
              {item.scheduled.frequency}
            </Chip>
          </View>
        )}
      </Card.Content>
    </Card>
  );

  const renderQuickExportButtons = () => (
    <View style={styles.quickExportSection}>
      <Text variant="titleMedium" style={styles.sectionTitle}>
        Quick Export
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.quickExportScroll}
      >
        {Object.entries(ENTITY_CONFIG).map(([entity, config]) => (
          <TouchableOpacity
            key={entity}
            style={[styles.quickExportButton, { borderColor: config.color }]}
            onPress={() => handleQuickExport(entity as ExportEntity)}
          >
            <View style={[styles.quickExportIcon, { backgroundColor: config.color }]}>
              <Text style={styles.quickExportIconText}>{config.icon}</Text>
            </View>
            <Text variant="bodySmall" style={styles.quickExportLabel}>
              {config.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderStats = () => {
    if (!exportStats.data) return null;

    const stats = exportStats.data;
    return (
      <Card style={styles.statsCard}>
        <Card.Content>
          <Text variant="titleSmall" style={styles.statsTitle}>
            Export Statistics
          </Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text variant="headlineSmall" style={styles.statValue}>
                {stats.total}
              </Text>
              <Text variant="bodySmall" style={styles.statLabel}>
                Total Exports
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text variant="headlineSmall" style={[styles.statValue, { color: "#4CAF50" }]}>
                {stats.successRate}%
              </Text>
              <Text variant="bodySmall" style={styles.statLabel}>
                Success Rate
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text variant="headlineSmall" style={[styles.statValue, { color: "#F44336" }]}>
                {stats.failed}
              </Text>
              <Text variant="bodySmall" style={styles.statLabel}>
                Failed
              </Text>
            </View>
          </View>
        </Card.Content>
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <IconButton
          icon="arrow-left"
          onPress={() => navigation.goBack()}
        />
        <Text variant="titleLarge" style={styles.headerTitle}>
          Data Export & Backup
        </Text>
        <View style={{ width: 48 }} />
      </View>

      {/* Tab Switcher */}
      <SegmentedButtons
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as Tab)}
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
            {renderStats()}
            {renderQuickExportButtons()}

            {/* Recent Exports */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text variant="titleMedium" style={styles.sectionTitle}>
                  Recent Exports
                </Text>
                <Menu
                  visible={filterMenuVisible}
                  onDismiss={() => setFilterMenuVisible(false)}
                  anchor={
                    <Button
                      icon="filter"
                      onPress={() => setFilterMenuVisible(true)}
                      compact
                    >
                      {entityFilter || "All"}
                    </Button>
                  }
                >
                  <Menu.Item
                    onPress={() => {
                      setEntityFilter(null);
                      setFilterMenuVisible(false);
                    }}
                    title="All Entities"
                  />
                  {Object.keys(ENTITY_CONFIG).map((entity) => (
                    <Menu.Item
                      key={entity}
                      onPress={() => {
                        setEntityFilter(entity as ExportEntity);
                        setFilterMenuVisible(false);
                      }}
                      title={ENTITY_CONFIG[entity as ExportEntity].label}
                    />
                  ))}
                </Menu>
              </View>

              {exportsQuery.isLoading ? (
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
                  data={exports as ExportLog[]}
                  renderItem={renderExportItem}
                  keyExtractor={(item) => item._id}
                  scrollEnabled={false}
                  contentContainerStyle={styles.exportsList}
                />
              )}
            </View>
          </ScrollView>

          {/* Export Modal */}
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
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
    backgroundColor: "white",
  },
  headerTitle: {
    fontWeight: "600",
  },
  tabSwitcher: {
    margin: 16,
    marginTop: 8,
  },
  statsCard: {
    margin: 16,
    marginTop: 0,
    backgroundColor: "white",
  },
  statsTitle: {
    marginBottom: 12,
    fontWeight: "500",
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    fontWeight: "700",
  },
  statLabel: {
    color: "#757575",
    marginTop: 4,
  },
  quickExportSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    marginHorizontal: 16,
    marginBottom: 12,
    fontWeight: "600",
  },
  quickExportScroll: {
    paddingHorizontal: 16,
    gap: 12,
  },
  quickExportButton: {
    alignItems: "center",
    padding: 12,
    backgroundColor: "white",
    borderRadius: 12,
    borderWidth: 2,
    minWidth: 80,
  },
  quickExportIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  quickExportIconText: {
    color: "white",
    fontSize: 20,
  },
  quickExportLabel: {
    fontWeight: "500",
  },
  section: {
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  loader: {
    marginVertical: 40,
  },
  empty: {
    alignItems: "center",
    paddingVertical: 40,
  },
  emptySubtext: {
    color: "#757575",
    marginTop: 8,
  },
  exportsList: {
    paddingBottom: 100,
  },
  exportCard: {
    marginBottom: 12,
  },
  exportHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  exportInfo: {
    flex: 1,
  },
  exportId: {
    fontWeight: "600",
    marginBottom: 4,
  },
  chipRow: {
    flexDirection: "row",
    gap: 8,
  },
  chip: {
    height: 28,
  },
  statusChip: {
    height: 28,
  },
  divider: {
    marginVertical: 12,
  },
  exportDetails: {
    flexDirection: "row",
    marginBottom: 8,
  },
  detail: {
    flex: 1,
  },
  detailLabel: {
    color: "#757575",
  },
  exportFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dateText: {
    color: "#757575",
  },
  userText: {
    color: "#757575",
  },
  scheduledBadge: {
    marginTop: 8,
  },
});

export default DataExportScreen;
