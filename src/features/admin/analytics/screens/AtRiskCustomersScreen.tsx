import React from 'react';
import { Screen } from '@src/shared/ui/Screen';
import { EmptyState } from '@src/shared/ui/EmptyState';
import { useGetAtRiskCustomers } from '../hooks/analytics/useAtRiskCustomers';
import { useTriggerWinBack } from '../hooks/useAtRiskWinBack';
import { useAtRiskScreen } from '../hooks/useAtRiskScreen';
import { AtRiskSummaryStats } from '../components/AtRiskSummaryStats';
import { AtRiskFilters } from '../components/AtRiskFilters';
import { AtRiskCustomerList } from '../components/AtRiskCustomerList';
import { AtRiskDetailModal } from '../components/AtRiskDetailModal';
import { AtRiskWinBackModal } from '../components/AtRiskWinBackModal';

export const AtRiskCustomersScreen: React.FC = () => {
  const { triggerWinBack, isPending: isTriggering } = useTriggerWinBack();
  const vm = useAtRiskScreen(triggerWinBack);
  const { data, isLoading, isFetching, isError, refetch } = useGetAtRiskCustomers(vm.queryParams);

  if (isError && !data) {
    return (
      <Screen header={{ title: 'Clients à risque' }}>
        <EmptyState
          icon="cloud-alert-outline"
          title="Chargement impossible"
          message="Vérifiez votre connexion puis réessayez."
          actionLabel="Réessayer"
          onAction={() => { void refetch(); }}
        />
      </Screen>
    );
  }

  return (
    <Screen header={{ title: 'Clients à risque' }} scrollable={false}>
      {data?.summary && (
        <AtRiskSummaryStats
          totalAtRisk={data.summary.totalAtRisk}
          neverShippedCount={data.summary.neverShippedCount}
          inactiveThresholdDays={data.summary.inactiveThresholdDays}
        />
      )}
      <AtRiskFilters
        search={vm.search}
        onSearchChange={vm.setSearch}
        activeFilter={vm.activeFilter}
        onFilterChange={vm.setActiveFilter}
      />
      <AtRiskCustomerList
        customers={data?.customers ?? []}
        isLoading={isLoading && !data}
        isRefreshing={isFetching && Boolean(data)}
        searchActive={vm.search.length > 0 || vm.activeFilter !== 'all'}
        pagination={data?.pagination}
        onRefresh={() => { void refetch(); }}
        onPageChange={vm.setPage}
        onWhatsApp={vm.handleWhatsApp}
        onCall={vm.handleCall}
        onDetail={vm.setDetailCustomer}
        onWinBack={vm.setWinBackCustomer}
      />
      <AtRiskDetailModal
        visible={Boolean(vm.detailCustomer)} customer={vm.detailCustomer}
        onClose={() => vm.setDetailCustomer(null)} onWhatsApp={vm.handleWhatsApp}
        onCall={vm.handleCall} onWinBack={vm.setWinBackCustomer}
      />
      <AtRiskWinBackModal
        visible={Boolean(vm.winBackCustomer)} customer={vm.winBackCustomer}
        onClose={() => vm.setWinBackCustomer(null)} onTrigger={vm.handleWinBack} isPending={isTriggering}
      />
    </Screen>
  );
};

export default AtRiskCustomersScreen;
