import { useState, useCallback, useMemo } from "react";
import { useListCertificates, useDownloadCertificate } from "./useCertificateAdmin";

export type FilterChip = {
  label: string;
  key: string;
  filterType: "all" | "type" | "status";
  value?: string;
};

export const FILTER_CHIPS: FilterChip[] = [
  { label: "Tous", key: "all", filterType: "all" },
  { label: "Auto", key: "auto", filterType: "type", value: "AUTO" },
  { label: "Manuel", key: "manual", filterType: "type", value: "MANUAL" },
  { label: "Actif", key: "active", filterType: "status", value: "ACTIVE" },
  { label: "Révoqué", key: "revoked", filterType: "status", value: "REVOKED" },
];

export const useCertificateHistory = () => {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [page, setPage] = useState(1);

  const selectedChip = FILTER_CHIPS.find((c) => c.key === activeFilter)!;

  const queryParams = useMemo(() => {
    const params: { status?: string; type?: string; page?: number } = { page };
    if (selectedChip.filterType === "type") {
      params.type = selectedChip.value;
    } else if (selectedChip.filterType === "status") {
      params.status = selectedChip.value;
    }
    return params;
  }, [activeFilter, page, selectedChip]);

  const { data, isLoading, isRefetching, refetch } = useListCertificates(queryParams);
  const { download, isDownloading } = useDownloadCertificate();

  const certificates = data?.certificates ?? [];
  const pagination = data?.pagination ?? { page: 1, limit: 20, total: 0, totalPages: 1 };

  const handleFilterChange = useCallback((key: string) => {
    setActiveFilter(key);
    setPage(1);
  }, []);

  const handleNextPage = useCallback(() => {
    if (page < pagination.totalPages) {
      setPage((p) => p + 1);
    }
  }, [page, pagination.totalPages]);

  const handlePrevPage = useCallback(() => {
    if (page > 1) {
      setPage((p) => p - 1);
    }
  }, [page]);

  return {
    activeFilter,
    page,
    certificates,
    pagination,
    isLoading,
    isRefetching,
    refetch,
    download,
    isDownloading,
    handleFilterChange,
    handleNextPage,
    handlePrevPage,
  };
};
