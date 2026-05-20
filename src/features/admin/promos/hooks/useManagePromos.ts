import { useState, useCallback, useMemo } from "react";
import { Alert } from "react-native";
import { showMessage } from "react-native-flash-message";
import { useAdminPromos, useDeactivatePromo, useClonePromo } from "./usePromoAdmin";
import type { PromoRecord } from "../api/promoAdminApi";

export type FilterChip = { label: string; key: string; value?: string };

export const FILTER_CHIPS: FilterChip[] = [
  { label: "Tous", key: "all" },
  { label: "Actif", key: "active", value: "ACTIVE" },
  { label: "Inactif", key: "inactive", value: "INACTIVE" },
  { label: "Expiré", key: "expired", value: "EXPIRED" },
];

export const useManagePromos = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeType, setActiveType] = useState("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const selectedChip = FILTER_CHIPS.find((c) => c.key === activeFilter)!;
  const filters = useMemo(() => {
    const result: Record<string, string> = {};
    if (selectedChip.value) result.status = selectedChip.value;
    if (activeType !== "all") result.type = activeType;
    if (search.trim()) result.search = search.trim();
    return result;
  }, [selectedChip, activeType, search]);

  const { data, isLoading, isRefetching, refetch } = useAdminPromos(filters, page);
  const deactivateMutation = useDeactivatePromo();
  const cloneMutation = useClonePromo();

  const promos = data?.promos ?? [];
  const pagination = data?.pagination ?? { page: 1, limit: 20, total: 0, totalPages: 1 };

  // Summary stats
  const summary = useMemo(() => {
    const allPromos = data?.promos ?? [];
    return {
      total: pagination.total,
      active: allPromos.filter((p) => p.status === "ACTIVE").length,
      inactive: allPromos.filter((p) => p.status === "INACTIVE").length,
      expired: allPromos.filter((p) => p.status === "EXPIRED").length,
    };
  }, [data?.promos, pagination.total]);

  const handleFilterChange = useCallback((key: string) => {
    setActiveFilter(key);
    setPage(1);
  }, []);

  const handleTypeChange = useCallback((key: string) => {
    setActiveType(key);
    setPage(1);
  }, []);

  const handleSearchChange = useCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, []);

  const handleNextPage = useCallback(() => {
    if (page < pagination.totalPages) setPage((p) => p + 1);
  }, [page, pagination.totalPages]);

  const handlePrevPage = useCallback(() => {
    if (page > 1) setPage((p) => p - 1);
  }, [page]);

  const handleDeactivate = useCallback((promo: PromoRecord) => {
    Alert.alert(
      "Désactiver la promotion",
      `Voulez-vous vraiment désactiver le code "${promo.code}" ?`,
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Désactiver",
          style: "destructive",
          onPress: () => {
            deactivateMutation.mutate(promo._id, {
              onSuccess: () => {
                showMessage({ message: "Promotion désactivée", type: "success" });
              },
              onError: (error: Error) => {
                showMessage({ message: error.message || "Impossible de désactiver", type: "danger" });
              },
            });
          },
        },
      ]
    );
  }, [deactivateMutation]);

  const handleClone = useCallback((promo: PromoRecord) => {
    Alert.alert(
      "Dupliquer la promotion",
      `Créer une copie de "${promo.code}" ?`,
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Dupliquer",
          style: "default",
          onPress: () => {
            cloneMutation.mutate(promo._id, {
              onSuccess: () => {
                showMessage({ message: "Promotion dupliquée", type: "success" });
              },
              onError: (error: Error) => {
                showMessage({ message: error.message || "Impossible de dupliquer", type: "danger" });
              },
            });
          },
        },
      ]
    );
  }, [cloneMutation]);

  return {
    activeFilter,
    activeType,
    search,
    page,
    promos,
    pagination,
    summary,
    isLoading,
    isRefetching,
    refetch,
    handleFilterChange,
    handleTypeChange,
    handleSearchChange,
    handleNextPage,
    handlePrevPage,
    handleDeactivate,
    handleClone,
  };
};
