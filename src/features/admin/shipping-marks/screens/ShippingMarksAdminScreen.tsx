import React from 'react';
import type { RootStackScreenProps } from '@src/navigations/type';
import { Screen } from '@src/shared/ui/Screen';
import { Loading } from '@src/shared/ui/Loading';
import { useShippingMarksAdminScreen } from '../hooks/useShippingMarksAdminScreen';
import { ClientsList } from '../components/ClientsList';
import { BulkActions } from '../components/BulkActions';
import { BulkSendModal } from '../components/BulkSendModal';
import { BulkGenerateModal } from '../components/BulkGenerateModal';
import { ShippingMarkSettingsModal } from '../components/ShippingMarkSettingsModal';
import { ClientShippingMarkPreviewModal } from '../components/ClientShippingMarkPreviewModal';
import { ShippingMarksListHeader } from '../components/ShippingMarksListHeader';
import { styles as screenStyles } from './ShippingMarksAdminScreen.styles';

export const ShippingMarksAdminScreen: React.FC<RootStackScreenProps<'ShippingMarksAdmin'>> = ({ route, navigation }) => {
  const vm = useShippingMarksAdminScreen(route.params?.q, route.params?.supplierShare);
  const createClient = () => navigation.navigate('UserAdd');

  if (vm.isInitialLoading) return <Loading message="Chargement des marques…" fullScreen />;

  const total = vm.pagination?.total ?? 0;
  const page = vm.pagination?.page ?? 1;
  const pages = vm.pagination?.pages ?? 1;
  const listHeader = <ShippingMarksListHeader
    total={total} visibleCount={vm.clients.length} readyCount={vm.readyCount}
    page={page} pages={pages} selectedCount={vm.selected.size} query={vm.searchQuery}
    job={vm.generationJob} loading={vm.generateMissingLoading}
    regenerateLoading={vm.generateRegenerateLoading} anyLoading={vm.isGeneratingBulk}
    fetching={vm.isFetching}
    unavailable={vm.isError} onGenerate={vm.openGenerate} onRegenerate={vm.openRegenerate}
    onSearch={vm.updateSearch}
    onOpenSettings={vm.openSettings} onCreateClient={createClient}
  />;

  return (
    <Screen
      header={{ title: "Marques d'expédition" }}
      scrollable={false}
      contentStyle={screenStyles.content}
      footer={vm.isError ? undefined : (
        <BulkActions
          selectedCount={vm.selected.size}
          total={total}
          onSendSelected={vm.openSendSelected}
          onSendAll={vm.openSendAll}
          onClearSelection={vm.clearSelection}
          isSending={vm.isSendingBulk}
        />
      )}
    >
      <ClientsList
        clients={vm.clients}
        header={listHeader}
        selected={vm.selected}
        allCurrentPageSelected={vm.allCurrentPageSelected}
        onToggle={vm.toggleClientSelection}
        onToggleAll={vm.toggleCurrentPageSelection}
        onPreview={vm.setPreviewClient}
        onShareSupplier={vm.shareWithSupplier}
        onSend={vm.sendOne}
        onRegenerate={vm.regenerate}
        regeneratingClientId={vm.regeneratingClientId}
        sendingClientIds={vm.sendingClientIds}
        sharingClientId={vm.sharingClientId}
        isFetching={vm.isFetching}
        isError={vm.isError}
        errorMessage={vm.errorMessage}
        onRefresh={vm.refetch}
        page={page}
        pages={pages}
        hasPrev={vm.pagination?.hasPrev ?? false}
        hasNext={vm.pagination?.hasNext ?? false}
        onPageChange={vm.goToPage}
        onCreateClient={createClient}
      />
      <BulkSendModal visible={vm.sendModalVisible} count={vm.sendCount} onClose={vm.closeSend} onSend={vm.sendBulk} isSending={vm.isSendingBulk} />
      <BulkGenerateModal
        visible={vm.generateModalVisible}
        mode={vm.generateMode}
        count={vm.generateCount}
        onClose={vm.closeGenerate}
        onGenerate={vm.generateBulk}
        isGenerating={vm.isGeneratingBulk}
      />
      <ShippingMarkSettingsModal visible={vm.settingsVisible} config={vm.config} isSaving={vm.isUpdatingConfig} onSave={vm.updateConfig} onClose={vm.closeSettings} />
      <ClientShippingMarkPreviewModal
        visible={Boolean(vm.previewClient)} client={vm.previewClient}
        isSending={vm.isSendingBulk} isRegenerating={vm.isRegenerating}
        isSharing={vm.sharingClientId === vm.previewClient?._id}
        onClose={vm.closePreview} onShareSupplier={vm.shareWithSupplier} onSend={vm.sendOne} onRegenerate={vm.regenerate}
      />
    </Screen>
  );
};
