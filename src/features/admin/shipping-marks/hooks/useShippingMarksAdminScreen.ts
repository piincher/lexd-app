import { useCallback, useMemo, useState } from 'react';
import type { ShippingMarkClient } from '../api/shippingMarkAdminApi';
import { useShippingMarkConfig } from './useShippingMarkConfig';
import { useShippingMarkDeliveryActions } from './useShippingMarkDeliveryActions';
import { useShippingMarksAdmin } from './useShippingMarksAdmin';
import { useShippingMarkGenerationActions } from './useShippingMarkGenerationActions';

type SendMode = 'all' | 'selected' | null;

export const useShippingMarksAdminScreen = (initialQuery?: string) => {
  const list = useShippingMarksAdmin(initialQuery);
  const settings = useShippingMarkConfig();
  const delivery = useShippingMarkDeliveryActions(list.sendBulkWhatsApp, list.regenerateMark);
  const [sendMode, setSendMode] = useState<SendMode>(null);
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [previewClient, setPreviewClient] = useState<ShippingMarkClient | null>(null);

  const readyCount = useMemo(
    () => list.clients.filter((client) => Boolean(client.shippingMarkImageUrl)).length,
    [list.clients],
  );
  const generation = useShippingMarkGenerationActions({
    selected: list.selected,
    total: list.pagination?.total ?? 0,
    searchQuery: list.searchQuery,
    generationJob: list.generationJob,
    generateBulk: list.generateBulk,
    clearSelection: list.clearSelection,
  });

  const closeSend = useCallback(() => setSendMode(null), []);
  const openSendAll = useCallback(() => setSendMode('all'), []);
  const openSendSelected = useCallback(() => setSendMode('selected'), []);
  const openSettings = useCallback(() => setSettingsVisible(true), []);
  const closeSettings = useCallback(() => setSettingsVisible(false), []);
  const closePreview = useCallback(() => setPreviewClient(null), []);

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
    generateCount: generation.count,
    sendCount: sendMode === 'all' ? list.pagination?.total ?? 0 : list.selected.size,
    openSendAll,
    openSendSelected,
    openGenerate: generation.open,
    closeGenerate: generation.close,
    openSettings,
    closeSettings,
    generateBulk: generation.start,
    setPreviewClient,
    closePreview,
    closeSend,
    sendBulk,
    download: delivery.download,
    sendOne: delivery.sendOne,
    regenerate: delivery.regenerate,
  };
};
