import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";
import type { RootStackScreenProps } from "@src/navigations/type";
import { useWinBackConfigs, useWinBackStats, useWinBackTrends, useWinBackLogs } from "../hooks/useWinBackQueries";
import { useUpdateWinBackConfig, useForceRunWinBack } from "../hooks/useWinBackMutations";
import { WinBackSummaryStats } from "../components/WinBackSummaryStats";
import { WinBackTrendChart } from "../components/WinBackTrendChart";
import { WinBackTriggerCard } from "../components/WinBackTriggerCard";
import { WinBackLogFilters } from "../components/WinBackLogFilters";
import { WinBackLogList } from "../components/WinBackLogList";
import { WinBackPreviewModal } from "../components/WinBackPreviewModal";
import { WinBackConfigModal } from "../components/WinBackConfigModal";
import { WinBackManualTriggerModal } from "../components/WinBackManualTriggerModal";
import type { WinBackConfig } from "../api/winBackApi";
import { createStyles } from "./WinBackDashboardScreen.styles";

export default function WinBackDashboardScreen({ navigation }: RootStackScreenProps<"WinBackDashboard">) {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);

  const { data: configs, isLoading: configsLoading } = useWinBackConfigs();
  const { data: stats, isLoading: statsLoading } = useWinBackStats(30);
  const { data: trends, isLoading: trendsLoading } = useWinBackTrends(30);

  const [logPage, setLogPage] = useState(1);
  const [logSearch, setLogSearch] = useState("");
  const [logTrigger, setLogTrigger] = useState("all");
  const [logResponse, setLogResponse] = useState("all");

  const { data: logsData, isLoading: logsLoading } = useWinBackLogs({
    page: logPage,
    limit: 20,
    triggerType: logTrigger === "all" ? undefined : logTrigger,
    responseType: logResponse === "all" ? undefined : logResponse,
    search: logSearch || undefined,
  });

  const updateConfig = useUpdateWinBackConfig();
  const forceRun = useForceRunWinBack();

  const [previewConfig, setPreviewConfig] = useState<WinBackConfig | null>(null);
  const [editConfig, setEditConfig] = useState<WinBackConfig | null>(null);
  const [showManualTrigger, setShowManualTrigger] = useState(false);

  const handleToggle = (config: WinBackConfig) => {
    updateConfig.mutate({ triggerType: config.triggerType, updates: { enabled: !config.enabled } });
  };

  const handleForceRun = () => {
    forceRun.mutate(undefined, { onSuccess: () => alert("Win-back exécuté avec succès") });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()} activeOpacity={0.7}>
            <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>Win-Back Automation</Text>
            <Text style={styles.headerSubtitle}>Réactivation des clients inactifs</Text>
          </View>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Summary Stats */}
        <WinBackSummaryStats summary={stats?.overall ?? { totalSent: 0, totalResponded: 0, totalPending: 0, responseRate: 0, totalRevenue: 0 }} isLoading={statsLoading} />

        {/* Trend Chart */}
        <WinBackTrendChart trends={trends ?? []} isLoading={trendsLoading} />

        {/* Quick Actions */}
        <View style={styles.actionsRow}>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.primary.main }]} onPress={handleForceRun} activeOpacity={0.7} disabled={forceRun.isPending}>
            <MaterialCommunityIcons name="play-circle-outline" size={20} color={colors.text.inverse} />
            <Text style={[styles.actionText, { color: colors.text.inverse }]}>
              {forceRun.isPending ? "Exécution..." : "Exécuter maintenant"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.status.info + "15" }]} onPress={() => setShowManualTrigger(true)} activeOpacity={0.7}>
            <MaterialCommunityIcons name="account-arrow-right-outline" size={20} color={colors.status.info} />
            <Text style={[styles.actionText, { color: colors.status.info }]}>Manuel</Text>
          </TouchableOpacity>
        </View>

        {/* Trigger Cards */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Configurations de déclenchement</Text>
          <Text style={styles.sectionCount}>{configs?.length ?? 0} actives</Text>
        </View>

        {configsLoading ? (
          <View style={styles.loadingBox}>
            <Text style={styles.loadingText}>Chargement...</Text>
          </View>
        ) : (
          configs?.map((config) => (
            <WinBackTriggerCard
              key={config.triggerType}
              config={config}
              onToggle={handleToggle}
              onEdit={(c) => setEditConfig(c)}
              onPreview={(c) => setPreviewConfig(c)}
            />
          ))
        )}

        {/* Logs Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Logs récents</Text>
          <Text style={styles.sectionCount}>{logsData?.pagination?.total ?? 0} total</Text>
        </View>

        <WinBackLogFilters
          search={logSearch}
          onSearchChange={(v) => { setLogSearch(v); setLogPage(1); }}
          triggerFilter={logTrigger}
          onTriggerFilterChange={(v) => { setLogTrigger(v); setLogPage(1); }}
          responseFilter={logResponse}
          onResponseFilterChange={(v) => { setLogResponse(v); setLogPage(1); }}
        />

        <WinBackLogList
          logs={logsData?.data ?? []}
          isLoading={logsLoading}
          page={logPage}
          totalPages={logsData?.pagination?.pages ?? 1}
          onNextPage={() => setLogPage((p) => p + 1)}
          onPrevPage={() => setLogPage((p) => Math.max(1, p - 1))}
        />

        <View style={{ height: 24 }} />
      </ScrollView>

      {/* Modals */}
      <WinBackPreviewModal visible={!!previewConfig} config={previewConfig} onClose={() => setPreviewConfig(null)} />
      <WinBackConfigModal
        visible={!!editConfig}
        config={editConfig}
        onClose={() => setEditConfig(null)}
        onSave={(type, updates) => updateConfig.mutate({ triggerType: type, updates })}
        isSaving={updateConfig.isPending}
      />
      <WinBackManualTriggerModal visible={showManualTrigger} onClose={() => setShowManualTrigger(false)} />
    </SafeAreaView>
  );
}
