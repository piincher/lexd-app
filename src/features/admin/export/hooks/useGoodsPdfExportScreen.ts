/**
 * useGoodsPdfExportScreen
 *
 * Hook for managing GoodsPdfExportScreen state and business logic
 */

import { useState, useCallback, useEffect } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import { DateRange, DateRangePreset } from "@src/components/DateRangePicker";
import { useGoodsPdfExport } from "./useGoodsPdfExport";

export const useGoodsPdfExportScreen = () => {
  const navigation = useNavigation();
  const params = (useRoute().params || {}) as {
    startDate?: string;
    endDate?: string;
  };
  const [start, setStart] = useState<string | null>(params.startDate || null);
  const [end, setEnd] = useState<string | null>(params.endDate || null);
  const [pickerVisible, setPickerVisible] = useState(false);
  const { isLoading, goodsCount, fetchPreview, exportPdf } = useGoodsPdfExport();

  useEffect(() => {
    if (start && end) fetchPreview({ startDate: start, endDate: end });
  }, [start, end, fetchPreview]);

  const onConfirm = useCallback(
    (range: DateRange, _preset: DateRangePreset) => {
      setStart(range.startDate.toISOString());
      setEnd(range.endDate.toISOString());
      setPickerVisible(false);
    },
    []
  );

  const onExport = useCallback(() => {
    if (start && end) exportPdf({ startDate: start, endDate: end });
  }, [start, end, exportPdf]);

  const clearDates = useCallback(() => {
    setStart(null);
    setEnd(null);
  }, []);

  return {
    navigation,
    start,
    end,
    pickerVisible,
    setPickerVisible,
    isLoading,
    goodsCount,
    onConfirm,
    onExport,
    clearDates,
  };
};
