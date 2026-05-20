import React, { useCallback } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Screen } from "@src/shared/ui/Screen";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { Fonts } from "@src/constants/Fonts";
import { useGetAtRiskCustomers } from "../hooks/analytics/useAtRiskCustomers";
import { useTriggerWinBack } from "../hooks/useAtRiskWinBack";
import { useAtRiskScreen } from "../hooks/useAtRiskScreen";
import { AtRiskSummaryStats } from "../components/AtRiskSummaryStats";
import { AtRiskFilters } from "../components/AtRiskFilters";
import { AtRiskCustomerList } from "../components/AtRiskCustomerList";
import { AtRiskDetailModal } from "../components/AtRiskDetailModal";
import { AtRiskWinBackModal } from "../components/AtRiskWinBackModal";

export const AtRiskCustomersScreen: React.FC = () => {
  const { colors } = useAppTheme();
  const { data, isLoading, isError, refetch } = useGetAtRiskCustomers({ days: 60, page: 1, limit: 50 });
  const { mutateAsync: triggerWinBack, isPending: isTriggering } = useTriggerWinBack();

  const {
    search, setSearch, activeFilter, setActiveFilter, filtered,
    detailCustomer, setDetailCustomer, winBackCustomer, setWinBackCustomer,
    handleWhatsApp, handleCall,
  } = useAtRiskScreen(data?.customers ?? []);

  const handleWinBack = useCallback(async (userId: string, triggerType: string) => {
    await triggerWinBack({ userId, triggerType });
    setWinBackCustomer(null);
  }, [triggerWinBack, setWinBackCustomer]);

  if (isError) {
    return (
      <Screen header={{ title: "Clients à risque" }}>
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", gap: 12, padding: 24 }}>
          <MaterialCommunityIcons name="alert-circle-outline" size={48} color={colors.status.error} />
          <Text style={{ fontFamily: Fonts.medium, fontSize: 16, color: colors.text.secondary }}>
            Erreur de chargement
          </Text>
          <TouchableOpacity
            onPress={() => refetch()}
            style={{ backgroundColor: colors.primary.main, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10 }}
          >
            <Text style={{ color: colors.text.inverse, fontFamily: Fonts.bold, fontSize: 14 }}>Réessayer</Text>
          </TouchableOpacity>
        </View>
      </Screen>
    );
  }

  return (
    <Screen header={{ title: "Clients à risque" }} scrollable={false}>
      {data?.summary && (
        <AtRiskSummaryStats
          totalAtRisk={data.summary.totalAtRisk}
          neverShippedCount={data.summary.neverShippedCount}
          inactiveThresholdDays={data.summary.inactiveThresholdDays}
        />
      )}

      <AtRiskFilters
        search={search}
        onSearchChange={setSearch}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      <AtRiskCustomerList
        customers={filtered}
        isLoading={isLoading && !data}
        searchActive={search.length > 0}
        onWhatsApp={handleWhatsApp}
        onCall={handleCall}
        onDetail={setDetailCustomer}
        onWinBack={setWinBackCustomer}
      />

      <AtRiskDetailModal
        visible={!!detailCustomer}
        customer={detailCustomer}
        onClose={() => setDetailCustomer(null)}
        onWhatsApp={handleWhatsApp}
        onCall={handleCall}
        onWinBack={setWinBackCustomer}
      />

      <AtRiskWinBackModal
        visible={!!winBackCustomer}
        customer={winBackCustomer}
        onClose={() => setWinBackCustomer(null)}
        onTrigger={handleWinBack}
        isPending={isTriggering}
      />
    </Screen>
  );
};

export default AtRiskCustomersScreen;
