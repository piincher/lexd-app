import { useCallback } from "react";

import { useDataExportScreen } from "../../hooks/useDataExportScreen";
import type { ExportLog } from "../../types";

type Tab = "exports" | "backups";

export const useDataExportScreenUI = () => {
  const screenState = useDataExportScreen();

  const {
    setActiveTab,
    setFilterMenuVisible,
    exportsQuery,
    setExportModalVisible,
  } = screenState;

  const handleTabChange = useCallback((value: string) => {
    setActiveTab(value as Tab);
  }, [setActiveTab]);

  const handleFilterMenuOpen = useCallback(() => {
    setFilterMenuVisible(true);
  }, [setFilterMenuVisible]);

  const handleFilterMenuDismiss = useCallback(() => {
    setFilterMenuVisible(false);
  }, [setFilterMenuVisible]);

  const handleRefresh = useCallback(() => {
    exportsQuery.refetch();
  }, [exportsQuery]);

  const handleExportModalDismiss = useCallback(() => {
    setExportModalVisible(false);
  }, [setExportModalVisible]);

  const exports: ExportLog[] = exportsQuery.data?.data || [];

  return {
    ...screenState,
    exports,
    handlers: {
      handleTabChange,
      handleFilterMenuOpen,
      handleFilterMenuDismiss,
      handleRefresh,
      handleExportModalDismiss,
    },
  };
};
