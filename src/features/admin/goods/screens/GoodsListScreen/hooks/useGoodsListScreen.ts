import { useState, useCallback, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ApiClientError } from '@src/api/client';
import { useGoodsList } from '../../../hooks';
import { useGoodsBulkActions } from './useGoodsBulkActions';
import { generateSelectedGoodsPdf } from '@src/features/admin/export/services/goodsPdfService';

type Nav = NativeStackNavigationProp<{
  GoodsList: undefined; ReceiveGoods: undefined;
  AdminGoodsDetail: { goodsId: string };
  AdminGoodsPdfExport: { startDate?: string; endDate?: string } | undefined;
}>;

const MONGO_ID = /^[a-fA-F0-9]{24}$/;

export const useGoodsListScreen = () => {
  const nav = useNavigation<Nav>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [scannerVisible, setScannerVisible] = useState(false);
  const [statsSheetVisible, setStatsSheetVisible] = useState(false);

  const list = useGoodsList({
    onError: (err: ApiClientError) => setErrorMessage(err.getUserMessage()),
  });

  const bulk = useGoodsBulkActions(list.goods, list.handleRefresh);

  const handleGoodsPress = useCallback((goodsId: string) => {
    nav.navigate('AdminGoodsDetail', { goodsId });
  }, [nav]);

  const handleAddPress = useCallback(() => nav.navigate('ReceiveGoods'), [nav]);

  const handleExportPress = useCallback(() => {
    nav.navigate('AdminGoodsPdfExport', list.dateRange ? {
      startDate: list.dateRange.startDate,
      endDate: list.dateRange.endDate,
    } : undefined);
  }, [nav, list.dateRange]);

  const handleToggleSelectionMode = useCallback(() => {
    if (bulk.isSelectionMode) bulk.exitSelectionMode();
    else bulk.setIsSelectionMode(true);
  }, [bulk]);

  // Export ONLY the goods the operator has ticked in selection mode → PDF.
  const handleExportSelectedPdf = useCallback(async () => {
    const idSet = new Set(bulk.selectedGoodsIds);
    const selected = list.goods.filter((g) => idSet.has(g._id));
    if (selected.length === 0) {
      setErrorMessage('Sélectionnez au moins une marchandise à exporter.');
      return;
    }
    try {
      await generateSelectedGoodsPdf(selected);
      bulk.exitSelectionMode();
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Export PDF impossible.');
    }
  }, [bulk, list.goods]);

  // ── Stats sheet ──────────────────────────────────────────────────────────
  // Opens a bottom sheet with aggregated totals (count / weight / CBM) for
  // the current filter set. Only fired when the operator taps the icon, so
  // the aggregation query only runs on demand.
  const handleStatsPress = useCallback(() => setStatsSheetVisible(true), []);
  const handleStatsDismiss = useCallback(() => setStatsSheetVisible(false), []);

  // ── Scan-to-find ─────────────────────────────────────────────────────────
  // Opens the QR scanner modal; the handler below resolves the scanned code to a goods
  // _id and navigates to the detail screen.
  const handleScanPress = useCallback(() => setScannerVisible(true), []);
  const handleScannerDismiss = useCallback(() => setScannerVisible(false), []);
  const handleScannedCode = useCallback((data: string) => {
    setScannerVisible(false);
    const code = (data || '').trim();
    if (!code) return;

    // First try a local match — the QR almost always encodes the human-readable goodsId
    // (e.g. "G-2605-0019") which is what the receive flow stamps onto the label.
    const match = list.goods.find((g) => g.goodsId === code || g._id === code);
    if (match) {
      nav.navigate('AdminGoodsDetail', { goodsId: match._id });
      return;
    }

    // Fallback: a raw Mongo _id can still resolve via the detail screen's fetch even
    // when the goods isn't in the current filtered list.
    if (MONGO_ID.test(code)) {
      nav.navigate('AdminGoodsDetail', { goodsId: code });
      return;
    }

    setErrorMessage(`Marchandise "${code}" introuvable dans la liste actuelle.`);
  }, [list.goods, nav]);

  // ── Selection totals ─────────────────────────────────────────────────────
  // Running aggregate of what the operator has selected — gives them the shape of the
  // batch (weight, volume, value) before assigning it to a container or shipping it out.
  const selectionTotals = useMemo(() => {
    if (!bulk.isSelectionMode || bulk.selectedGoodsIds.length === 0) return null;
    const idSet = new Set(bulk.selectedGoodsIds);
    let weight = 0;
    let cbm = 0;
    let cost = 0;
    let count = 0;
    for (const g of list.goods) {
      if (idSet.has(g._id)) {
        count += 1;
        weight += g.weight || 0;
        cbm += g.actualCBM || 0;
        cost += g.totalCost || 0;
      }
    }
    return { count, weight, cbm, cost };
  }, [bulk.isSelectionMode, bulk.selectedGoodsIds, list.goods]);

  const pendingCount = list.goods.filter((g) => g.status === 'RECEIVED_AT_WAREHOUSE').length;

  return {
    ...list,
    ...bulk,
    errorMessage,
    setErrorMessage,
    filterModalVisible,
    setFilterModalVisible,
    handleGoodsPress,
    handleAddPress,
    handleExportPress,
    handleExportSelectedPdf,
    handleToggleSelectionMode,
    pendingCount,
    // Scanner
    scannerVisible,
    handleScanPress,
    handleScannerDismiss,
    handleScannedCode,
    // Selection totals
    selectionTotals,
    // Stats sheet
    statsSheetVisible,
    handleStatsPress,
    handleStatsDismiss,
  };
};
