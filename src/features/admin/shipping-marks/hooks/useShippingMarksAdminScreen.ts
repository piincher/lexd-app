import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { SupplierShippingMarkShareRequest } from '@src/shared/types/shippingMark';
import type { ShippingMarkClient } from '../api/shippingMarkAdminApi';
import { useShippingMarkConfig } from './useShippingMarkConfig';
import { useShippingMarkDeliveryActions } from './useShippingMarkDeliveryActions';
import { useShippingMarksAdmin } from './useShippingMarksAdmin';
import { useShippingMarkGenerationActions } from './useShippingMarkGenerationActions';
import { useSupplierShippingMarkShare } from './useSupplierShippingMarkShare';

type SendMode = 'all' | 'selected' | null;

export const useShippingMarksAdminScreen = (initialQuery?: string, initialSupplierShare?: SupplierShippingMarkShareRequest) => {
  const list = useShippingMarksAdmin(initialQuery);
  const settings = useShippingMarkConfig();
  const delivery = useShippingMarkDeliveryActions(list.sendBulkWhatsApp, list.regenerateMark);
  const [sendMode, setSendMode] = useState<SendMode>(null);
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [previewClient, setPreviewClient] = useState<ShippingMarkClient | null>(null);
  const supplierShare = useSupplierShippingMarkShare();
  const shareSupplierRequest = supplierShare.shareWithSupplier;
  const autoShareStarted = useRef(false);

  useEffect(() => {
    if (!list.isLoading && initialSupplierShare && !autoShareStarted.current) {
      autoShareStarted.current = true;
      void shareSupplierRequest(initialSupplierShare);
    }
  }, [initialSupplierShare, list.isLoading, shareSupplierRequest]);

  const readyCount = useMemo(
    () => list.clients.filter((client) => Boolean(client.shippingMarkImageUrl)).length,
    [list.clients],
  );
  const generation = useShippingMarkGenerationActions({
    selected: list.selected,
    total: list.pagination?.total ?? 0,
    searchQuery: list.searchQuery,
    generationJob: list.generationJob,
    isGeneratingBulk: list.isGeneratingBulk,
    generateBulk: list.generateBulk,
    clearSelection: list.clearSelection,
  });

  const closeSend = useCallback(() => setSendMode(null), []);
  const openSendAll = useCallback(() => setSendMode('all'), []);
  const openSendSelected = useCallback(() => setSendMode('selected'), []);
  const openSettings = useCallback(() => setSettingsVisible(true), []);
  const closeSettings = useCallback(() => setSettingsVisible(false), []);
  const closePreview = useCallback(() => setPreviewClient(null), []);
  const shareWithSupplier = useCallback((client: ShippingMarkClient) => {
    const clientName = `${client.firstName || ''} ${client.lastName || ''}`.trim();
    return shareSupplierRequest({
      userId: client._id,
      clientId: client.clientId,
      clientName,
      phoneNumber: client.phoneNumber,
    });
  }, [shareSupplierRequest]);

  const sendBulk = useCallback(async (caption: string) => {
    if (sendMode === 'all') {
      await list.sendBulkWhatsApp({ all: true, q: list.searchQuery, caption });
    } else {
      await list.sendBulkWhatsApp({ userIds: Array.from(list.selected), caption });
    }
    closeSend();
    list.clearSelection();
  }, [closeSend, list, sendMode]);

  return {
    ...list,
    config: settings.config,
    updateConfig: settings.updateConfig,
    isUpdatingConfig: settings.isUpdating,
    isInitialLoading: list.isLoading || settings.isLoading,
    readyCount,
    previewClient,
    settingsVisible,
    sendModalVisible: sendMode !== null,
    generateModalVisible: generation.visible,
    generateMode: generation.mode,
    generateCount: generation.count,
    generateMissingLoading: generation.missingLoading,
    generateRegenerateLoading: generation.regenerateLoading,
    sendCount: sendMode === 'all' ? list.pagination?.total ?? 0 : list.selected.size,
    openSendAll,
    openSendSelected,
    openGenerate: generation.openMissing,
    openRegenerate: generation.openRegenerate,
    closeGenerate: generation.close,
    openSettings,
    closeSettings,
    generateBulk: generation.start,
    setPreviewClient,
    closePreview,
    closeSend,
    sendBulk,
    shareWithSupplier,
    sharingClientId: supplierShare.sharingClientId,
    sendOne: delivery.sendOne,
    regenerate: delivery.regenerate,
  };
};
