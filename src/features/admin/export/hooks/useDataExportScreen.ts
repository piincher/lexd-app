import { useState } from "react";

import {
  useListExports,
  useDownloadExport,
  useGetExportStats,
} from "./";
import { ExportEntity, ExportLog } from "../types";

type Tab = "exports" | "backups";

export const useDataExportScreen = () => {
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

  const handleQuickExport = (entity: ExportEntity) => {
    setSelectedEntity(entity);
    setExportModalVisible(true);
  };

  const handleDownload = (exportLog: ExportLog) => {
    downloadExport.mutate(exportLog.exportId);
  };

  const handleEntityFilterChange = (entity: ExportEntity | null) => {
    setEntityFilter(entity);
    setFilterMenuVisible(false);
  };

  return {
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    filterMenuVisible,
    setFilterMenuVisible,
    entityFilter,
    exportModalVisible,
    setExportModalVisible,
    selectedEntity,
    setSelectedEntity,
    exportsQuery,
    exportStats,
    downloadExport,
    handleQuickExport,
    handleDownload,
    handleEntityFilterChange,
  };
};
